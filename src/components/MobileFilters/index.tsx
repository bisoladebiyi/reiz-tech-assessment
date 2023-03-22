import React, { FunctionComponent } from "react";
import { IFilters } from "../../utils/Interfaces/interfaces";
import Filters from "../Filters";
import "./MobileFilters.scss";

const MobileFilters: FunctionComponent<IFilters> = ({
  updateSearchValue,
  searchValue,
  sortValue,
  areaSizeValue,
  regionValue,
  updateSortValue,
  countriesInfo,
  updateAreaSizeValue,
  updateRegionValue,
  toggleMobileFilter,
}) => {
  return (
    <div className="MobileFilters">
      <button className="CloseBtn" onClick={toggleMobileFilter}>
        x
      </button>
      <Filters
        updateSearchValue={updateSearchValue}
        updateSortValue={updateSortValue}
        updateAreaSizeValue={updateAreaSizeValue}
        updateRegionValue={updateRegionValue}
        countriesInfo={countriesInfo}
        searchValue={searchValue}
        sortValue={sortValue}
        areaSizeValue={areaSizeValue}
        regionValue={regionValue}
      />
    </div>
  );
};

export default MobileFilters;
