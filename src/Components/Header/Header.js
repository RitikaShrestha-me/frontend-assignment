import "./header.css";
import NewInvoice from "../new-invoice/new-invoice";

const Header = ({ fetchedInvoice }) => {
  const getInvoiceData = (value) => {
    console.log("Fetched: ", value);
    fetchedInvoice(value);
  };
  return (
    <div className="Header">
      <h2>Invoice Dashboard</h2>

      <NewInvoice returnInvoice={getInvoiceData} />
    </div>
  );
};

export default Header;
