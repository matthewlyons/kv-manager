import React, { useState, useEffect } from 'react';

import { makeRequest } from '../../util';
import Shipping_Estimates from './components/Shipping_Estimates';
import Shipping_Single_Estimate from './components/Shipping_Single_Estimate';

export default function Shipping_Home() {
  const [shippingRates, setShippingRates] = useState([]);
  const [rate, setRate] = useState(false);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    // makeRequest('get', '/shipping/quotes').then((data) => {
    //   console.log(data);
    //   setShippingRates(data);
    // });
    let rates = [
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      },
      {
        date: '2020-09-04T19:15:33.929Z',
        destination: {
          country: 'US',
          postal_code: '18505',
          province: 'PA',
          city: 'Scranton'
        },
        items: [
          {
            _id: '5f52925510025e0017112103',
            name: 'Elite Violin Case Cart Upgrade - Royal Blue',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112104',
            name:
              'Thomastik-Infeld Dominant Violin String Set Cart Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112105',
            name: 'CodaBow Diamond NX Upgrade - 4/4',
            quantity: 1
          },
          {
            _id: '5f52925510025e0017112106',
            name: 'Louis Carpini G2 Violin Outfit - 4/4 / Royal Blue',
            quantity: 1
          }
        ],
        packages: [
          {
            dimensions: { length: 40, width: 8, height: 12 },
            weight: { value: 160 }
          }
        ],

        rates: [
          {
            _id: '5f52925510025e0017112107',
            service_name: 'USPS Parcel Select Ground',
            service_code: 'usps_parcel_select',
            total_price: 6763
          },
          {
            _id: '5f52925510025e0017112108',
            service_name: 'UPS 3 Day Select®',
            service_code: 'ups_3_day_select',
            total_price: 8184
          },
          {
            _id: '5f52925510025e0017112109',
            service_name: 'UPS 2nd Day Air®',
            service_code: 'ups_2nd_day_air',
            total_price: 11721
          },
          {
            _id: '5f52925510025e001711210a',
            service_name: 'Free Shipping',
            service_code: 'FS',
            total_price: 0
          }
        ]
      }
    ];
    setLoading(false);
    setShippingRates(rates);
  }, []);

  useEffect(() => {
    console.log(rate);
  }, [rate]);

  const selectRate = (rate) => {
    setRate(Number(rate));
  };
  const deselectRate = () => {
    setRate(false);
  };

  const refreshRates = () => {
    console.log('Getting Rates');
  };

  const nextRate = () => {
    if (rate === shippingRates.length - 1) {
      setRate(0);
    } else {
      setRate(rate + 1);
    }
  };
  const prevRate = () => {
    if (rate === 0) {
      setRate(shippingRates.length - 1);
    } else {
      setRate(rate - 1);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <React.Fragment>
          {rate === false ? (
            <Shipping_Estimates
              shippingRates={shippingRates}
              selectRate={selectRate}
            />
          ) : (
            <Shipping_Single_Estimate
              rate={shippingRates[rate]}
              deselectRate={deselectRate}
              nextRate={nextRate}
              prevRate={prevRate}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
