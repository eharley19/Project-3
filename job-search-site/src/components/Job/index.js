import React from "react";
import "./style.css";
import { ListItem } from "../List";

const Job = ({
  title,
  location,
  contract_time,
  description,
  company,
  link,
  Button,
}) => {
  const refinedText = (str) => {
    while (str.indexOf("<") !== -1) {
      str = str.replace("<strong>", "");
      str = str.replace("</strong>", "");
    }
    return str;
  };

  const refinedDescription = refinedText(description);
  const refinedTitle = refinedText(title);
  return (
    <ListItem>
      <div className="media-snippet">
        <article className="media">
          <div className="media-left">
            <h1 className="heading-title">{company}</h1>
          </div>
          <div className="media-content">
            <h3 className="heading-title">{refinedTitle}</h3>
            {location && <h5 className="heading-location">{location}</h5>}
            <h6>{contract_time}</h6>
            <p className="p-article">{refinedDescription}</p>
            <div className="d-flex flex-row bd-highlight mb-3">
              <div className="p-2 bd-highlight">
                <a
                  href={link}
                  className="btn view-button heading-location ml-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MORE DETAILS
                </a>
              </div>
              <div className="p-2 bd-highlight">
                <Button />
              </div>
            </div>
          </div>
        </article>
      </div>
    </ListItem>
  );
};

export default Job;
