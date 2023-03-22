import React, { FunctionComponent, useEffect, useState } from "react";
import {
  ICountries,
  ICountriesComponent,
} from "../../utils/Interfaces/interfaces";
import Filters from "../Filters";
import MobileFilters from "../MobileFilters";
import Pagination from "../Pagination";
import "./CountriesList.scss";

const CountriesList: FunctionComponent<ICountriesComponent> = ({
  countriesInfo,
}) => {
  const [list, setList] = useState<ICountries[] | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [sortValue, setSortValue] = useState<number>(1);
  const [areaSizeFilterValue, setAreaSizeFilterValue] = useState<string>("");
  const [regionFilterValue, setRegionFilterValue] = useState<string>("");
  const [filtersApplied, setFiltersApplied] = useState<string[]>([]);
  const [noOfPages, setNoOfPages] = useState<number>(0);
  const [isMobileFiterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const noOfItemsToShow = 10;

  useEffect(() => {
    handleListFiltering();
    console.log(list);
  }, [
    countriesInfo,
    searchValue,
    currentPage,
    sortValue,
    regionFilterValue,
    areaSizeFilterValue,
  ]);

  const handleListFiltering = () => {
    const sliceFrom = (currentPage - 1) * noOfItemsToShow;
    const sliceTo = currentPage * noOfItemsToShow;
    let areaSizeOfCountry = countriesInfo?.find(
      ({ name }) => name === areaSizeFilterValue
    )?.area;

    // handle filtering, sorting, pagination handling
    let newList: ICountries[] | undefined = countriesInfo
      ?.filter(({ name }) =>
        name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .filter((item) =>
        regionFilterValue === "" ? item : item.region === regionFilterValue
      ) // do not filter if value is empty string
      .filter((item) =>
        areaSizeOfCountry ? areaSizeOfCountry > item.area : item
      ) // do not filter if areaSizeOfCountry is undefined
      .sort(() => (sortValue === 1 ? 1 : -1));

    setList(newList?.slice(sliceFrom, sliceTo));

    // update no of pages
    newList && setNoOfPages(Math.ceil(newList.length / noOfItemsToShow));
  };

  const updateSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const updateSortValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(parseInt(e.target.value));
  };

  const updateAreaSizeValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAreaSizeFilterValue(e.target.value);

    if (e.target.value === "") {
      setFiltersApplied([
        ...filtersApplied.filter((filter) => filter !== "area size"),
      ]);
      return;
    }
    if (filtersApplied.includes("area size")) return;

    setFiltersApplied([...filtersApplied, "area size"]);
  };

  const updateRegionValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionFilterValue(e.target.value);

    if (e.target.value === "") {
      setFiltersApplied([
        ...filtersApplied.filter((filter) => filter !== "region"),
      ]);
      return;
    }
    if (filtersApplied.includes("region")) return;

    setFiltersApplied([...filtersApplied, "region"]);
  };

  const updateCurrentPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(parseInt(e.target.value));
  };

  const handlePageNoChange = (direction: string) => {
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
    }

    if (direction === "prev") {
      setCurrentPage(currentPage - 1);
    }
  };

  const clearFilter = (keyword: string) => {
    if (keyword === "region") {
      setRegionFilterValue("");
    } else {
      setAreaSizeFilterValue("");
    }

    setFiltersApplied([
      ...filtersApplied.filter((filter) => filter !== keyword),
    ]);
  };

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFiterOpen);
  };

  return (
    <div className="CountriesList">
      {/* header  */}
      <div className="CountriesList-Header">
        <div className="CountriesList-Headings">
          <h2>Countries Information</h2>
          <p>All Countries</p>
        </div>

        {/* filters  */}
        <Filters
          updateSearchValue={updateSearchValue}
          updateSortValue={updateSortValue}
          updateAreaSizeValue={updateAreaSizeValue}
          updateRegionValue={updateRegionValue}
          countriesInfo={countriesInfo}
          searchValue={searchValue}
          sortValue={sortValue}
          areaSizeValue={areaSizeFilterValue}
          regionValue={regionFilterValue}
          toggleMobileFilter={toggleMobileFilter}
        />
      </div>

      {filtersApplied[0] && (
        <div className="CountriesList-FiltersApplied">
          {filtersApplied.map((filter) => (
            <div key={filter}>
              <button onClick={() => clearFilter(filter)}>x</button>
              <p>Filter by {filter}</p>
            </div>
          ))}
        </div>
      )}

      {/* list  */}
      <div>
        <div className="CountriesList-DataTitles">
          <p>Country Name</p>
          <p>Region</p>
          <p>Area Size</p>
        </div>
        {list?.map(({ name, region, area }) => (
          <div key={name} className="CountriesList-Item">
            <p className="CountriesList-ItemName">{name}</p>
            <p className="CountriesList-ItemRegion">{region}</p>
            <p className="CountriesList-ItemArea">
              {area?.toLocaleString() || "---"}
            </p>
          </div>
        ))}
        {list && !list[0] && <p className="NoResultsText">No results</p>}
      </div>

      {/* pagination  */}
      <Pagination
        pageNo={currentPage}
        noOfPages={noOfPages}
        updateCurrentPage={updateCurrentPage}
        handlePageNoChange={handlePageNoChange}
      />

      {/* mobile filters  */}
      {isMobileFiterOpen && (
        <MobileFilters
          updateSearchValue={updateSearchValue}
          updateSortValue={updateSortValue}
          updateAreaSizeValue={updateAreaSizeValue}
          updateRegionValue={updateRegionValue}
          countriesInfo={countriesInfo}
          searchValue={searchValue}
          sortValue={sortValue}
          areaSizeValue={areaSizeFilterValue}
          regionValue={regionFilterValue}
          toggleMobileFilter={toggleMobileFilter}
        />
      )}
    </div>
  );
};

export default CountriesList;
