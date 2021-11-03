import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CustomizerControls from './components/CustomizerControls';
import CustomizerFrame from './components/CustomizerFrame';
import CustomizerIcons from './components/CustomizerIcons';
import CustomizerSummary from './components/CustomizerSummary';
import './style.css';

export default function Customizer() {
  let { id } = useParams();

  const [step, setStep] = useState(0);
  const [customizerID, setCustomizerID] = useState(Date.now());

  const [variant, setVariant] = useState(123456);

  const [groups, setGroups] = useState([]);

  const [defaults, setDefaults] = useState({});

  useEffect(() => {
    const data = [
      {
        title: 'Cases',
        section: 'Case',
        includedProducts: [
          {
            title: 'Portland Oblong Case',
            variants: [
              {
                id: 124441524,
                option: { key: 'Color', value: 'Light Blue' },
                image:
                  'https://cdn.shopify.com/s/files/1/2994/5334/products/Oblong_LtBlue_Angle_1200x1200.jpg?v=1604718959',
                default: true
              },
              {
                id: 124441525,
                option: { key: 'Color', value: 'Navy' },
                image:
                  'https://cdn.shopify.com/s/files/1/2994/5334/products/Oblong_DkBlue_Angle_1200x1200.jpg?v=1604718959',
                default: false
              }
            ],
            price: 0,
            default: true
          }
        ],
        upgradeProducts: [
          {
            title: 'Portland Elite Case',
            variants: [
              {
                id: 125331524,
                option: { key: 'Color', value: 'Gray' },
                image:
                  'https://cdn.shopify.com/s/files/1/2994/5334/products/Elite-Violin-Case_grey_1200x1200.jpg?v=1600580387'
              },
              {
                id: 125331525,
                option: { key: 'Color', value: 'Blue' },
                image:
                  'https://cdn.shopify.com/s/files/1/2994/5334/products/EliteViolinCase_Blue_Angled_1200x1200.jpg?v=1600580387'
              },
              {
                id: 125331526,
                option: { key: 'Color', value: 'Red' },
                image:
                  'https://cdn.shopify.com/s/files/1/2994/5334/products/Elite-Violin-Case_Red_1200x1200.jpg?v=1600580387'
              }
            ],
            price: 500
          },
          {
            title: 'Portland Hardshell Case',
            variants: [
              {
                id: 125431524,
                option: { key: 'Color', value: 'White' },
                image:
                  'https://cdn.shopify.com/s/files/1/2994/5334/products/White_Front_Back_1200x1200.jpg?v=1545849346'
              },
              {
                id: 125431525,
                option: { key: 'Color', value: 'Red' },
                image:
                  'https://cdn.shopify.com/s/files/1/2994/5334/products/Red_Hard_Case_Front_Back_1200x1200.jpg?v=1545849346'
              },
              {
                id: 125431526,
                option: { key: 'Color', value: 'Black' },
                image:
                  'https://cdn.shopify.com/s/files/1/2994/5334/products/Black_Case_Front_Back_1200x1200.jpg?v=1545849346'
              }
            ],
            price: 500
          }
        ],
        complete: false
      },
      {
        title: 'Bows',
        section: 'Bow',
        upgradeProducts: [
          {
            title: 'Giuliani Brazilwood Violin Bow',
            image:
              'https://cdn.shopify.com/s/files/1/2994/5334/products/Premier_Full_small.jpg?v=1527788437',
            variants: [{ id: 124441524 }],
            price: 42.76
          },
          {
            title: 'Giuliani Carbon Fiber Violin Bow',
            image:
              'https://cdn.shopify.com/s/files/1/2994/5334/products/41hxo7asKTL_a716303a-07be-485b-ad99-c83577baab5b_small.jpg?v=1534463439',
            variants: [{ id: 124331524 }],
            price: 65.89
          }
        ],
        complete: false
      },
      {
        title: 'Strings',
        section: 'String',
        upgradeProducts: [
          {
            title: 'Thomastik Alphayue Violin String Set',
            image:
              'https://cdn.shopify.com/s/files/1/2994/5334/products/Thomastik-Alphayue_1080x1080__19363.1462299160.1280.1280_a3ee00ed-2538-49d6-80ef-509165e7d36b_small.png?v=1551900727',
            variants: [{ id: 1 }],
            price: 24.98
          },
          {
            title: 'Thomastik-Infeld Dominant Violin String Set ',
            image:
              'https://cdn.shopify.com/s/files/1/2994/5334/products/Dominant_Strings1__35831.1309389769.444.444_aaa8fbd5-7b09-4423-9603-3d7e39e1e85f_small.jpg?v=1551902921',
            variants: [{ id: 2 }],
            price: 61.16
          },
          {
            title: "D'Addario Zyex Violin Strings Cart Upgrade",
            image:
              'https://cdn.shopify.com/s/files/1/2994/5334/products/810mUDSPUZL._SX425_7b755816-f079-4b94-8a26-c804d4b4a2c3_small.jpg?v=1551905710',
            variants: [{ id: 3 }],
            price: 39.78
          },
          {
            title: "D'Addario Helicore Violin String Set",
            image:
              'https://cdn.shopify.com/s/files/1/2994/5334/products/71vJgcGpqBL._SL1500_cadf8be4-bcec-46fa-9952-de9780761664_small.jpg?v=1551905976',
            variants: [{ id: 4 }],
            price: 41.13
          }
        ],
        complete: false
      }
    ];
    setGroups(data);
    let newBasket = {};
    data.forEach((group) => {
      if (group.includedProducts?.length > 0) {
        group.includedProducts.forEach((product) => {
          if (product.default) {
            product.variants.forEach((variant) => {
              if (variant.default) {
                newBasket[group.section] = {
                  product: product.title,
                  price: product.price,
                  upgrade: false,
                  variant: { id: variant.id, option: variant.option.value }
                };
              }
            });
          }
        });
      }
    });
    setBasket(newBasket);
    setDefaults(newBasket);
  }, []);

  const [basket, setBasket] = useState({});

  const addToBasket = (section, product, variant, price, upgrade = false) => {
    console.log(section, product, variant, price, upgrade);
    if (basket[section]?.variant.id === variant.id) {
      let updatedBasket = { ...basket };
      if (defaults[section]) {
        updatedBasket[section] = defaults[section];
      } else {
        delete updatedBasket[section];
      }
      setBasket(updatedBasket);
      let updatedGroups = groups.map((group) => {
        if (group.section === section) {
          return { ...group, complete: false };
        } else {
          return { ...group };
        }
      });
      setGroups(updatedGroups);
    } else {
      let updatedBasket = {
        ...basket,
        [section]: { product, variant, price, upgrade }
      };
      setBasket(updatedBasket);
      if (upgrade) {
        let updatedGroups = groups.map((group) => {
          if (group.section === section) {
            return { ...group, complete: true };
          } else {
            return { ...group };
          }
        });
        setGroups(updatedGroups);
      } else {
        let updatedGroups = groups.map((group) => {
          if (group.section === section) {
            return { ...group, complete: false };
          } else {
            return { ...group };
          }
        });
        setGroups(updatedGroups);
      }
    }
  };

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
