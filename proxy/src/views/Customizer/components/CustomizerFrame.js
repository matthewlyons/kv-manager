import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import CustomizerProductVariant from './CustomizerProductVariant';
import CustomizerProduct from './CustomizerProduct';

export default function CustomizerFrame({
  step,
  index,
  group,
  basket,
  addToBasket
}) {
  let className = useMemo(() => {
    if (step == index) {
      return 'Customizer__Frame Customizer__Frame--Active';
    } else {
      return 'Customizer__Frame Customizer__Frame--Inactive';
    }
  }, [step]);

  return (
    <React.Fragment>
      <div className={className}>
        {group.includedProducts?.length > 0 && (
          <div>
            <h3 className="Product__Header">
              Select your Included {group.section}
            </h3>
            <div className="Customizer__VariantsContainer">
              {group.includedProducts.map((product, i) => {
                return (
                  <React.Fragment key={i}>
                    {product.variants.length > 1 ? (
                      <React.Fragment>
                        {product.variants.map((variant, i) => {
                          return (
                            <CustomizerProductVariant
                              addToBasket={addToBasket}
                              key={i}
                              basket={basket}
                              group={group}
                              upgrade={false}
                              variant={variant}
                              product={product}
                            />
                          );
                        })}
                      </React.Fragment>
                    ) : (
                      <div>
                        {product.variants.map((variant, i) => {
                          return (
                            <CustomizerProduct
                              addToBasket={addToBasket}
                              key={i}
                              basket={basket}
                              group={group}
                              upgrade={false}
                              variant={variant}
                              product={product}
                            />
                          );
                        })}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
        {group.upgradeProducts?.length > 0 && (
          <div>
            {group.includedProducts?.length > 0 ? (
              <h3 className="Product__Header">
                Or Choose an Upgraded {group.section}
              </h3>
            ) : (
              <h3 className="Product__Header">
                Would you like to Upgrade Your {group.section}?
              </h3>
            )}
            <div className="Customizer__VariantsContainer">
              {group.upgradeProducts.map((product, i) => {
                return (
                  <React.Fragment key={i}>
                    {product.variants.length > 1 ? (
                      <React.Fragment>
                        {product.variants.map((variant, i) => {
                          return (
                            <CustomizerProductVariant
                              addToBasket={addToBasket}
                              key={i}
                              basket={basket}
                              group={group}
                              upgrade={true}
                              variant={variant}
                              product={product}
                            />
                          );
                        })}
                      </React.Fragment>
                    ) : (
                      <div>
                        {product.variants.map((variant, i) => {
                          return (
                            <CustomizerProduct
                              addToBasket={addToBasket}
                              key={i}
                              basket={basket}
                              group={group}
                              upgrade={true}
                              variant={variant}
                              product={product}
                            />
                          );
                        })}
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
