import React, { useState, useEffect } from "react";

import {
  Page,
  Layout,
  SkeletonBodyText,
  Card,
  ResourceList,
  TextStyle,
} from "@shopify/polaris";

import { makeRequest } from "../../util";

export default function Pages_Home() {
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);

  return (
    <Page
      full-width
      title="Page Editor"
      breadcrumbs={[
        {
          content: "Back",
          url: "/",
        },
      ]}
    >
      <Layout>
        <Layout.Section>
          {loading ? (
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          ) : (
            <Card>
              <ResourceList
                resourceName={{ singular: "teacher", plural: "teachers" }}
                items={pages}
                renderItem={(item) => {
                  const url = "/Page/" + item.id;
                  return (
                    <ResourceList.Item url={url}>
                      <h3>
                        <TextStyle variation="strong">{item.title}</TextStyle>
                      </h3>
                    </ResourceList.Item>
                  );
                }}
              />
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
