const NodeCache = require('node-cache');
module.exports.default = new NodeCache({ stdTTL: 0 });
