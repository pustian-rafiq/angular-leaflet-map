import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import districts from '../../shared/utils/bd-districts.json';
import divisions from '../../shared/utils/bd-divisions.json';
import brand from '../../shared/utils/brand.json';
import {
  BrandListView,
  DistrictListView,
  DivisionListView,
} from '../models/division.models';
import { SearchParam } from '../models/search.models';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}
  getDivisionWiseData(): Observable<DivisionListView[] | BrandListView[]> {
    // API call here to get the division wise data
    // this.http.get('/api/division-wise-data');

    return of(divisions.divisions);
  }
  getDistrictDataByDivId(): Observable<DistrictListView[]> {
    // API call here to get the division wise data
    // this.http.get('/api/division-wise-data');

    return of(districts.districts);
  }
  getBrandsData(): Observable<DivisionListView[] | BrandListView[]> {
    // API call here to get the division wise data
    // this.http.get('/api/division-wise-data');

    return of(brand.brands);
  }
  getMarketShareData(): Observable<DivisionListView[] | BrandListView[]> {
    // API call here to get the division wise data
    // this.http.get('/api/division-wise-data');

    return of(brand.market_shares);
  }

  search(
    searchParam: SearchParam
  ): Observable<DivisionListView[] | BrandListView[]> {
    // API call here to get the division wise data
    // this.http.post('/api/division-wise-data', data);

    return of(divisions.divisions);
  }
}
