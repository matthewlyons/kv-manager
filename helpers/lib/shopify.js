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
  async createShopifyCustomer({ data, invite = false }) {
    console.log('creating Customer');
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
    let response = await axios.post(url, { customer }, { headers: accessRequestHeader }).catch((err) => {
      console.log(err);
    });
    console.log(response);
    return response.data.customer;
  }
};
