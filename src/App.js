import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/home/home";
// import NewInvoice from "./Components/NewInvioce/NewInvoice";
// import { Invoices } from "./Components/Invoices/Invoices";
// import { Footer } from "./Components/Footer/Footer";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less';

function App() {
  return (
    <div className="App">
      <Header className="Header" />
      <Home />
    </div>
  );
}

export default App;
