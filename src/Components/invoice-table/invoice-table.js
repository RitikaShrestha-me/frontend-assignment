import { useState } from "react";
import { Table, Tag, Modal } from "antd";
import ReactToPDF from "../react-to-pdf/react-to-pdf";

const columns = [
  {
    title: "Invoice Name",
    dataIndex: "invoiceName",
  },
  {
    title: "Issue Date",
    dataIndex: "issueDate",
    key: "date",
    sorter: {
      compare: (a, b) => +new Date(a.issueDate) - +new Date(b.issueDate),
      multiple: 3,
    },
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => {
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
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    sorter: {
      compare: (a, b) => a.amount - b.amount,
      multiple: 1,
    },
  },
];

const showStatus = (status) => {
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
};

const InvoiceTable = ({ tableData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [invoice, setinvoice] = useState({});
  const dummy = (event) => {
    setinvoice(event);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ defaultPageSize: 5 }}
        onRow={(record) => {
          return {
            onClick: () => dummy(record), // click row
          };
        }}
      />
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

export default InvoiceTable;
