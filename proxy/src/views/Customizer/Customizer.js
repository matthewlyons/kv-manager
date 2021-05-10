import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
              'https://cdn.shopify.com/s/files/1/2994/5334/products/Brazilwood_full_large.jpg?v=1545848890',
            variants: [{ id: 124441524 }],
            price: 42.76
          },
          {
            title: 'Giuliani Carbon Fiber Violin Bow',
            image:
              'https://cdn.shopify.com/s/files/1/2994/5334/products/41hxo7asKTL_1200x1200.jpg?v=1545848958',
            variants: [{ id: 124331524 }],
            price: 65.89
          },
          {
            title: 'Giuliani Premier Violin Bow',
            image:
              'https://cdn.shopify.com/s/files/1/2994/5334/products/Premier_Full_943de323-bdf1-4012-ad26-7c2a02329ae6_1200x1200.jpg?v=1545848993',
            variants: [{ id: 124551524 }],
            price: 78.45
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
    if (basket[section]?.variant.id === variant.id) {
      let updatedBasket = { ...basket };
      updatedBasket[section] = defaults[section];
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

  const submitBasket = () => {
    console.log(basket);
    console.log(customizerID);
  };

  return (
    <div>
      <CustomizerIcons groups={groups} step={step} setStep={setStep} />
      <section className="Customizer__View">
        <section className="Customizer__FrameContainer">
          {groups.map((group, i) => {
            return (
              <CustomizerFrame
                key={i}
                step={step}
                index={i}
                group={group}
                basket={basket}
                addToBasket={addToBasket}
              />
            );
          })}
        </section>
      </section>
      <CustomizerSummary
        step={step}
        groups={groups.length}
        setStep={setStep}
        basket={basket}
        submitBasket={submitBasket}
      />
    </div>
  );
}
