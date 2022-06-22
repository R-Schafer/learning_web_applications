import React from "react";

function Entry(props) {
  return (
    <div className="visited">
      <img className="location-image" alt="" src={props.imageUrl} />
      <div className="country-and-link">
        <span>{props.location}</span>
        <a href={props.website} className="website">
          Website
        </a>
      </div>
      <h1 className="location">{props.title}</h1>
      <span className="date">
        {props.startDate} - {props.endDate}
      </span>
      <p className="about">{props.description}</p>
    </div>
  );
}

export default Entry;
