import PropTypes from "prop-types";
import React from "react";

const Card = ({ cardDetail }) => {
  return (
    <div>
      <div>{cardDetail.id}</div>
      <div>{cardDetail.title}</div>
      <div>{cardDetail.date}</div>
    </div>
  );
};

Card.defaultProps = {
  id: 0,
  title: "N/A",
  date: "N/A",
};

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  date: PropTypes.string,
};

export default Card;
