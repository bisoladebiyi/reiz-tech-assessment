import React, { FunctionComponent, useEffect, useState } from "react";
import "./Filters.scss";
import search from "../../assets/icons/search.svg";
import { IFilters } from "../../utils/Interfaces/interfaces";

const Filters: FunctionComponent<IFilters> = ({
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
  const [regionList, setRegionList] = useState<string[] | undefined>([]);
  useEffect(() => {
    let regionList: string[] = [];
    countriesInfo?.map(({ region }) => (regionList = [...regionList, region]));
    regionList = [...new Set(regionList)];
    setRegionList(regionList);
  }, []);

  return (
    <div className="Filters">
      {/* search  */}
      <div className="Filters-SearchWrapper">
        <img src={search} />
        <input
          type="text"
          placeholder="Search"
          className="Filters-Search"
          value={searchValue}
          onChange={updateSearchValue}
        />
      </div>

      {/* button to open mobile filters  */}
      <button className="MobileFilterBtn" onClick={toggleMobileFilter}>
        filter
      </button>

      {/* sort dropdown */}
      <div className="Filters-SortAndFilters">
        <label>Sort by:</label>
        <select name="" id="" value={sortValue} onChange={updateSortValue}>
          <option value="1">A-Z</option>
          <option value="2">Z-A</option>
        </select>
      </div>

      {/* filter by area size */}
      <div className="Filters-SortAndFilters">
        <label>Filter by area size less than:</label>
        <select
          name=""
          id=""
          value={areaSizeValue}
          onChange={updateAreaSizeValue}
        >
          <option value={""}>Select country</option>
          {countriesInfo?.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* filter by region */}
      <div className="Filters-SortAndFilters">
        <label>Filter by region:</label>
        <select name="" id="" value={regionValue} onChange={updateRegionValue}>
          <option value={""}>Select region</option>
          {regionList?.map((region, i) => (
            <option key={i} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
