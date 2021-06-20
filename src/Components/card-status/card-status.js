import { useState } from "react";
import { Modal, Tag } from "antd";
import ReactToPDF from "../react-to-pdf/react-to-pdf";

import "./card-status.css";
import done from "../../Assets/peace-in.png";

const showStatus = (status) => {
  if (status) {
    let color = "yellow";
    if (status === "draft") {
      color = "blue";
    } else if (status === "paid") {
      color = "green";
    } else if (status === "overdue") {
      color = "orange";
    }
    return (
      <Tag color={color} key={status}>
        {status.toUpperCase()}
      </Tag>
    );
  }
};

const CardStatus = ({ data }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invoice, setinvoice] = useState({});
  const dummy = (event) => {
    setinvoice(event);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  let overdue = [];
  data.forEach((element) => {
    if (element.status === "overdue") {
      overdue.push(element);
    }
  });
  overdue.sort((a, b) => +new Date(a.dueDate) - +new Date(b.dueDate));
  overdue = overdue.slice(0, 4);
  const noDue = overdue.length ? 0 : 1;
  return (
    <div className="card-status-conatiner">
      <h2>Invoice on Alert</h2>
      {noDue ? (
        <div className="no-issue">
          <img src={done} alt="all done" height="160" />
          <h2 className="no-issue-text">No Overdue Invoice</h2>
        </div>
      ) : (
        <div className="card-stack">
          {overdue.map((item) => {
            return (
              <div onClick={() => dummy(item)}>
                <div className="card">
                  <h3>{item.invoiceName}</h3>
                  <span>
                    {item.customerName}
                    <br />
                    {"Due on: " + new Date(item.dueDate).toLocaleDateString()}
                    <br />
                    <span className="amount">
                      {"Amount: Rs." + item.amount}
                    </span>
                  </span>
                </div>
                <div className="card-status">{item.status.toUpperCase()}</div>
              </div>
            );
          })}
        </div>
      )}
      <Modal
        title={"Preview Invoice - " + invoice.invoiceName}
        visible={isModalVisible}
        onCancel={handleCancel}
        width="800px"
        footer=""
        style={{ top: "15px" }}
      >
        <div style={{ position: "absolute", left: "47.5%" }}>
          {showStatus(invoice.status)}
        </div>
        <ReactToPDF invoiceData={invoice} />
      </Modal>
    </div>
  );
};

export default CardStatus;
