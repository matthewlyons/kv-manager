const axios = require("axios");

module.exports = {
  async getShipping(request) {
    let { origin, destination, items } = request.rate;
    let freeShipping = false;
    let methods;
    let outfits = [];
    let accessories = [];
    let products = [];
    let packages = [];
    let PriorityMail = false;

    let additional = {
      cases: 0,
      bows: 0,
      musicStands: 0,
      strings: 0,
    };

    items.forEach((element) => {
      let i = 0;
      while (i < element.quantity) {
        products.push(element.name.toLowerCase());
        i++;
      }
    });

    let totalPrice = items
      .reduce((total, item) => {
        return total + item.price * item.quantity * 0.01;
      }, 0)
      .toFixed(2);

    console.log(totalPrice);

    if (totalPrice >= 100) {
      freeShipping = true;
    }

    products.forEach((element) => {
      if (element.includes("outfit") || element.includes("bundle")) {
        if (element.includes("Viola") || element.includes("Violin")) {
          PriorityMail = true;
        }
        freeShipping = true;
        outfits.push(element);
      } else {
        if (element.includes("case")) {
          additional.cases++;
        } else if (element.includes("bow")) {
          additional.bows++;
        } else if (element.includes("stand")) {
          additional.musicStands++;
        } else if (element.includes("string")) {
          additional.strings++;
        } else {
          accessories.push(element);
        }
      }
    });
    if (outfits.length > 0) {
      if (PriorityMail) {
        methods = [
          "ups_3_day_select",
          "ups_2nd_day_air",
          "usps_parcel_select",
          "usps_priority_mail",
        ];
      } else {
        methods = ["ups_3_day_select", "ups_2nd_day_air", "usps_parcel_select"];
      }
    } else {
      methods = [
        "ups_3_day_select",
        "usps_parcel_select",
        "ups_ground",
        "usps_priority_mail",
      ];
      if (additional.strings > 0) {
        methods.push("usps_first_class_mail");
      }
    }

    outfits.forEach((element) => {
      if (element.includes("violin")) {
        packages.push({
          dimensions: {
            length: 40,
            width: 8,
            height: 12,
            unit: "inch",
          },
          weight: {
            value: 10,
            unit: "pound",
          },
        });
      } else if (element.includes("guitar")) {
        packages.push({
          dimensions: {
            length: 44,
            width: 10,
            height: 18,
            unit: "inch",
          },
          weight: {
            value: 12,
            unit: "pound",
          },
        });
      } else if (element.includes("viola")) {
        packages.push({
          dimensions: {
            length: 38,
            width: 12,
            height: 14,
            unit: "inch",
          },
          weight: {
            value: 12,
            unit: "pound",
          },
        });
      }
    });

    let { cases, bows, musicStands, strings } = additional;
    while (outfits.length < cases) {
      packages.push({
        dimensions: {
          length: 40,
          width: 8,
          height: 12,
          unit: "inch",
        },
        weight: {
          value: 6,
          unit: "pound",
        },
      });
      cases--;
    }

    while (outfits.length < bows) {
      packages.push({
        dimensions: {
          length: 38,
          width: 2,
          height: 2,
          unit: "inch",
        },
        weight: {
          value: 2,
          unit: "pound",
        },
      });
      bows--;
    }

    while (outfits.length < musicStands) {
      packages.push({
        dimensions: {
          length: 20,
          width: 4,
          height: 3,
          unit: "inch",
        },
        weight: {
          value: 3,
          unit: "pound",
        },
      });
      musicStands--;
    }

    while (outfits.length < strings) {
      packages.push({
        dimensions: {
          length: 10,
          width: 8,
          height: 1,
          unit: "inch",
        },
        weight: {
          value: 15,
          unit: "ounce",
        },
      });
      strings = strings - 3;
    }

    if (packages.length == 0) {
      packages.push({
        dimensions: {
          length: 10,
          width: 8,
          height: 1,
          unit: "inch",
        },
        weight: {
          value: 6,
          unit: "pound",
        },
      });
    }
    if (destination.country !== "US") {
      freeShipping = false;
    }
    if (destination.province == "HI" || destination.province == "AK") {
      freeShipping = false;
    }
    return { origin, destination, methods, packages, freeShipping };
  },
  async getQuote(result) {
    let { origin, destination, methods, packages } = result;

    let maxWeight = packages
      .map((package) => {
        let multiplier = package.weight.unit === "ounce" ? 1 : 16;
        return package.weight.value * multiplier;
      })
      .sort((a, b) => {
        return b - a;
      })[0];

    packages.forEach((package) => {
      package.weight = { value: maxWeight, unit: "ounce" };
    });

    let config = {
      rate_options: {
        carrier_ids: ["se-327858", "se-164525"],
        service_codes: methods,
      },
      shipment: {
        validate_address: "no_validation",
        ship_to: {
          company_name: destination.company_name,
          name: destination.name,
          phone: destination.phone,
          address_line1: destination.address1,
          address_line2: destination.address2,
          city_locality: destination.city,
          state_province: destination.province,
          postal_code: destination.postal_code,
          country_code: destination.country,
          address_residential_indicator: "yes",
        },
        ship_from: {
          company_name: origin.company_name || "Kennedy Violins",
          name: origin.name || "Kennedy Violins",
          phone: origin.phone || "360-931-6225",
          address_line1: origin.address1,
          address_line2: origin.address2,
          city_locality: origin.city,
          state_province: origin.province,
          postal_code: origin.postal_code,
          country_code: origin.country,
          address_residential_indicator: "no",
        },
        packages,
      },
    };

    console.log(config);

    let headers = {
      Host: "api.shipengine.com",
      "API-Key": process.env.SHIP_ENGINE_API_KEY,
      "Content-Type": "application/json",
    };
    let finalQuote = await axios
      .post("https://api.shipengine.com/v1/rates", config, { headers })
      .catch((err) => {
        console.log("err");
        console.log(err.response.data.errors);
      });

    return finalQuote;
  },
};
