export interface IStats {
    countries: number;
    totalArea: number
}

export interface IStatsComponent {
    stats: IStats
}

export interface ICountries {
    name: string;
    region: string;
    area: number;
}

export interface ICountriesComponent {
    countriesInfo: ICountries[] | undefined
}

export interface IFilters {
    updateSearchValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
    updateSortValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    updateRegionValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    updateAreaSizeValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    searchValue: string;
    areaSizeValue: string;
    regionValue: string;
    sortValue: number;
    countriesInfo: ICountries[] | undefined;
    toggleMobileFilter?: () => void;
}

export interface IPagination {
    pageNo: number;
    noOfPages: number;
    updateCurrentPage: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePageNoChange: (direction: string) => void;
}

export interface IError {
    errorMsg: string;
    desc: string;
    link?: string;
}