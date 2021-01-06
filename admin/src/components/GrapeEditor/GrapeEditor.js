import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import { useParams } from 'react-router-dom';

import { Page, Layout } from '@shopify/polaris';
import 'grapesjs/dist/css/grapes.min.css';

import { makeRequest } from '../../util';

export default function GrapeEditor() {
  let { id } = useParams();

  useEffect(() => {
    let editor = grapesjs.init({
      container: '#gjs',
      height: '91vh',
      fromElement: true,
      canvas: {
        styles: [
          'https://cdn.shopify.com/s/files/1/2994/5334/t/19/assets/theme.scss.css?v=15420009574473144588'
        ]
      },
      storageManager: {
        id: 'gjs-', // Prefix identifier that will be used on parameters
        type: 'remote',
        urlStore: `/admin/pages/${id}`,
        urlLoad: `/admin/pages/${id}`,
        autosave: false, // Store data automatically
        autoload: true, // Autoload stored data on init
        headers: { Authorization: 'Bearer ' + window.authToken }
      },
      blockManager: {
        appendTo: '#blocks',
        blocks: [
          {
            id: 'section', // id is mandatory
            label: '<b>Section</b>', // You can use HTML/SVG inside labels
            attributes: { class: 'gjs-block-section' },
            content: `<section>
              <h1>This is a simple title</h1>
              <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
            </section>`
          },
          {
            id: 'text',
            label: 'Text',
            content:
              '<div data-gjs-type="text"><h1>Insert your header text here</h1><p>Insert your text here</p></div>'
          }
        ]
      }
    });

    let pnm = editor.Panels;

    const storageManager = editor.StorageManager;
    console.log(editor.getHtml());

    pnm.removeButton('options', [
      {
        id: 'sw-visibility'
      },
      {
        id: 'preview'
      },
      {
        id: 'export-template'
      },
      {
        id: 'mjml-import'
      }
    ]);
    pnm.addButton('options', [
      {
        id: 'save-code',
        className: 'fa fa-save',
        command: {
          run: function (editor, sender) {
            editor.store();
            let htmldata = editor.getHtml();
            makeRequest('POST', `/shopify/page/${id}`, { html: htmldata }).then(
              (data) => {
                console.log(data);
              }
            );
          }
        }
      },
      {
        id: 'clear-all',
        className: 'fa fa-trash icon-blank',
        attributes: { title: 'Clear canvas' },
        command: {
          run: function (editor, sender) {
            console.log('Deleting Code');
          }
        }
      }
    ]);
  }, []);
  return (
    <React.Fragment>
      <Page
        full-width
        title="Edit Page"
        breadcrumbs={[
          {
            content: 'Back',
            url: '/Page'
          }
        ]}
      ></Page>
      <div id="gjs"></div>
    </React.Fragment>
  );
}
