const axios = require('axios');

// MongoDB Models
const Store = require('../../models/Store');
const Product_Event = require('../../models/Product_Event');

const memCache = require('../cache').default;

let updateProducts = [];
let updateMetafields = [];

let shopifyRequests = [];

let example = {
  method: 'post',
  url: 'https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/customers.json',
  payload: { product: 'ksjdlnjskdfn' }
};

module.exports = {
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
  // Search Shopify customers by email
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
  // Create Shopify Customer
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
    console.log(response);
    return response.data.customer;
  },
  // Register Shopfiy Discount Code for Teacher Code
  async registerShopifyDiscountCode(teacherCode) {
    let accessToken = await module.exports.getAuthToken();
    let accessRequestHeader = {
      'X-Shopify-Access-Token': accessToken
    };

    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/price_rules/408923209773/discount_codes.json`;
    let code = {
      discount_code: {
        code: teacherCode
      }
    };

    axios
      .post(url, code, { headers: accessRequestHeader })
      .then((data) => {
        return true;
      })
      .catch((err) => {
        console.log(err.response.data);
        return false;
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

    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/customers.json`;
    axios
      .post(
        url,
        {
          customer: {
            accepts_marketing: true,
            first_name: body.firstName,
            last_name: body.lastName,
            email: body.email
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
  async startProducts(start, end) {
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

      if (image.url) {
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
        shopifyRequests.push({
          method: 'post',
          url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}/metafields.json`,
          payload: {
            metafield: {
              namespace,
              key,
              value,
              value_type
            }
          },
          _id
        });
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

      metafields.forEach((field) => {
        let { namespace, key, value, value_type } = field;
        shopifyRequests.push({
          method: 'post',
          url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${shopifyID}/metafields.json`,
          payload: {
            metafield: {
              namespace,
              key,
              value,
              value_type
            }
          },
          _id
        });
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
          shopifyRequests = [];
        }
      })
      .catch((err) => {
        console.log(err.response.data);
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

    deleteImages.forEach((image) => {
      shopifyRequests.push({
        method: 'delete',
        url: `https://${process.env.SHOPIFY_STORE}/admin/api/2020-10/products/${image.product_id}/images/${image.id}.json`
      });
    });
  }
};
