import "./card-status.css";
import done from "../../Assets/peace-in.png";

const CardStatus = ({ data }) => {
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
              <div>
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
    </div>
  );
};

export default CardStatus;
