import "./App.css";
import Header from "./Components/Header/Header";
import NewInvoice from "./Components/NewInvioce/NewInvoice";
import { Invoices } from "./Components/Invoices/Invoices";
import { Footer } from "./Components/Footer/Footer";

function App() {
  let invoiceDetails = [
    {
      id: 101,
      title: "Wood",
      date: "Jan 21, 2021",
    },
    {
      id: 102,
      title: "Tiles",
      date: "Jun 21, 2021",
    },
    {
      id: 103,
      title: "Labour",
      date: "Jun 25, 2021",
    },
  ];
  return (
    <div className="App">
      <Header className="Header" />
      <Invoices invoiceDetails={invoiceDetails} />
      <NewInvoice />
      <Footer />
    </div>
  );
}

export default App;
