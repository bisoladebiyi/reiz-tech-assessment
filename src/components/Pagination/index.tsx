import React, { FunctionComponent } from "react";
import { IPagination } from "../../utils/Interfaces/interfaces";
import "./Pagination.scss";

const Pagination: FunctionComponent<IPagination> = ({
  pageNo,
  noOfPages,
  updateCurrentPage,
  handlePageNoChange,
}) => {
  return (
    <div className="Pagination">
      <div />
      <div className="Pagination-Widget">
        <button
          className="Pagination-Buttons"
          disabled={pageNo === 1}
          onClick={() => handlePageNoChange("prev")}
        >
          {"<"}
        </button>
        <p>{pageNo}</p>
        <button
          className="Pagination-Buttons"
          disabled={pageNo === noOfPages}
          onClick={() => handlePageNoChange("next")}
        >
          {">"}
        </button>
      </div>
      <div className="Pagination-Field">
        <input
          type="number"
          min={1}
          max={noOfPages}
          value={pageNo}
          onChange={updateCurrentPage}
        />
        <p>Of {noOfPages}</p>
      </div>
    </div>
  );
};

export default Pagination;
