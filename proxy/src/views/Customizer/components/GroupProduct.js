import React, { useMemo } from 'react';

export default function GroupProduct({
  product,
  openModal,
  basket,
  setBasket,
  section
}) {
  const [image, title, variants] = useMemo(() => {
    let { image, title, variants } = product.data;

    return [image, title, variants];
  }, [product]);

  const exclusiveProducts = ['String', 'Case', 'Bow'];

  const addToBasket = (product, variant, add) => {
    if (add) {
      // Add Product To Cart
      if (basket.products.length == 0) {
        let updatedBasket = {
          ...basket,
          products: [{ product, variant, section }]
        };
        setBasket(updatedBasket);
      } else {
        let tags = product.data.tags;
        let isExclusive = false;
        let exclusiveTag;
        exclusiveProducts.forEach((tag) => {
          let indexOfTag = tags.indexOf(tag);
          if (indexOfTag > -1) {
            exclusiveTag = tag;
            isExclusive = true;
          }
        });
        if (isExclusive) {
          // If Product Is Exclusive
          let updatedProducts = basket.products.filter(
            (x) => x.product.data.tags.indexOf(exclusiveTag) === -1
          );
          let updatedBasket = {
            ...basket,
            products: [...updatedProducts, { product, variant, section }]
          };
          setBasket(updatedBasket);
        } else {
          let updatedBasket = {
            ...basket,
            products: [...basket.products, { product, variant, section }]
          };
          setBasket(updatedBasket);
        }
      }
    } else {
      // Remove Product From Cart
      let updatedProducts = basket.products.filter(
        (x) => x.variant.id !== variant.id
      );
      let updatedBasket = {
        ...basket,
        products: [...updatedProducts]
      };
      setBasket(updatedBasket);
    }
  };

  return (
    <div className="GroupProduct__Container">
      <img src={image.src} className="GroupProduct__Image" />
      <div>
        <p style={{ fontSize: '12px' }} className="GroupProduct__Title">
          {title}
        </p>
        {variants.map((x, i) => {
          let inputChecked =
            basket.products.filter((e) => e.variant.id === x.id).length > 0;
          return (
            <React.Fragment key={i}>
              <input
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                className="Input__Checkbox"
                checked={inputChecked}
                onClick={(e) => {
                  addToBasket(product, x, e.target.checked);
                }}
              />
              <label htmlFor="vehicle1" className="Variant__Label">
                {x.title}
              </label>
              <br></br>
            </React.Fragment>
          );
        })}
      </div>
      <p
        className="QuickLook__Open"
        onClick={() => {
          openModal(product);
        }}
      >
        QUICK LOOK
      </p>
    </div>
  );
}
