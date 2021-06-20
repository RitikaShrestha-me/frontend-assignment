import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/home/home";
import CardStatus from "./Components/card-status/card-status";
import { useState } from "react";

const initData = [
  {
    key: "INV-1624135952406",
    invoiceId: "INV-1624135952406",
    invoiceName: "Invoice 1",
    customerName: "Test Customer1",
    customerEmail: "test1@gmail.com",
    address: "test address 1",
    dueDate: new Date("2021-11-19T20:39:06.082Z").toDateString(),
    issueDate: new Date("2021-05-19T20:39:03.248Z").toDateString(),
    lineItems: [{ key: 0, name: "item1", quantity: 1, rate: 1, total: 1 }],
    phone: "91888888888",
    status: "draft",
    amount: 3000,
  },
  {
    key: "INV-1624135652406",
    invoiceId: "INV-1624135652406",
    invoiceName: "Invoice 2",
    customerName: "Test Customer 2",
    customerEmail: "test2@gmail.com",
    address: "Test Address 2",
    dueDate: new Date("2021-12-19T20:39:06.082Z").toDateString(),
    issueDate: new Date("2021-06-19T20:39:03.248Z").toDateString(),
    lineItems: [{ key: 1, name: "item1", quantity: 1, rate: 1, total: 1 }],
    phone: "91888888888",
    status: "draft",
    amount: 3000,
  },
  {
    key: "INV-1624134152406",
    invoiceId: "INV-1624134152406",
    invoiceName: "Invoice 3",
    customerName: "Real Customer",
    customerEmail: "real@gmail.com",
    address: "All Address",
    dueDate: new Date("2021-06-19T20:39:06.082Z").toDateString(),
    issueDate: new Date("2021-05-19T20:39:03.248Z").toDateString(),
    lineItems: [{ key: 2, name: "item1", quantity: 1, rate: 1, total: 1 }],
    phone: "91888888888",
    status: "paid",
    amount: 5000,
  },
  {
    key: "INV-1623135152406",
    invoiceId: "INV-1623135152406",
    invoiceName: "Invoice 4",
    customerName: "Not A Good Customer",
    customerEmail: "bad@gmail.com",
    address: "No Address",
    dueDate: new Date("2021-05-19T20:39:06.082Z").toDateString(),
    issueDate: new Date("2021-04-19T20:39:03.248Z").toDateString(),
    lineItems: [{ key: 3, name: "item1", quantity: 1, rate: 1, total: 1 }],
    phone: "91888888888",
    status: "overdue",
    amount: 8000,
  },
];

function App() {
  const [data, setdata] = useState(initData);
  const addGeneratedInvoice = (invoice) => {
    // console.log("App:", invoice);
    data.push({ ...invoice, key: invoice.invoiceId });
    setdata([...data]);
    // console.log("data:", data);
  };
  return (
    <div className="App">
      <Header fetchedInvoice={addGeneratedInvoice} />
      <CardStatus data={data} />
      <Home data={data} />
    </div>
  );
}

export default App;
