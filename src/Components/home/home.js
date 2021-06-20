import InvoiceTable from "../invoice-table/invoice-table";
import { useState, useEffect } from "react";
import { Input } from "antd";
import { Select } from "antd";

import "./home.css";

const { Search } = Input;
const { Option } = Select;

const Home = ({ data }) => {
  // console.log("data in home:", data);
  const [currentDataLength, setcurrentDataLength] = useState(data.length);
  // console.log("length:", currentDataLength);
  const [displayData, setdisplayData] = useState([...data]);
  // console.log("display data:", displayData);
  useEffect(() => {
    if (data.length !== currentDataLength) {
      setdisplayData([...data]);
      setcurrentDataLength(data.length);
    }
  }, [data, currentDataLength]);

  const onSearch = (value) => {
    let matchingList = [];
    if (value) {
      data.forEach((element) => {
        // console.log(
          element.invoiceName.toLowerCase().includes(value.toLowerCase())
        );
        if (element.invoiceName.toLowerCase().includes(value.toLowerCase())) {
          matchingList.push(element);
        }
      });
    } else {
      matchingList = data;
    }
    // console.log(matchingList);
    setdisplayData([...matchingList]);
  };

  const handleStatusChange = (value) => {
    let matchingList = [];
    if (value !== "all") {
      data.forEach((element) => {
        if (element.status === value) {
          matchingList.push(element);
        }
      });
    } else {
      matchingList = data;
    }
    // console.log(matchingList);
    setdisplayData([...matchingList]);
  };

  return (
    <div>
      <div className="table-heading">
        <div className="table-heading-title">
          <h2>All Invoice</h2>
        </div>

        <div className="table-heading-filter">
          <span>Filter By Status</span>
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            onChange={handleStatusChange}
          >
            <Option value="all">All</Option>
            <Option value="draft">Draft</Option>
            <Option value="paid">Paid</Option>
            <Option value="overdue">Overdue</Option>
          </Select>
        </div>
        <div className="table-heading-search">
          <Search
            placeholder="Search Invoice ..."
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </div>
      </div>
      <InvoiceTable tableData={displayData} />
    </div>
  );
};

export default Home;
