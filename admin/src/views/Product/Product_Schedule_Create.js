import React, { useState, useCallback, useEffect } from "react";

import { useHistory } from "react-router-dom";

import moment from "moment";

import {
  Page,
  Layout,
  FormLayout,
  Card,
  SkeletonBodyText,
  Modal,
  DatePicker,
  Select,
} from "@shopify/polaris";

import useQuery from "../../hooks/useQuery";

import { makeRequest } from "../../util";
import EventForm from "./components/EventForm";

export default function Product_Schedule_View() {
  let history = useHistory();
  let id = useQuery().get("id");
  const [event, setEvent] = useState({});
  const [product, setProduct] = useState({});
  const [metafields, setMetafields] = useState([]);
  const [dbID, setDBID] = useState("");

  const [{ month, year }, setDate] = useState({
    month:
      moment().date() === moment().daysInMonth()
        ? moment().add(1, "month").month()
        : moment().month(),
    year: moment().year(),
  });

  const [selectedDates, setSelectedDates] = useState({
    start: new Date(moment().add(1, "day").startOf("day")),
    end: new Date(moment().add(7, "day").startOf("day")),
  });

  const [data, setData] = useState({ start: 12, end: 12 });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleInputChange = (field) => {
    return (value) => {
      setData({ ...data, [field]: Number(value) });
    };
  };

  const [loading, setLoading] = useState(true);
  const [dateModal, setDateModal] = useState(false);

  const handleSubmit = (eventProduct) => {
    let eventMetafields = [];
    let activeMetafields = [];

    eventProduct.metafields.forEach((field, i) => {
      if (field.active) {
        eventMetafields.push(field);
        activeMetafields.push(metafields[i]);
      }
    });

    let variants = product.variants.map((e) => {
      return {
        shopifyID: e.id,
        price: e.price,
        compare_at_price: e.compare_at_price,
      };
    });

    let current = {
      admin: {
        title: product.title,
        body_html: product.body_html,
      },
      variants,
      metafields: activeMetafields,
    };

    let finalStartTime = moment(selectedDates.start).set("hour", data.start);
    let finalEndTime = moment(selectedDates.end).set("hour", data.end);

    let object = {
      active: false,
      shopifyID: id,
      start: finalStartTime,
      end: finalEndTime,
      current,
      event: { ...eventProduct, metafields: eventMetafields },
    };
    console.log(object);
    if (dbID !== "") {
      makeRequest("PUT", `/product/event/${dbID}`, object).then((data) => {
        console.log(data);
        history.push(`/Product/Schedule/Event/${data._id}`);
      });
    } else {
      makeRequest("POST", `/product/event/`, object).then((data) => {
        console.log(data);
        history.push(`/Product/Schedule/Event/${data._id}`);
      });
    }
  };

  const toggleModal = (modal) => {
    switch (modal) {
      case "date":
        setDateModal(!dateModal);
        break;
      default:
        break;
    }
  };

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  const getNamespace = (key) => {
    switch (key) {
      case "original_price":
        return "accentuate";
        break;
      case "short_description":
      case "product_highlight_1":
      case "product_highlight_2":
      case "product_highlight_3":
      case "product_highlight_4":
        return "header";
        break;
      case "included_accessories":
      case "included_bow":
      case "included_case":
      case "included_rosin":
        return "outfit";
        break;
      case "sale_banner_header":
      case "sale_banner_paragraph":
        return "outfit";
        break;
      default:
        break;
    }
  };

  const timeOptions = [
    { label: "1 AM", value: 1 },
    { label: "2 AM", value: 2 },
    { label: "3 AM", value: 3 },
    { label: "4 AM", value: 4 },
    { label: "5 AM", value: 5 },
    { label: "6 AM", value: 6 },
    { label: "7 AM", value: 7 },
    { label: "8 AM", value: 8 },
    { label: "9 AM", value: 9 },
    { label: "10 AM", value: 10 },
    { label: "11 AM", value: 11 },
    { label: "Noon", value: 12 },
    { label: "1 PM", value: 13 },
    { label: "2 PM", value: 14 },
    { label: "3 PM", value: 15 },
    { label: "4 PM", value: 16 },
    { label: "5 PM", value: 17 },
    { label: "6 PM", value: 18 },
    { label: "7 PM", value: 19 },
    { label: "8 PM", value: 20 },
    { label: "9 PM", value: 21 },
    { label: "10 PM", value: 22 },
    { label: "11 PM", value: 23 },
    { label: "Midnight", value: 24 },
  ];

  useEffect(() => {
    makeRequest("GET", `/shopify/products/${id}`).then((data) => {
      console.log(data);
      setProduct(data.product);
      let requiredMetafields = [
        "original_price",
        "retail_price",
        "sale_banner_header",
        "sale_banner_paragraph",
        "short_description",
        "product_highlight_1",
        "product_highlight_2",
        "product_highlight_3",
        "product_highlight_4",
        "included_accessories",
        "included_bow",
        "included_case",
        "included_rosin",
      ];
      let selectedMetafields = [];
      let eventMetafields = [];
      let metafields = data.metafields.metafields;

      requiredMetafields.forEach((field) => {
        let found = metafields.find((x) => x.key === field);
        if (found) {
          selectedMetafields.push({ ...found, active: false });
          eventMetafields.push(found);
        } else {
          let namespace = getNamespace(field);
          eventMetafields.push({
            namespace,
            key: field,
            value: "",
            active: false,
            value_type: "string",
          });
          selectedMetafields.push({
            namespace,
            key: field,
            value: "",
            value_type: "string",
          });
        }
      });
      setEvent(data.event);
      if (data.event) {
        setDBID(data.event._id);
        let { start, end } = data.event;
        setSelectedDates({ start: new Date(start), end: new Date(end) });
      }
      setMetafields(selectedMetafields);
      setLoading(false);
    });
  }, []);

  return (
    <Page
      full-width
      separator
      title="Edit Product"
      breadcrumbs={[
        {
          content: "Back",
          url: "/Product/Schedule",
        },
      ]}
      primaryAction={{
        content: "Edit Dates",
        onAction: () => {
          toggleModal("date");
        },
      }}
    >
      <Layout>
        {loading ? (
          <Layout.Section>
            <Card sectioned>
              <SkeletonBodyText />
            </Card>
          </Layout.Section>
        ) : (
          <EventForm
            ParentProduct={{ ...product }}
            ParentMetafields={metafields}
            SubmitProduct={handleSubmit}
            Event={event}
          />
        )}
      </Layout>
      <Modal
        open={dateModal}
        onClose={() => toggleModal("date")}
        title="Edit Active Dates"
      >
        <Modal.Section>
          <FormLayout>
            <DatePicker
              month={month}
              year={year}
              onChange={setSelectedDates}
              onMonthChange={handleMonthChange}
              selected={selectedDates}
              allowRange={true}
              disableDatesBefore={new Date(Date.now())}
            />
            <Select
              label="Start Time"
              options={timeOptions}
              onChange={handleInputChange("start")}
              value={data.start}
            />
            <Select
              label="End Time"
              options={timeOptions}
              onChange={handleInputChange("end")}
              value={data.end}
            />
          </FormLayout>
        </Modal.Section>
      </Modal>
    </Page>
  );
}
