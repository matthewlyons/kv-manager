import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitForDomChange } from '@testing-library/react';

// Component Requirements
import Modal_Add_Class from './Modal_Add_Class';
import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

describe("Test", () => {
    beforeAll(() => {  
      Object.defineProperty(window, "matchMedia", {
        value: jest.fn().mockImplementation(query => ({
          media: query,
        }))
      });
    });
    it('Throws an error without teachers', () => {
        const modal = () =>{
            render(<AppProvider i18n={enTranslations}><Modal_Add_Class addClassModal={true}/></AppProvider>);
        }
        expect(modal).toThrow();
      });
    it('Renders Add a Class Modal', () => {
        const { getByText } = render(<AppProvider i18n={enTranslations}><Modal_Add_Class addClassModal={true} toggleModal={()=>{console.log("Hello")}} teachers={[{_id:"2s1df2s1df"}]} addClass={()=>{console.log("Hello")}}/></AppProvider>);
        expect(getByText('Add a Class')).toBeInTheDocument();
      });
  });
