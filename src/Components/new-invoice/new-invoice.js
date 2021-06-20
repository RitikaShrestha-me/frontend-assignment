import React, { useState } from "react";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Input,
  Button,
  InputNumber,
  Form,
  notification,
  DatePicker,
  Modal,
} from "antd";
import ReactToPDF from "../react-to-pdf/react-to-pdf";
import "./new-invoice.css";

const { TextArea } = Input;

const NewInvoice = ({ returnInvoice }) => {
  const initState = {
    invoice: {
      key: "INV-1624135952406",
      invoiceId: "INV-1624135952406",
      invoiceName: "Invoice 1",
      customerName: "Test 1",
      customerEmail: "test1@gmail.com",
      address: "No Address",
      dueDate: "2021-06-19T20:39:06.082Z",
      issueDate: "2021-06-19T20:39:03.248Z",
      lineItems: [{ name: "item1", quantity: 1, rate: 1, total: 1 }],
      phone: "91888888888",
      status: "draft",
      amount: 3000,
    },
    lineItems: {
      name: "",
      quantity: 1,
      rate: 1,
    },
  };
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewInvoice, setpreviewInvoice] = useState(false);
  const [note, setnote] = useState("");
  const [invoice, setinvoice] = useState(initState.invoice);
  let [lineItems, setLineItems] = useState([initState.lineItems]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const resetState = () => {
    if (!previewInvoice) {
      document.getElementById("new-invoice-form").reset();
    }
    setIsModalVisible(false);
    setpreviewInvoice(false);
    setnote("");
    setinvoice(initState.invoice);
    setLineItems([
      {
        name: "",
        quantity: 1,
        rate: 1,
      },
    ]);
  };

  const submitInvoice = (invoiceConfig) => {
    const invoice = { ...invoiceConfig };
    let totalAmount = 0;
    for (let i = 0; i < lineItems.length; i++) {
      const item = lineItems[i];
      if (!item.name.trim() || item.quantity < 1 || item.rate < 1) {
        return notification["warning"]({
          message: "Please check the line items",
          description:
            "You need to fill all the line item description. Quantity and Rate should be greater than 1",
        });
      }
      lineItems[i].total = item.rate * item.quantity;
      lineItems[i].key = i;
      totalAmount += item.rate * item.quantity;
    }
    invoice.lineItems = [...lineItems];
    invoice.invoiceId = "INV-" + +new Date();
    invoice.dueDate = new Date(invoice.dueDate._d).toISOString();
    invoice.issueDate = new Date(invoice.issueDate._d).toISOString();
    invoice.amount = totalAmount;
    invoice.status = "draft";
    if (+new Date(invoice.dueDate) < +new Date()) {
      invoice.status = "overdue";
    }
    invoice.note = note;

    notification["success"]({
      message: "Generated your Invoice.",
      description:
        "Invoice is generated. You can download the invoice pdf or mail it to the customer.",
    });
    returnInvoice(invoice);
    setinvoice(invoice);
    setpreviewInvoice(true);
  };

  const handleCancel = () => {
    resetState();
  };

  const onFinish = (values) => {
    // console.log("Success:", values);
    submitInvoice(values);
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    notification["warning"]({
      message: "Please fill all required fields.",
      description:
        "You need to fill all the required fields to proceed. Please check if all details are filled correctly.",
    });
  };

  const modalStyle = {
    top: "15px",
  };

  const addLineItem = () => {
    lineItems.push({
      name: "",
      quantity: 1,
      rate: 1,
    });

    setLineItems([...lineItems]);
  };

  const deleteLineItem = (index) => {
    // console.log("for delete");
    lineItems.splice(index, 1);
    // console.log(lineItems);
    setLineItems([...lineItems]);
  };

  const handleInputChange = (event, index) => {
    if (event) {
      lineItems[index][event.target.name] = event.target.value;
      setLineItems([...lineItems]);
    }
  };
  const handleNoteChange = (event) => {
    if (event) {
      setnote(event.target.value);
    }
  };

  return (
    <>
      <button onClick={showModal} className="new-btn">
        <PlusOutlined className="btn-icon" />
        New Invoice
      </button>
      <Modal
        title="Create New Invoice"
        visible={isModalVisible}
        okText="Submit"
        onCancel={handleCancel}
        width="800px"
        style={modalStyle}
        footer=""
      >
        {!previewInvoice ? (
          <Form
            {...layout}
            id="new-invoice-form"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row
              style={{
                backgroundColor: "#d3d3d33d",
                padding: "15px",
              }}
            >
              <h3 className="line-item-title">Invoice Details</h3>
              <Col span="12">
                <Form.Item
                  label="Invoice Name:"
                  name="invoiceName"
                  rules={[
                    { required: true, message: "Please enter Invoice Name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Customer Name:"
                  name="customerName"
                  rules={[
                    { required: true, message: "Please enter Customer Name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Customer Email:"
                  name="customerEmail"
                  rules={[
                    { required: true, message: "Please enter Customer Email!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Phone:"
                  name="phone"
                  type="tel"
                  rules={[
                    { required: true, message: "Please enter Contact Number!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span="12">
                <Form.Item
                  label="Issue Date:"
                  name="issueDate"
                  rules={[
                    { required: true, message: "Please enter Issue Date!" },
                  ]}
                >
                  <DatePicker showTime />
                </Form.Item>
                <Form.Item
                  label="Due Date:"
                  name="dueDate"
                  rules={[
                    { required: true, message: "Please enter Due Date!" },
                  ]}
                >
                  <DatePicker showTime />
                </Form.Item>
                <Form.Item
                  label="Address:"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Customer Address!",
                    },
                  ]}
                >
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>

            <Row className="additional-info">
              <h3 className="line-item-title">
                Additional Information (Note for Customer)
              </h3>

              <TextArea
                name="note"
                value={note}
                onChange={(event) => handleNoteChange(event)}
              />
            </Row>

            <Row className="line-item-container">
              <h3 className="line-item-title">
                Add you bill line items for invoice
              </h3>
              <Col span={24}>
                <Row>
                  <Col span="13">
                    <h4>Line Item Description</h4>
                  </Col>
                  <Col span="4" offset="1">
                    <h4>Quantity</h4>
                  </Col>
                  <Col span="4">
                    <h4>Rate</h4>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                {lineItems.map((item, index) => {
                  return (
                    <Row key={index} className="line-item-row">
                      <Col span="13">
                        <Input
                          type="text"
                          name="name"
                          value={item.name}
                          onChange={(event) => handleInputChange(event, index)}
                        />
                      </Col>
                      <Col span="4" offset="1">
                        <InputNumber
                          min={1}
                          defaultValue={1}
                          value={item.quantity}
                          name="quantity"
                          onChange={(event) =>
                            handleInputChange(
                              { target: { name: "quantity", value: event } },
                              index
                            )
                          }
                        />
                      </Col>
                      <Col span="4">
                        <InputNumber
                          min={1}
                          defaultValue={1}
                          value={item.rate}
                          name="rate"
                          onChange={(event) =>
                            handleInputChange(
                              { target: { name: "rate", value: event } },
                              index
                            )
                          }
                        />
                      </Col>

                      <Col span="1">
                        <Button
                          onClick={() => deleteLineItem(index)}
                          style={{
                            color: "red",
                          }}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
              </Col>
              <Button onClick={addLineItem}>
                <PlusOutlined className="btn-icon" />
                Add new item
              </Button>
            </Row>
            <div className="footer">
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Next
                </Button>
              </Form.Item>
            </div>
          </Form>
        ) : (
          <ReactToPDF invoiceData={invoice} />
        )}
      </Modal>
    </>
  );
};

export default NewInvoice;
