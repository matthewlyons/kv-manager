const express = require('express');
const router = express.Router();

const Teacher = require('../../../models/Teacher');
const Teacher_Point_Change = require('../../../models/Teacher_Point_Change');
const Affiliate = require('../../../models/Affiliate');
const Order_Store_Affiliate = require('../../../models/Order_Store_Affiliate');

const Shopify_Product_Variant = require('../../../models/Shopify_Product_Variant');
const Shopify_Product = require('../../../models/Shopify_Product');
const Inventory_Group = require('../../../models/Inventory_Group');
const Inventory_Controller = require('../../../models/Inventory_Controller');

const {
  getShopifyLocations,
  adjustShopifyInventoryLevels,
  getProductMetafields,
  deleteShopifyProduct,
  replaceShopifyProductImages,
  newShopifyProductVariant,
  checkForImageChange,
  deleteShopifyProductVariant
} = require('../../../helpers');

// Shopify Order Create Webhook
router.post('/OrderCreate', async (req, res) => {
  res.send('done');
  let { discount_codes, note_attributes, id, total_line_items_price } =
    req.body;

  const teacherCode = discount_codes[0];
  let attributes = note_attributes;
  let affiliateCode;

  attributes.forEach((attribute) => {
    if (attribute.name === 'affiliate') {
      affiliateCode = attribute.value;
    }
  });

  console.log(affiliateCode);
  console.log(teacherCode);

  // Check for Teacher account with discount code
  Teacher.findOne({ code: teacherCode })
    .then((teacher) => {
      const paymentMade = total_line_items_price;
      const newPoints = Math.round(paymentMade / 10);

      if (teacher) {
        // Create Point Change Event For Teacher
        let newPayment = new Teacher_Point_Change({
          teacher: teacher._id,
          type: 'Store Order',
          points: newPoints
        });
        newPayment.save();
        // Update Teacher Points
        teacher.points = teacher.points + newPoints;
        teacher.save();
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // Check for Refferal code using order.ref
  Affiliate.findOne({ code: affiliateCode })
    .then((affiliate) => {
      if (affiliate) {
        let { percent } = affiliate;

        let totalEarned = Math.round(paymentMade / percent);

        // Create order for affiliate
        let newOrder = new Order_Store_Affiliate({
          orderNumber: id,
          affiliateCode,
          totalEarned
        });
        console.log(newOrder);
        newOrder.save();
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Product Created
router.post('/ProductCreate', async (req, res) => {
  console.log(req.originalUrl);
  res.send('Done');

  let existingProduct = await Shopify_Product.findOne({
    shopifyId: req.body.id
  });

  if (existingProduct) {
    console.log('Product Found, Returning');
    return;
  }

  req.body.variants.forEach((variant) => {
    let { product_id, id, inventory_item_id, option1, option2, option3 } =
      variant;
    let newVariant = new Shopify_Product_Variant({
      product: product_id,
      shopify_id: id,
      inventory_item_id,
      option1,
      option2,
      option3
    });
    console.log(newVariant);
    newVariant.save();
  });

  let response = await getProductMetafields(req.body.id);
  let product = new Shopify_Product({
    shopifyId: req.body.id,
    data: req.body,
    metafields: response.data.metafields
  });

  product.save();
});

// Product Updated -- Main Update Inventory Through Admin
router.post('/ProductUpdate', async (req, res) => {
  console.log(req.originalUrl);
  let { id, variants, images } = req.body;
  res.send('Done');

  // Get Product By Id
  let shopifyProduct = await Shopify_Product.findOne({
    shopifyId: id
  });

  // Get Variants By Product ID
  let shopifyProductVariants = await Shopify_Product_Variant.find({
    product: id
  });

  // Find LeaderInventory Group
  let leaderGroup = await Inventory_Group.findOne({
    leader: id
  });

  // Find LeaderInventory Group
  let followerGroup = await Inventory_Group.findOne({
    leader: id
  });

  // Update Product Doc
  let response = await getProductMetafields(req.body.id);
  shopifyProduct.data = req.body;
  shopifyProduct.metafields = response.data.metafields;

  shopifyProduct.save();

  if (leaderGroup) {
    // If Updated Product Is the Leader of an Inventory Group
    // Check for any added Variants
    let newVariants = [];
    variants.forEach((variant) => {
      let existing = shopifyProductVariants.filter(
        (x) => x.shopify_id === variant.id
      );
      if (existing.length === 0) {
        newVariants.push(variant);
      }
    });

    // Check for any removed Variants
    let oldVariants = [];
    shopifyProductVariants.forEach((variant) => {
      let existing = variants.filter((x) => x.id === variant.shopify_id);

      if (existing.length === 0) {
        oldVariants.push(variant);
      }
    });

    let allDeleteVariants = await getAllDeleteVariants(0, oldVariants, []);

    deleteVariants(0, allDeleteVariants);
    allDeleteVariants.forEach((variant) => {
      variant.remove();
      Inventory_Controller.findByIdAndRemove(
        variant.inventoryController,
        (doc, err) => {
          console.log(doc);
          console.log(err);
        }
      );
    });

    // for each variant
    newVariants.forEach((variant) => {
      // create inventory controller
      let controller = new Inventory_Controller({
        inventoryGroup: leaderGroup._id,
        type: 'Number',
        inventoryLevel: variant.inventory_quantity
      });

      controller.save();
      let newCurrentVariant = new Shopify_Product_Variant({
        product: id,
        shopify_id: variant.id,
        option1: variant.option1,
        option2: variant.option2,
        option3: variant.option3,
        inventory_item_id: variant.inventory_item_id,
        inventoryController: controller._id
      });
      newCurrentVariant.save();
      // foreach follower
      leaderGroup.followers.forEach(async (follower) => {
        // Create new variant for follower
        let response = await newShopifyProductVariant(follower, variant);
        let { option1, option2, option3, inventory_item_id } =
          response.data.variant;
        // create new variant doc
        let newVariant = new Shopify_Product_Variant({
          product: follower,
          shopify_id: response.data.variant.id,
          option1,
          option2,
          option3,
          inventory_item_id,
          inventoryController: controller._id
        });
        newVariant.save();
      });
    });

    // Check for image changes
    let imageChange = checkForImageChange(shopifyProduct.data.images, images);
    // If changed images
    if (imageChange) {
      let followers = group.followers;
      // replace images of followers
      replaceImages(0, followers);
    }
  } else if (followerGroup) {
    // If Updated Product Is a Follower of an Inventory Group
  } else {
    // If Updated Product Isnt in an Inventory Group
  }

  // // Find New Variants
  // let newVariants = [];
  // variants.forEach((variant) => {
  //   let existing = shopifyProductVariants.filter(
  //     (x) => x.shopify_id === variant.id
  //   );
  //   if (existing.length === 0) {
  //     newVariants.push(variant);
  //   }
  // });

  // newVariants.forEach((variant) => {
  //   let { product_id, id, inventory_item_id, option1, option2, option3 } =
  //     variant;
  //   let newVariant = new Shopify_Product_Variant({
  //     product: product_id,
  //     shopify_id: id,
  //     inventory_item_id,
  //     option1,
  //     option2,
  //     option3
  //   });
  //   console.log(newVariant);
  //   newVariant.save();
  // });

  // if (group) {
  //   console.log('Has Group');
  //   console.log(group);
  //   console.log(newVariants);
  //   group.followers.forEach((product) => {
  //     addNewVariant(0, product, newVariants);
  //   });
  // } else {
  //   console.log('No Group');
  // }

  // // Find Deleted Variants
  // let oldVariants = [];
  // let oldVariantsDocArray = [];
  // let oldVariantsShopifyArray = [];
  // shopifyProductVariants.forEach((variant) => {
  //   let existing = variants.filter((x) => x.id === variant.shopify_id);

  //   if (existing.length === 0) {
  //     if (variant.inventoryController) {
  //       oldVariantsDocArray.push(variant.inventoryController);
  //     }
  //     oldVariants.push(variant._id);
  //   }
  // });

  // oldVariantsDocArray.forEach(async (variant) => {
  //   let deleteVariant = await Shopify_Product_Variant.find({
  //     inventoryController: variant
  //   });
  //   oldVariantsShopifyArray.push(...deleteVariant);
  // });
  // console.log('OldVariantsShopifyArray:');
  // console.log(oldVariantsShopifyArray);

  // oldVariants.forEach((variant) => {
  //   Shopify_Product_Variant.findByIdAndRemove(variant, (doc, err) => {
  //     console.log(doc);
  //     console.log(err);
  //   });
  // });

  // Replace All Images
  function replaceImages(i = 0, followers) {
    if (i >= followers.length) {
      console.log('Editing Product Images');
      return;
    }
    console.log('Editing Product Image Products');
    replaceShopifyProductImages(followers[i], images)
      .then((res) => {
        setTimeout(() => {
          return replaceImages(i + 1, followers);
        }, 500);
      })
      .catch((err) => {
        setTimeout(() => {
          return replaceImages(i + 1, followers);
        }, 500);
      });
  }
  async function getAllDeleteVariants(i = 0, variants, array = []) {
    if (i >= variants.length) {
      console.log('Done');
      return array;
    }
    // Set Current Variant
    let current = variants[i];
    // console.log(current);
    if (current.inventoryController) {
      // If Variant has inventory Controller
      let deletedVariants = await Shopify_Product_Variant.find({
        inventoryController: current.inventoryController
      });
      array.push(...deletedVariants);
    }
    return getAllDeleteVariants(i + 1, variants, array);
  }
  async function deleteVariants(i = 0, variants) {
    if (i >= variants.length) {
      console.log('Done');
      return;
    }
    deleteShopifyProductVariant(variants[i])
      .then((res) => {
        setTimeout(() => {
          return deleteVariants(i + 1, variants);
        }, 500);
      })
      .catch((err) => {
        setTimeout(() => {
          return deleteVariants(i + 1, variants);
        }, 500);
      });
  }
  // Create New Variant
  function addNewVariant(i = 0, product, variants) {
    if (i >= variants.length) {
      console.log('Done');
      return;
    }
    console.log('Adding New Variant To Product: ', product);
    newShopifyProductVariant(product, variants[i])
      .then((res) => {
        setTimeout(() => {
          return addNewVariant(i + 1, product, variants);
        }, 500);
      })
      .catch((err) => {
        setTimeout(() => {
          return addNewVariant(i + 1, product, variants);
        }, 500);
      });
  }
});

// Product Deleted
router.post('/ProductDeletion', async (req, res) => {
  console.log(req.originalUrl);
  let { id } = req.body;
  console.log(req.body);
  res.send('Done');

  // Find if Leader In Inventory Group
  let leaderGroup = await Inventory_Group.find({ leader: id });
  let followerGroup = await Inventory_Group.find({ followers: id });
  console.log(leaderGroup);
  console.log(followerGroup);
  if (leaderGroup.length > 0) {
    console.log('Leader');
    console.log(leaderGroup[0]);
    // Request shopify delete all follower products
    let products = [leaderGroup[0].leader, ...leaderGroup[0].followers];
    console.log(products);
    deleteProducts(0, products);
    // Delete Inventory Controllers for Variants
    Shopify_Product_Variant.deleteMany({
      product: products
    });
    // Delete Group
    leaderGroup[0].remove();
  }

  if (followerGroup.length > 0) {
    // Delete from follower group
    let updatedFollowers = followerGroup[0].followers.filter((x) => x !== id);
    followerGroup[0].followers = updatedFollowers;
    // Save Group
    followerGroup[0].save();
  }

  // Delete Product
  await Shopify_Product.deleteOne({ shopifyId: id });
  // Delete Variants
  await Shopify_Product_Variant.deleteMany({ product: id });

  function deleteProducts(i = 0, products) {
    if (i >= products.length) {
      console.log('Done Deleting Products');
      return;
    }
    console.log('Deleting Products');
    deleteShopifyProduct(products[i])
      .then((res) => {
        setTimeout(() => {
          return deleteProducts(i + 1, products);
        }, 500);
      })
      .catch((err) => {
        setTimeout(() => {
          return deleteProducts(i + 1, products);
        }, 500);
      });
  }
});

// Inventory Level Updated (Shopify Admin / Customer Order)
router.post('/InventoryLevelUpdate', async (req, res) => {
  res.send('Done');

  let location = await getShopifyLocations();

  let current = req.body;
  let { id, inventory_item_id, available, product } = current;
  console.log(req.body);
  let shopifyProductVariant = await Shopify_Product_Variant.findOne({
    inventory_item_id
  });
  if (!shopifyProductVariant) {
    console.log('No Product Found.');
    return;
  }
  let shopifyProduct = await Shopify_Product.findOne({
    shopifyId: shopifyProductVariant.product
  });
  console.log(shopifyProduct);
  let updatedVariants = shopifyProduct.data.variants.map((variant) => {
    let updatedVariant = variant;
    if (variant.id === id) {
      updatedVariant.inventory_quantity = available;
      updatedVariant.old_inventory_quantity = available;
    }
    return updatedVariant;
  });

  shopifyProduct.data.variants = updatedVariants;
  shopifyProduct.save();

  let variant = await Shopify_Product_Variant.findOne({
    inventory_item_id
  }).populate('inventoryController');

  if (!variant) {
    return;
  }

  let inventoryController = await Inventory_Controller.findById(
    variant.inventoryController
  );

  if (!inventoryController) {
    return;
  }
  // Get Inventory Type (Boolean or Number)
  if (inventoryController.type === 'boolean') {
    // Check if Controller Is In Stock
    // If controller is In Stock
    if (inventoryController.inStock) {
      // Check If Variant Inventory is less than 500
      if (available < 500) {
        // make request to shopify to update stock to 1000
        adjustShopifyInventoryLevels(id, location[0], 1000);
      }
      return;
      // If controller is Out of Stock
    } else {
      // If Shopify has stock avaliable
      if (available > 0) {
        // make request to shopify to update stock to 0
        adjustShopifyInventoryLevels(id, location[0], 0);
      }
      return;
    }
  } else {
    if (available == inventoryController.inventoryLevel) {
      console.log('Already Matching, done');
      return;
    } else {
      inventoryController.inventoryLevel = available;
      inventoryController.save();
      // Get All Other Variants that are Controlled with this controller
      let controlledVariants = await Shopify_Product_Variant.find({
        inventoryController: variant.inventoryController._id
      });

      function updateInventory(i = 0) {
        if (i >= controlledVariants.length) {
          return;
        }
        adjustShopifyInventoryLevels(
          controlledVariants[i],
          location[0],
          available
        )
          .then((res) => {
            setTimeout(() => {
              return updateInventory(i + 1);
            }, 500);
          })
          .catch((err) => {
            setTimeout(() => {
              return updateInventory(i + 1);
            }, 500);
          });
      }

      updateInventory();
      // Make request to shopify for each variant to update their stock to current value
    }
  }
});

// Order Created
router.post('/OrderCreation', async (req, res) => {
  console.log(req.originalUrl);
  console.log(req.body);
  return res.send('Done');
});

router.post('/*', async (req, res) => {
  console.log('Catch All');
  console.log(req.originalUrl);
  console.log(req.body);
  return res.send('Done');
});

module.exports = router;
