import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function CustomizerFrame({
  step,
  index,
  group,
  basket,
  addToBasket
}) {
  let className = useMemo(() => {
    if (step > index) {
      return 'Customizer__Frame Customizer__Frame--Previous';
    } else if (step < index) {
      return 'Customizer__Frame Customizer__Frame--Next';
    } else {
      return 'Customizer__Frame Customizer__Frame--Active';
    }
  }, [step]);

  return (
    <React.Fragment>
      {step == index && (
        <div className={className}>
          {group.includedProducts?.length > 0 && (
            <div>
              <h3>Select your Included {group.section}</h3>
              {group.includedProducts.map((product) => {
                return (
                  <div className="Customizer__Product">
                    {product.variants.length > 1 ? (
                      <React.Fragment>
                        <h3>{product.title}</h3>
                        <div className="Customizer__OptionContainer">
                          {product.variants.map((variant) => {
                            return (
                              <div
                                className={
                                  basket[group.section]?.variant.id ===
                                  variant.id
                                    ? 'Customizer__Option Customizer__Option--Active'
                                    : 'Customizer__Option'
                                }
                                onClick={() => {
                                  addToBasket(
                                    group.section,
                                    product.title,
                                    {
                                      id: variant.id,
                                      option: variant.option.value
                                    },
                                    product.price
                                  );
                                }}
                              >
                                {variant.image && <img src={variant.image} />}
                                <h3>
                                  {variant.option.key}: {variant.option.value}
                                </h3>
                              </div>
                            );
                          })}
                        </div>
                      </React.Fragment>
                    ) : (
                      <div className="Customizer__OptionContainer">
                        {product.variants.map((variant) => {
                          return (
                            <div
                              className={
                                basket[group.section]?.variant.id === variant.id
                                  ? 'Customizer__Option Customizer__Option--Active'
                                  : 'Customizer__Option'
                              }
                              onClick={() => {
                                addToBasket(
                                  group.section,
                                  product.title,
                                  {
                                    id: variant.id
                                  },
                                  product.price
                                );
                              }}
                            >
                              {product.image && <img src={product.image} />}
                              <h3>{product.title}</h3>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
          {group.upgradeProducts?.length > 0 && (
            <div>
              {group.includedProducts?.length > 0 ? (
                <h3>Or Choose an Upgraded {group.section}</h3>
              ) : (
                <h3>Would you like to Upgrade Your {group.section}?</h3>
              )}

              {group.upgradeProducts.map((product) => {
                return (
                  <div className="Customizer__Product">
                    {product.variants.length > 1 ? (
                      <React.Fragment>
                        <h3>{product.title}</h3>
                        <div className="Customizer__OptionContainer">
                          {product.variants.map((variant) => {
                            return (
                              <div
                                className={
                                  basket[group.section]?.variant.id ===
                                  variant.id
                                    ? 'Customizer__Option Customizer__Option--Active'
                                    : 'Customizer__Option'
                                }
                                onClick={() => {
                                  addToBasket(
                                    group.section,
                                    product.title,
                                    {
                                      id: variant.id,
                                      option: variant.option.value
                                    },
                                    product.price,
                                    true
                                  );
                                }}
                              >
                                {variant.image && <img src={variant.image} />}
                                <h3>
                                  {variant.option.key}: {variant.option.value}
                                </h3>
                              </div>
                            );
                          })}
                        </div>
                      </React.Fragment>
                    ) : (
                      <div className="Customizer__OptionContainer">
                        {product.variants.map((variant) => {
                          return (
                            <div
                              className={
                                basket[group.section]?.variant.id === variant.id
                                  ? 'Customizer__Option Customizer__Option--Active'
                                  : 'Customizer__Option'
                              }
                              onClick={() => {
                                addToBasket(
                                  group.section,
                                  product.title,
                                  {
                                    id: variant.id
                                  },
                                  product.price
                                );
                              }}
                            >
                              {product.image && <img src={product.image} />}
                              <h3>{product.title}</h3>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
