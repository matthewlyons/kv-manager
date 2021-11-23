import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeRequest } from '../../util';

import SelectedProductDisplay from './components/SelectedProductDisplay';
import CustomizerGroup from './components/CustomizerGroup';
import './style.css';
import Button from './components/Button';

export default function Customizer() {
  let { id } = useParams();

  const [instrument, setInstrument] = useState({});
  const [variant, setVariant] = useState({});
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    makeRequest('get', '/customizer/get/' + id).then((res) => {
      console.log(res);
      setInstrument(res.instrument);
      let foundVariant = res.instrument.data.variants.filter((x) => x.id == id);
      setVariant(foundVariant[0]);
      setTabs(res.tabs);
    });
  }, []);

  return (
    <div className="Customizer__Container">
      <div>
        <h3>Your Selections:</h3>
      </div>
      <div className="Selections__Container">
        <div className="SelectedProducts">
          <SelectedProductDisplay
            image="https://cdn.shopify.com/s/files/1/2994/5334/products/Oblong_DkBlue_Angle_1200x1200.jpg?v=1604718959"
            title={instrument.data?.title}
            subheading={variant.price ? '$' + variant.price : ''}
          />
          <SelectedProductDisplay
            image="https://cdn.shopify.com/s/files/1/2994/5334/products/Oblong_DkBlue_Angle_1200x1200.jpg?v=1604718959"
            title="Hello World"
            subheading="Choose Color"
          />
        </div>
        <div>
          <div>
            <h4 style={{ fontWeight: 'bold' }}>Your Outfit:</h4>
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold' }}>Your Setup:</h4>
          </div>
        </div>
        <div>
          <div style={{ textAlign: 'center' }}>
            <p>Quantity:</p>
            <input type="number" min="1" max="10" value={1} />
            <p>at $669.99 ea</p>
            <br />
            <h3>
              Total: <span>$699.99</span>
            </h3>
            <p>It's Perfect</p>
            <Button text="Add To Cart" />
          </div>
        </div>
      </div>
      <div>
        <h3>Customize Your Order...</h3>
        <p>
          Upgrade options will replace the standard items in your outfit. Make
          your selections below.
        </p>
        <CustomizerGroup
          tabs={tabs}
          active={active}
          onChange={(e) => {
            setActive(e);
          }}
        />
      </div>
    </div>
  );
}
