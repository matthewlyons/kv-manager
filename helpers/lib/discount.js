require('dotenv').config();

const DiscountCode = require('../../models/DiscountCode');

module.exports = {
  /**
   * Generates an unused discount code
   *
   * Examples will use George Washington
   *
   * @param {string} part_1 First Name
   * @param {string} part_2 Last Name
   *
   * @return {string} Viable discount code
   */
  async generateDiscountCode(part_1, part_2) {
    return new Promise(async (resolve, reject) => {
      /**
       * Attempt one
       * @result GWashi
       */
      let test1 =
        part_1.substring(0, 1).toUpperCase() +
        part_2.substring(0, 5).toUpperCase();
      let result1 = await DiscountCode.findOne({ code: test1 });
      if (!result1) {
        resolve(test1);
      }

      /**
       * Attempt two
       * @result GWashington
       */
      let test2 = part_1.substring(0, 1).toUpperCase() + part_2.toUpperCase();
      let result2 = await DiscountCode.findOne({ code: test2 });
      if (!result2) {
        resolve(test2);
      }

      /**
       * Attempt three
       * @result GeorgeWashington
       */
      let test3 = part_1.toUpperCase() + part_2.toUpperCase();
      let result3 = await DiscountCode.findOne({ code: test3 });
      if (!result3) {
        resolve(test3);
      }

      /**
       * Attempt four
       *
       * This is the final attempt.
       * will choose a random series of 3 numbers to append to the end of the second attempt.
       * If it fails it will try again.
       *
       * @result GWashington123
       */
      async function discountAlgorithem(string) {
        let num = Math.floor(Math.random() * 998) + 1;
        let test4 = string + num;
        let result4 = await DiscountCode.findOne({ code: test4 });
        if (!result4) {
          return test4;
        } else {
          return discountAlgorithem(string);
        }
      }

      let finalCode = discountAlgorithem(test2);

      resolve(finalCode);
    });
  }
};
