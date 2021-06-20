import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/home/home";
import { useState } from "react";

const initData = [
  {
    key: "INV-1624135952406",
    invoiceId: "INV-1624135952406",
    invoiceName: "Invoice 1",
    customerName: "Test 1",
    customerEmail: "test1@gmail.com",
    address: "No Address",
    dueDate: "2021-06-19T20:39:06.082Z",
    issueDate: "2021-06-19T20:39:03.248Z",
    lineItems: [{ key: 0, name: "item1", quantity: 1, rate: 1, total: 1 }],
    phone: "91888888888",
    status: "draft",
    amount: 3000,
  },
  {
    key: "INV-1624135652406",
    invoiceId: "INV-1624135652406",
    invoiceName: "Invoice 2",
    customerName: "Test 2",
    customerEmail: "test2@gmail.com",
    address: "No Address",
    dueDate: "2021-06-19T20:39:06.082Z",
    issueDate: "2021-06-19T20:39:03.248Z",
    lineItems: [{ key: 1, name: "item1", quantity: 1, rate: 1, total: 1 }],
    phone: "91888888888",
    status: "draft",
    amount: 3000,
  },
  {
    key: "INV-1624134152406",
    invoiceId: "INV-1624134152406",
    invoiceName: "Invoice 3",
    customerName: "Test 1",
    customerEmail: "test1@gmail.com",
    address: "No Address",
    dueDate: "2021-06-19T20:39:06.082Z",
    issueDate: "2021-06-19T20:39:03.248Z",
    lineItems: [{ key: 2, name: "item1", quantity: 1, rate: 1, total: 1 }],
    phone: "91888888888",
    status: "paid",
    amount: 5000,
  },
  {
    key: "INV-1623135152406",
    invoiceId: "INV-1623135152406",
    invoiceName: "Invoice 4",
    customerName: "Test 1",
    customerEmail: "test1@gmail.com",
    address: "No Address",
    dueDate: "2021-06-19T20:39:06.082Z",
    issueDate: "2021-06-19T20:39:03.248Z",
    lineItems: [{ key: 3, name: "item1", quantity: 1, rate: 1, total: 1 }],
    phone: "91888888888",
    status: "overdue",
    amount: 8000,
  },
];

function App() {
  const [data, setdata] = useState(initData);
  const addGeneratedInvoice = (invoice) => {
    console.log("App:", invoice);
    data.push({ ...invoice, key: invoice.invoiceId });
    setdata([...data]);
    console.log("data:", data);
  };
  return (
    <div className="App">
      <Header fetchedInvoice={addGeneratedInvoice} />
      <Home data={data} />
    </div>
  );
}

export default App;
