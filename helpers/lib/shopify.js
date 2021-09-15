const axios = require('axios');

// MongoDB Models
const Store = require('../../models/Store');
const Product_Event = require('../../models/Product_Event');

const memCache = require('../cache').default;

let updateProducts = [];
let updateMetafields = [];

let shopifyRequests = [];
let makingRequest = false;

let example = {
  method: 'post',
  url: 'https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/customers.json',
  payload: { product: 'ksjdlnjskdfn' }
};

module.exports = {
  /**
   * Gets current authtoken from env, cache, or database
   *
   * @return {number} Authtoken.
   */
  async getAuthToken() {
    let shop = process.env.SHOPIFY_STORE;
    let store = memCache.get(shop);
    if (process.env.authToken) {
      return process.env.authToken;
    }

    if (store) {
      return store;
    } else {
      let shopifyStore = await Store.findOne({ store: shop });
      memCache.set(shop, shopifyStore.authToken);
      return shopifyStore.authToken;
    }
  },

  /**
   * Search Shopify customers by email
   *
   * @param {string} Customer email
   *
   * @return {array} array of customer objects.
   */
  async getShopifyCustomers(email) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/customers/search.json?query=email:${email}`;
    let response = await axios
      .get(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
      });
    let customers = response?.data?.customers;
    if (customers) {
      return customers;
    } else {
      return [];
    }
  },

  /**
   * Create Shopify Customer
   *
   * @param {string} data.firstName Customers first name
   * @param {string} data.lastName Customers last name
   * @param {string} data.email Customers email
   * @param {boolean} invite send invite email to customer
   *
   * @return {object} Shopify Customer
   */
  async createShopifyCustomer({ data, invite = false }) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };

    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/customers.json`;
    let customer = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      verified_email: true,
      send_email_invite: invite
    };
    let response = await axios
      .post(url, { customer }, { headers: accessRequestHeader })
      .catch((err) => {
        console.log(err);
      });

    return response.data.customer;
  },
  /**
   * Create Shopify Discount Code
   *
   * @param {string} code Discount Code
   *
   * @return {boolean} Success or error
   */
  createShopifyDiscountCode(discountCode, price_rule) {
    return new Promise(async (resolve, reject) => {
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };

      console.log(discountCode);

      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/price_rules/${price_rule}/discount_codes.json`;
      let code = {
        discount_code: {
          code: discountCode
        }
      };

      axios
        .post(url, code, { headers: accessRequestHeader })
        .then((data) => {
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          reject(err.response.data);
        });
    });
  },

  // Register Shopfiy Discount Code for Teacher Code
  registerShopifyDiscountCode(teacherCode) {
    return new Promise(async (resolve, reject) => {
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };

      console.log(teacherCode);

      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/price_rules/408923209773/discount_codes.json`;
      let code = {
        discount_code: {
          code: teacherCode
        }
      };

      axios
        .post(url, code, { headers: accessRequestHeader })
        .then((data) => {
          resolve(true);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  async getCarrierServices() {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-07/carrier_services.json`;
    let response = await axios
      .get(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return response.data.carrier_services;
  },
  async setCarrierService() {
    let carrierService = {
      carrier_service: {
        name: 'KV Manager App',
        callback_url: `${process.env.host}/proxy/api/shipping/quote`,
        service_discovery: true
      }
    };
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-07/carrier_services.json`;
    let response = await axios
      .post(url, carrierService, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return true;
  },
  async deleteCarrierService(service) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };

    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-07/carrier_services/${service}.json`;
    console.log(url);
    let response = await axios
      .delete(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        return false;
      });
    console.log(response);
    return true;
  },
  // Create customer with email newsletter
  async emailSignup(body) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };

    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-04/customers.json`;
    axios
      .post(
        url,
        {
          customer: {
            accepts_marketing: true,
            first_name: body.firstName,
            last_name: body.lastName,
            email: body.email,
            marketing_opt_in_level: 'confirmed_opt_in'
          }
        },
        { headers: accessRequestHeader }
      )
      .then((signup) => {
        return signup;
      })
      .catch((err) => {
        console.log('signup error');
        console.log(err.response.data);
        return false;
      });
  },
  // Update customer to include email newsletter
  async emailAccept(customer) {
    shopifyCustomerId = customer[0].id;
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };

    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/customers/${shopifyCustomerId}.json`;
    let shopifyCustomer = {
      id: shopifyCustomerId,
      accepts_marketing: true,
      marketing_opt_in_level: 'confirmed_opt_in'
    };
    axios
      .post(
        url,
        {
          customer: shopifyCustomer
        },
        { headers: accessRequestHeader }
      )
      .then((signup) => {
        return signup;
      })
      .catch((err) => {
        console.log('accept error');
        console.log(err.response.data);
        return false;
      });
  },
  async getPages() {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-07/pages.json?limit=250`;
    let response = await axios
      .get(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return response;
  },
  async updatePage(id, html) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2021-01/pages/${id}.json`;
    axios
      .put(
        url,
        {
          page: {
            id,
            body_html: html
          }
        },
        {
          headers: accessRequestHeader
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
  async getRedirects() {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-07/redirects.json?limit=250`;
    let response = await axios
      .get(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return response;
  },
  async createRedirect(redirect) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-07/redirects.json?limit=250`;
    let response = await axios
      .post(url, redirect, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return response;
  },
  async deleteRedirect(id) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-07/redirects/${id}.json`;
    let response = await axios
      .delete(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return response;
  },
  // Search Shopify Products
  async searchProducts(query) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/graphql.json`;
    let response = axios({
      url,
      method: 'post',
      headers: accessRequestHeader,
      data: {
        query: `
          query {
            products(first: 50, query: "title:*${query}*") {
              edges {
                node {
                  id
                  title
                  description
                }
              }
            }
          }
          `
      }
    }).catch((err) => {
      console.log(err);
      return false;
    });
    return response.data;
  },
  async getProduct(id) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${id}.json`;
    let response = await axios
      .get(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return response;
  },
  async getProductMetafields(id) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${id}/metafields.json`;
    let response = await axios
      .get(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return response;
  },

  async getPriceRules() {
    let accessToken = await module.exports.getAuthToken();

    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/price_rules.json`;
    let response = await axios
      .get(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return response;
  },
  async getDiscountCode(pr) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };

    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/price_rules/${pr}/discount_codes.json?limit=250`;

    let response = await axios
      .get(url, {
        headers: accessRequestHeader
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
    return response;
  },
  // Delete Shopfiy Discount Code
  async deleteShopifyDiscountCode(code) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };
    let priceRules = await module.exports.getPriceRules();
    let teacherPriceRule = priceRules.data.price_rules.filter(
      (pr) => pr.title === 'Teacher Discount'
    )[0].id;

    let discountCodes = await module.exports.getDiscountCode(teacherPriceRule);
    let codeArray = discountCodes.data.discount_codes;

    let shopifyCode = codeArray.find((x) => x.code === code);

    if (!shopifyCode) {
      return false;
    }

    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/price_rules/${teacherPriceRule}/discount_codes/${shopifyCode.id}.json`;

    axios
      .delete(url, {
        headers: accessRequestHeader
      })
      .then((data) => {
        console.log(data);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
  async startProducts(start, end, ignoreImages = false) {
    start.forEach((product) => {
      let {
        shopifyID,
        event: {
          admin: { title, body_html, image },
          variants,
          metafields
        },
        _id
      } = product;

      let variantArray = variants.map((variant) => {
        let { shopifyID, price, compare_at_price } = variant;
        return { id: shopifyID, price, compare_at_price };
      });

      shopifyRequests.push({
        method: 'put',
        url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}.json`,
        payload: {
          product: {
            id: shopifyID,
            title,
            body_html,
            variants: variantArray
          }
        },
        _id
      });

      if (image.url && !ignoreImages) {
        shopifyRequests.push({
          method: 'post',
          url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}/images.json`,
          payload: {
            image: {
              position: 1,
              src: image.url
            }
          },
          _id
        });
      }

      metafields.forEach((field) => {
        let { namespace, key, value, value_type } = field;

        // check value
        if (value !== '') {
          shopifyRequests.push({
            method: 'post',
            url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}/metafields.json`,
            payload: {
              metafield: {
                namespace,
                key,
                value,
                value_type: 'string'
              }
            },
            _id
          });
        } else {
          shopifyRequests.push({
            method: 'get',
            url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}/metafields.json`,
            _id,
            callback: module.exports.deleteMetafield,
            arg: [key, namespace]
          });
        }
      });
    });

    end.forEach((product) => {
      let {
        shopifyID,
        current: {
          admin: { title, body_html },
          variants,
          metafields
        },
        event: {
          admin: { image }
        },
        _id
      } = product;

      let variantArray = variants.map((variant) => {
        let { shopifyID, price, compare_at_price } = variant;
        return { id: shopifyID, price, compare_at_price };
      });

      shopifyRequests.push({
        method: 'put',
        url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}.json`,
        payload: {
          product: {
            id: shopifyID,
            title,
            body_html,
            variants: variantArray
          }
        },
        _id
      });

      console.log(metafields);

      metafields.forEach((field) => {
        let { namespace, key, value, value_type } = field;

        // check value
        if (value !== '') {
          shopifyRequests.push({
            method: 'post',
            url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}/metafields.json`,
            payload: {
              metafield: {
                namespace,
                key,
                value,
                value_type: 'string'
              }
            },
            _id
          });
        } else {
          shopifyRequests.push({
            method: 'get',
            url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}/metafields.json`,
            _id,
            callback: module.exports.deleteMetafield,
            arg: [key, namespace]
          });
        }
      });

      if (image.url) {
        // parse url to get filename
        let filename = image.url.substring(
          image.url.lastIndexOf('/') + 1,
          image.url.lastIndexOf('?')
        );
        console.log('Uploading Image');
        // Get all product images
        shopifyRequests.push({
          method: 'get',
          url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}/images.json`,
          _id,
          callback: module.exports.deleteImage,
          arg: [filename]
        });
      }
    });
    console.log(shopifyRequests);
    if (shopifyRequests.length > 0) {
      module.exports.shopifyRequest();
    } else {
      console.log('Nothing to report');
    }
  },
  async shopifyRequest(i = 0) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };

    let { method, url, payload, _id, callback, arg } = shopifyRequests[i];

    axios({
      method,
      url,
      headers: accessRequestHeader,
      data: payload
    })
      .then((response) => {
        console.log(`Request Success`);
        module.exports.markSuccess(_id);
        if (callback) {
          callback(arg, response.data);
        }
        if (i < shopifyRequests.length - 1) {
          setTimeout(() => {
            return module.exports.shopifyRequest(i + 1);
          }, 1000);
        } else {
          setTimeout(() => {
            console.log('Returning');
            shopifyRequests = [];
            return;
          }, 100000);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data);
        if (i < shopifyRequests.length - 1) {
          setTimeout(() => {
            return module.exports.shopifyRequest(i + 1);
          }, 2000);
        } else {
          setTimeout(() => {
            shopifyRequests = [];
          }, 100000);
        }
      });
  },
  async markSuccess(id) {
    console.log(`Success for id: ${id}`);
    Product_Event.findById(id).then((event) => {
      if (!event) return;
      let currentDate = new Date();
      let startDate = new Date(event.start);
      let endDate = new Date(event.end);
      if (currentDate > endDate) {
        event.remove();
        return;
      }
      if (startDate < currentDate && currentDate < endDate) {
        console.log('Success');
        event.active = true;
        event.save();
      }
    });
  },
  async deleteImage(arg, imageArray) {
    let [fileName] = arg;

    let deleteImages = [];
    imageArray.images.forEach((image) => {
      let title = image.src.substring(
        image.src.lastIndexOf('/') + 1,
        image.src.lastIndexOf('?')
      );
      if (title === fileName) {
        deleteImages.push(image);
      }
    });

    if (deleteImages.length > 0) {
      deleteImages.forEach((image) => {
        shopifyRequests.push({
          method: 'delete',
          url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${image.product_id}/images/${image.id}.json`
        });
      });
    }
  },
  async deleteMetafield(arg, metafieldArray) {
    let [key, namespace] = arg;
    console.log('DELETEING METAFIELD');
    console.log(key + ' ' + namespace);

    let deleteMetafields = [];

    metafieldArray.metafields.forEach((field) => {
      let fieldKey = field.key;
      let fieldName = field.namespace;
      if (fieldKey === key && fieldName === namespace) {
        console.log('Found!');
        deleteMetafields.push(field);
      }
    });

    if (deleteMetafields.length > 0) {
      deleteMetafields.forEach((field) => {
        shopifyRequests.push({
          method: 'delete',
          url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${field.owner_id}/metafields/${field.id}.json`
        });
      });
      console.log(shopifyRequests);
    }
  },
  /**
   * Get Shopify Product By ID
   *
   * @param {string} id Shopify Product ID
   *
   * @return {object} Product Object
   */
  getProductByID(id) {
    return new Promise(async (resolve, reject) => {
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };

      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${id}.json`;
      axios
        .get(url, { headers: accessRequestHeader })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err.response.data);
        });
    });
  },
  /**
   * Get Shopify Product Metafields By ID
   *
   * @param {string} id Shopify Product ID
   *
   * @return {array} Array of Metafields Product Object
   */
  getProductMetafieldsByID(id) {
    return new Promise(async (resolve, reject) => {
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };

      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${id}/metafields.json`;
      axios
        .get(url, { headers: accessRequestHeader })
        .then((response) => {
          resolve(response.data.metafields);
        })
        .catch((err) => {
          console.log(err);
          reject(err.response.data);
        });
    });
  },
  /**
   * Create Shopify Product
   *
   * @param {object} obj Shopify Product Object
   *
   * @return {array} Array of Metafields Product Object
   */
  createNewShopifyProduct(obj) {
    return new Promise(async (resolve, reject) => {
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };

      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/products.json`;
      axios
        .post(url, { product: obj }, { headers: accessRequestHeader })
        .then((response) => {
          resolve(response.data.product);
        })
        .catch((err) => {
          console.log(err);
          reject(err.response.data);
        });
    });
  },
  /**
   * Get Shopify Locations
   *
   * @return {array} Array of Metafields Product Object
   */
  getShopifyLocations() {
    return new Promise(async (resolve, reject) => {
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };

      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/locations.json`;
      axios
        .get(url, { headers: accessRequestHeader })
        .then((response) => {
          resolve(response.data.locations);
        })
        .catch((err) => {
          console.log(err);
          reject(err.response.data);
        });
    });
  },
  /**
   * Adjust Inventory Levels
   *
   * @return {array} Array of Metafields Product Object
   */
  adjustShopifyInventoryLevels(variant, location, level) {
    return new Promise(async (resolve, reject) => {
      console.log('Adjusting');
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };
      let data = {
        location_id: location.id,
        inventory_item_id: variant.inventory_item_id,
        available: level
      };
      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/inventory_levels/set.json`;
      axios
        .post(url, data, { headers: accessRequestHeader })
        .then((response) => {
          console.log(response.data);
          resolve(response);
        })
        .catch((err) => {
          console.log(err.response.data);
          reject(err.response.data);
        });
    });
  },
  /**
   * Get All Shopify Products
   *
   * @return {array} Array of Metafields Product Object
   */
  getAllShopifyProducts() {
    return new Promise(async (resolve, reject) => {
      console.log('Running');
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };
      let baseUrl = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/products.json?limit=250`;

      let products = [];

      let i = 0;

      function parseString(link) {
        if (link.indexOf('rel="next"') === -1) {
          return false;
        }
        if (link.indexOf(`rel="previous"`) > -1) {
          link = link.substr(link.indexOf(',') + 2, link.length);
        }
        link = link.substr(1, link.indexOf('>') - 1).split('&');
        let pageinfo = `&${link[link.length - 1]}`;
        return pageinfo;
      }

      function getProducts(url) {
        i++;
        console.log(`Getting page ${i}`);
        axios.get(url, { headers: accessRequestHeader }).then((response) => {
          console.log('Got Response');
          let nextPage = parseString(response.headers.link);
          response.data.products.forEach((product) => {
            let sku = product.variants[0].sku;
            product.sku = sku;
            products.push(product);
          });
          if (nextPage) {
            let newUrl = baseUrl + nextPage;
            setTimeout(() => {
              return getProducts(newUrl);
            }, 2000);
          } else {
            resolve(products);
          }
        });
      }
      getProducts(baseUrl);
    });
  },
  /**
   * Delete Shopify Products
   *
   * @return {boolean} Success or Error
   */
  deleteShopifyProduct(id) {
    return new Promise(async (resolve, reject) => {
      console.log(`Deleting Product: ${id}`);
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };
      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${id}.json`;

      axios
        .delete(url, {
          headers: accessRequestHeader
        })
        .then((data) => {
          resolve({ success: true });
        })
        .catch((err) => {
          console.log(err);
          reject({ success: false });
        });
    });
  },
  /**
   * Replace Shopify Product Images
   *
   * @return {boolean} Success or Error
   */
  replaceShopifyProductImages(id, images) {
    return new Promise(async (resolve, reject) => {
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };
      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${id}.json`;

      let data = {
        product: {
          id,
          images
        }
      };

      axios
        .put(url, data, {
          headers: accessRequestHeader
        })
        .then((data) => {
          resolve({ success: true });
        })
        .catch((err) => {
          console.log(err);
          reject({ success: false });
        });
    });
  },
  /**
   * Create New Shopify Variant
   *
   * @return {boolean} Success or Error
   */
  newShopifyProductVariant(id, variant) {
    return new Promise(async (resolve, reject) => {
      let { price, option1, option2, option3 } = variant;
      console.log(variant);
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };
      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${id}/variants.json`;

      let data = {
        variant: {
          price,
          option1,
          option2,
          option3
        }
      };

      axios
        .post(url, data, {
          headers: accessRequestHeader
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err.response.data);
          reject({ success: false });
        });
    });
  },
  /**
   * Delete Shopify Variant
   *
   * @return {boolean} Success or Error
   */
  deleteShopifyProductVariant(variant) {
    return new Promise(async (resolve, reject) => {
      let { product, shopify_id } = variant;
      console.log(`Deleting Variant ${shopify_id} from product ${product}`);
      let accessToken = await module.exports.getAuthToken();
      let accessRequestHeader = {
        'X-Shopify-Access-Token': accessToken
      };
      let url = `https://${process.env.SHOPIFY_STORE}/admin/api/${process.env.SHOPIFY_API_VERSION}/products/${product}/variants/${shopify_id}.json`;

      axios
        .delete(url, {
          headers: accessRequestHeader
        })
        .then((data) => {
          resolve({ success: true });
        })
        .catch((err) => {
          reject({ success: false });
        });
    });
  },
  /**
   * Check for Image Change
   *
   * @return {boolean} Success or Error
   */
  checkForImageChange(arr1, arr2) {
    let imageChange = false;
    arr1.forEach((image) => {
      let existing = arr2.filter((x) => x.src === image.src);
      if (existing.length === 0) {
        imageChange = true;
      }
    });
    arr2.forEach((image) => {
      let existing = arr1.filter((x) => x.src === image.src);
      if (existing.length === 0) {
        imageChange = true;
      }
    });
    return imageChange;
  }
};
