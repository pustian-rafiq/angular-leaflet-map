import {
  SearchParam,
  SearchParamForDrugReport,
} from '../../workspace/leaflet-map/models/search.models';

export const LEAFLET_MAP_API = {
  getDistrictCoordinates: (divisionId: number) =>
    `division/district-coordinates?divisionId=${divisionId}`,
  getDistrictwiseSearch: (searchParam: SearchParam) =>
    `sales-info/demographic-districts?divId=${searchParam.divId}&genericId=${searchParam.genericId}&vendorId=${searchParam.vendorId}&startDate=${searchParam.startDate}&endDate=${searchParam.endDate}`,

  getTopBrandsSearch: (searchParam: SearchParam) =>
    `sales-info/top-brands?genericId=${searchParam.genericId}&vendorId=${searchParam.vendorId}&startDate=${searchParam.startDate}&endDate=${searchParam.endDate}&divisionId=${searchParam.divId}&limit=${searchParam.limit}`,

  getMarketShareSearch: (searchParam: SearchParam) =>
    `sales-info/district-market-share?genericId=${searchParam.genericId}&vendorId=${searchParam.vendorId}&startDate=${searchParam.startDate}&endDate=${searchParam.endDate}&divisionId=${searchParam.divId}`,

  // Borrower Dashboard Endpoint
  getDrugReport: (drugReportSearchParam: SearchParamForDrugReport) =>
    `sales-info/Drug-report?drugId=${drugReportSearchParam.drugId}&startDate=${drugReportSearchParam.startDate}&endDate=${drugReportSearchParam.endDate}`,
};
