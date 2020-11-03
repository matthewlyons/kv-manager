const axios = require('axios');

// MongoDB Models
const Store = require('../../models/Store');

const memCache = require('../cache').default;

module.exports = {
  async getAuthToken() {
    let shop = process.env.SHOPIFY_STORE;
    let store = memCache.get(shop);
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

    console.log(accessToken);

    let url = `https://${process.env.SHOPIFY_STORE}/admin/api/2019-07/price_rules/408923209773/discount_codes.json`;
    let code = {
      discount_code: {
        code: teacherCode
      }
    };

    axios
      .post(url, { code }, { headers: accessRequestHeader })
      .then((data) => {
        console.log(data);
        return true;
      })
      .catch((err) => {
        console.log(err);
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
  }
};
