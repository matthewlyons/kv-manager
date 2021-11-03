import React, { useEffect, useState } from 'react';

import './style.css';

import axios from 'axios';

import Button from '../Customizer/components/Button';

import CartProduct from './components/CartProduct';

export default function Cart() {
  const [cart, setCart] = useState({
    token: '9ed9ed6e2cfd1d1eac2a959145afaa69',
    note: null,
    attributes: {},
    original_total_price: 44699,
    total_price: 44699,
    total_discount: 0,
    total_weight: 4989.5161,
    item_count: 3,
    items: [
      {
        id: 39281404772508,
        properties: {
          OutfitID: '1635958165236'
        },
        quantity: 1,
        variant_id: 39281404772508,
        key: '39281404772508:285867bef06a9553630ffe6601f58fc3',
        title: 'Fiddle Conversion Upgrade',
        price: 4900,
        original_price: 4900,
        discounted_price: 4900,
        line_price: 4900,
        original_line_price: 4900,
        total_discount: 0,
        discounts: [],
        sku: '',
        grams: 0,
        vendor: 'Kennedy Violins',
        taxable: true,
        product_id: 6546450808988,
        product_has_only_default_variant: true,
        gift_card: false,
        final_price: 4900,
        final_line_price: 4900,
        url: '/products/fiddle-conversion-upgrade?variant=39281404772508',
        featured_image: {
          aspect_ratio: 1,
          alt: 'Fiddle Conversion Upgrade',
          height: 2000,
          url: 'https://cdn.shopify.com/s/files/1/2994/5334/products/Fiddle_Upgrade.jpg?v=1614379593',
          width: 2000
        },
        image:
          'https://cdn.shopify.com/s/files/1/2994/5334/products/Fiddle_Upgrade.jpg?v=1614379593',
        handle: 'fiddle-conversion-upgrade',
        requires_shipping: true,
        product_type: '',
        product_title: 'Fiddle Conversion Upgrade',
        product_description:
          'The Fiddle Conversion Upgrade includes Helicore strings, a bridge with a flatter arch, and a Giuliani carbon fiber bow. The stranded steel-core Helicore strings produce a warm, clear sound, while the flatter bridge allows for easy double and triple stops. The bow is strong and responsive, constructed with solid carbon fiber and genuine Mongolian horsehair for a smooth, full tone.',
        variant_title: null,
        variant_options: ['Default Title'],
        options_with_values: [
          {
            name: 'Title',
            value: 'Default Title'
          }
        ],
        line_level_discount_allocations: [],
        line_level_total_discount: 0
      },
      {
        id: 40950691856540,
        properties: {
          OutfitID: '1635958165236'
        },
        quantity: 1,
        variant_id: 40950691856540,
        key: '40950691856540:2092664e5050d9c4883e7110e55a991b',
        title: 'Carbon Fiber Bow Upgrade VN1 - 3/4',
        price: 2300,
        original_price: 2300,
        discounted_price: 2300,
        line_price: 2300,
        original_line_price: 2300,
        total_discount: 0,
        discounts: [],
        sku: '',
        grams: 454,
        vendor: 'Kennedy Violins',
        taxable: true,
        product_id: 7046975226012,
        product_has_only_default_variant: false,
        gift_card: false,
        final_price: 2300,
        final_line_price: 2300,
        url: '/products/carbon-fiber-bow-upgrade-vn1?variant=40950691856540',
        featured_image: {
          aspect_ratio: 1,
          alt: 'Carbon Fiber Bow Upgrade VN1',
          height: 500,
          url: 'https://cdn.shopify.com/s/files/1/2994/5334/products/41iNfeJ7RyL_017357be-11ef-4804-9858-3e0f75e34859.jpg?v=1633381222',
          width: 500
        },
        image:
          'https://cdn.shopify.com/s/files/1/2994/5334/products/41iNfeJ7RyL_017357be-11ef-4804-9858-3e0f75e34859.jpg?v=1633381222',
        handle: 'carbon-fiber-bow-upgrade-vn1',
        requires_shipping: true,
        product_type: 'Accessory',
        product_title: 'Carbon Fiber Bow Upgrade VN1',
        product_description:
          'An upgrade from the Giuliani Brazilwood Bow, the Giuliani Carbon Fiber Bow is responsive, balanced, springy, and powerful. It features a solid carbon fiber stick, fully-mounted ebony frog, and real Mongolian horsehair. The bow is strong and resistant to warping while also being lightweight and responsive, making it a great choice for both young and experienced players. With such a stable, strong stick, performers can play powerfully with heavier strokes to create more volume.\n',
        variant_title: '3/4',
        variant_options: ['3/4'],
        options_with_values: [
          {
            name: 'Size',
            value: '3/4'
          }
        ],
        line_level_discount_allocations: [],
        line_level_total_discount: 0
      },
      {
        id: 36266154688668,
        properties: {
          OutfitID: '1635958165236',
          Size: '3/4',
          'Included Bow': 'Carbon Fiber Bow Upgrade VN1'
        },
        quantity: 1,
        variant_id: 36266154688668,
        key: '36266154688668:0b54be855de5faac6c1413ecb649d80c',
        title:
          'Antonio Giuliani Etude "Vecchio Modello" Fractional Violin Outfit - 3/4',
        price: 37499,
        original_price: 37499,
        discounted_price: 37499,
        line_price: 37499,
        original_line_price: 37499,
        total_discount: 0,
        discounts: [],
        sku: '',
        grams: 4536,
        vendor: 'Antonio Giuliani',
        taxable: true,
        product_id: 5691249098908,
        product_has_only_default_variant: false,
        gift_card: false,
        final_price: 37499,
        final_line_price: 37499,
        url: '/products/antonio-giuliani-etude-rouge-fractional-violin-outfit?variant=36266154688668',
        featured_image: {
          aspect_ratio: 1,
          alt: 'Antonio Giuliani Etude "Vecchio Modello" Fractional Violin Outfit',
          height: 2000,
          url: 'https://cdn.shopify.com/s/files/1/2994/5334/products/Etude-Vecchio-Modello_Outfit.jpg?v=1620338435',
          width: 2000
        },
        image:
          'https://cdn.shopify.com/s/files/1/2994/5334/products/Etude-Vecchio-Modello_Outfit.jpg?v=1620338435',
        handle: 'antonio-giuliani-etude-rouge-fractional-violin-outfit',
        requires_shipping: true,
        product_type: 'Instrument',
        product_title:
          'Antonio Giuliani Etude "Vecchio Modello" Fractional Violin Outfit',
        product_description:
          'The Antonio Giuliani Etude ""Vecchio Modello" Fractional Violin has a significantly more resonant tone than other student violins, and a sweet singing voice. The Etude’s clear and resonant character make for the perfect violin for students and anyone looking for a high-quality fractional or full-size violin with an exceptional sound.\n\nHigh quality composite tailpiece with independent built in fine tuners.\nHigh-quality spruce top and maple back tonewoods\nRich, warm-toned oil finish\nInlaid purfling\nBeautifully carved ebony fittings including polished fingerboard and pegs\nPrelude strings installed\nBackup set of replacement strings (basic steel)\n\nGiuliani Light Rosin\n',
        variant_title: '3/4',
        variant_options: ['3/4'],
        options_with_values: [
          {
            name: 'Size',
            value: '3/4'
          }
        ],
        line_level_discount_allocations: [],
        line_level_total_discount: 0
      }
    ],
    requires_shipping: true,
    currency: 'USD',
    items_subtotal_price: 44699,
    cart_level_discount_applications: []
  });

  useEffect(() => {
    console.log('Running');
    axios({
      method: 'get',
      url: '/cart.js'
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="Cart__Container">
      <h2>Your Cart:</h2>
      {cart.items.map((product, i) => {
        return (
          <React.Fragment key={i}>
            <div className="Cart__Divider" />
            <CartProduct product={product} />
          </React.Fragment>
        );
      })}
      <div className="Cart__Divider" />
      <div className="Cart__Summary">
        <h4>Select shipping and payment options in checkout</h4>
        <div className="Cart__Totals">
          <p>
            Total: <span>${cart.total_price / 100}</span>
          </p>
          <Button text="Remove" />
        </div>
      </div>
    </div>
  );
}
