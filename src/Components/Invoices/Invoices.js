import React from "react";
import Card from "../StatusCard/StatusCard";

export const Invoices = (props) => {
  return (
    <div className="invoice-list">
      {props.invoiceDetails.map((cardDetail) => {
        return <Card cardDetail={cardDetail} />;
      })}
    </div>
  );
};
