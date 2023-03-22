import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { IError } from "../../utils/Interfaces/interfaces";
import "./ErrorPage.scss";

const Error: FunctionComponent<IError> = ({ errorMsg, desc, link }) => {
  return (
    <div className="ErrorPage">
      <div>
        <h2>{errorMsg}</h2>
        <p>{desc}</p>
        {link && <Link to={link}>Back to home?</Link>}
      </div>
    </div>
  );
};

export default Error;
