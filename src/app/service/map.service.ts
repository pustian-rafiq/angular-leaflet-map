import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import divisions from '../shared/utils/bd-divisions.json';
import demoAPI from '../shared/utils/demo-api.json';
import {
  DistrictCoordinateResponse,
  DistrictWiseResponse,
} from '../workspace/leaflet-map/models/demographic.model';
import { DivisionListView } from '../workspace/leaflet-map/models/division.models';
import { MarketShareResponse } from '../workspace/leaflet-map/models/market-share.model';
import {
  SearchFormParam,
  SearchParam,
  SearchParamForDrugReport,
} from '../workspace/leaflet-map/models/search.models';
import {
  DrugReportResponse,
  TopBrandResponse,
} from '../workspace/leaflet-map/models/top-brands.model';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  search(searchParam: SearchFormParam): Observable<DivisionListView[]> {
    // API call here to get the division wise data
    // this.http.post('/api/division-wise-data', data);

    return of(divisions.divisions);
  }
  getDivisionWiseData(searchParam: SearchFormParam): Observable<any> {
    // API call here to get the division wise data
    // this.http.get('/api/division-wise-data');

    return of(demoAPI.division_list);
  }
  getDistrictCoordinates(
    divisionId: number
  ): Observable<DistrictCoordinateResponse[]> {
    // Uncomment this two lines  to make an API call to get data from the API

    // const url = LEAFLET_MAP_API.getDistrictCoordinates(divisionId);
    // return this.http.get<DistrictCoordinateResponse[]>(url);

    // Comment this line to make an API call
    return of(demoAPI.districts_coordinates);
  }
  getDistrictwiseSearch(
    districtWiseSearchParam: SearchParam
  ): Observable<DistrictWiseResponse[]> {
    // Uncomment this two lines  to make an API call to get data from the API

    console.log('districtWiseSearchParam', districtWiseSearchParam);
    // const url = LEAFLET_MAP_API.getDistrictwiseSearch(districtWiseSearchParam);
    // return this.http.get<DistrictWiseResponse[]>(url);

    // Comment this line to make an API call
    return of(demoAPI.districtwise_search);
  }

  getTopBrandsSearch(
    topBrandSearchParam: SearchParam
  ): Observable<TopBrandResponse[]> {
    // Uncomment this two lines  to make an API call to get data from the API
    // const url = LEAFLET_MAP_API.getTopBrandsSearch(topBrandSearchParam);
    // return this.http.get<TopBrandResponse[]>(url);

    // Comment this line to make an API call
    return of(demoAPI.top_brands);
  }

  getMarketShareSearch(
    marketShareSearchParam: SearchParam
  ): Observable<MarketShareResponse[]> {
    // Uncomment this code block to make an API call to get the district coordinates

    // const url = LEAFLET_MAP_API.getMarketShareSearch(marketShareSearchParam);
    // return this.http.get<MarketShareResponse[]>(url);

    // Comment this line to make an API call
    return of(demoAPI.market_share);
  }
  getDrugReport(
    drugReportSearchParam: SearchParamForDrugReport
  ): Observable<DrugReportResponse> {
    // Uncomment this code block to make an API call to get the district coordinates
    console.log('drugReportSearchParam', drugReportSearchParam);
    // const url = LEAFLET_MAP_API.getDrugReport(drugReportSearchParam);
    // return this.http.get<DrugReportResponse>(url);

    // Comment this line to make an API call
    return of(demoAPI.drug_report);
  }
}
