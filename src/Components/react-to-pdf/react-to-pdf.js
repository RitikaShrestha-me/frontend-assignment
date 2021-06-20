import React, { useState } from "react";
import Pdf from "react-to-pdf";

import { Row, Col, Table, Button, Modal } from "antd";
import { DownloadOutlined, MailOutlined } from "@ant-design/icons";
import headerImg from "../../Assets/header.png";
import successImg from "../../Assets/sent2.gif";

// import "./styles.css";
const ref = React.createRef();

// Create styles
const styles = {
  page: {
    backgroundColor: "#fff",
    width: "90%",
    padding: 20,
    marginTop: "30px",
    fontWeight: "extralight",
    border: "1px solid #3333",
  },
  head: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    borderBottom: "3px solid #40e0d0",
  },
  title: {
    fontSize: "40px",
    color: "#40e0d0",
  },
  logo: {
    borderRadius: "50%",
    height: "80px",
    width: "80px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    backgroundColor: "orange",
    color: "white",
  },
  companyDetails: {
    width: "50%",
    padding: "20px 2px",
  },
  companyName: {
    fontWeight: "ultrabold",
  },
  customerDetails: {
    width: "50%",
    padding: "20px 2px",
  },
  invoiceDetails: {
    padding: "20px",
    fontSize: "12px",
    margin: "15px",
    width: "100%",
    backgroundColor: "#90909033",
  },
  totalAmount: {
    color: "#40e0d0",
    margin: "20px 0px",
    display: "flex",
    justifyContent: "flex-end",
    fontSize: "18px",
    fontWeight: "600",
  },

  footer: {
    marginTop: "60px",
    paddingBottom: "20px",
    borderBottom: "20px solid #40e0d0",
  },
};

const columns = [
  {
    title: "Description",
    dataIndex: "name",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Rate",
    dataIndex: "rate",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
];

function ReactToPDF({ invoiceData }) {
  const [invoice] = useState(invoiceData);
  const [isModalVisible, setisModalVisible] = useState(false);
  // Create Document Component
  const MyDocument = (invoice) => (
    <div style={styles.page}>
      <div style={styles.head}>
        <img src={headerImg} alt="header" width="100%" />
      </div>
      <Row>
        <Col span="12">
          <div style={styles.companyDetails}>
            <div>
              <h4 style={styles.companyName}>Sharestha Solutions</h4>
            </div>
            <div>
              <h5 style={styles.companyAddress}>
                Marathahalli, Bengaluru - 560067
                <br />
                Phone: +91-9999999999
              </h5>
            </div>
          </div>
          <div style={styles.customerDetails}>
            <div>
              <h3>To</h3>
              <h4 style={styles.companyName}>{invoice.customerName}</h4>
            </div>
            <h5 style={styles.companyAddress}>
              {invoice.customerEmail}
              <br />
              {invoice.address}
              <br />
              Phone: {invoice.phone}
            </h5>
          </div>
        </Col>
        <Col
          span="12"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div style={styles.invoiceDetails}>
            <Row>
              <Col span="12">
                <span>Invoice Date:</span>
              </Col>
              <Col span="12">
                {new Date(invoice.issueDate).toLocaleDateString()}
              </Col>
            </Row>
            <Row>
              <Col span="12">Invoice Number:</Col>
              <Col span="12">{invoice.invoiceId}</Col>
            </Row>
            <Row>
              <Col span="12">Due Date:</Col>
              <Col span="12">
                {new Date(invoice.dueDate).toLocaleDateString()}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>

      <div style={{ padding: "20px 0px", borderBottom: "3px solid #40e0d0" }}>
        <h3>Additional Information</h3>
        <span>
          {invoice.note || "Add any additional instructions or terms here"}
        </span>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={invoice.lineItems}
          pagination={{ position: ["none", "none"] }}
        />
      </div>
      <div style={styles.totalAmount}>
        <span>Total amount due: Rs.{invoice.amount}</span>
      </div>
      <Row style={styles.footer}>
        <Col span="8">
          <b>Registered Address</b>
          <br />
          <span>RT Nagar, Hebbal</span> <br />
          <span>Bangalore, 560067</span>
        </Col>
        <Col span="8">
          <b>Contact Information</b>
          <br />
          <span>FirstName LastName</span> <br />
          <span>email@provider.com</span>
        </Col>
        <Col span="8">
          <b>Payment Details</b>
          <br />
          <span>Bank Name: SBI </span> <br />
          <span>IFSC: 00098751</span> <br />
          <span>Account No: 4567889</span>
        </Col>
      </Row>
    </div>
  );

  const sendEmail = () => {
    setisModalVisible(true);
  };

  const handleCancel = () => {
    setisModalVisible(false);
  };

  return (
    <div className="App">
      <Pdf targetRef={ref} filename={invoice.invoiceId + ".pdf"}>
        {({ toPdf }) => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button onClick={toPdf} type="primary">
              <DownloadOutlined />
              Download Pdf
            </Button>
            <Button onClick={sendEmail} type="primary">
              <MailOutlined />
              Send Email
            </Button>
            <Modal visible={isModalVisible} footer="" onCancel={handleCancel}>
              <img src={successImg} alt="Success" width="100%" />
            </Modal>
          </div>
        )}
      </Pdf>
      <div style={{ marginLeft: "40px", marginRight: "-40px" }}>
        <div ref={ref}>{MyDocument(invoice)}</div>
      </div>
    </div>
  );
}

export default ReactToPDF;
