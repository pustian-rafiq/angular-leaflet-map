import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Add vendor suggestion interface
interface VendorSuggestion {
  id: number;
  vendorName: string;
}

@Injectable({
  providedIn: 'root',
})


export class PostService {
  // Base URLs for API endpoints
  private apiUrl = 'http://192.168.0.172:8083/api/division/boundary?name=';
  private genericUrl = 'http://192.168.0.172:8083/api/generic/search?prefix=';
  private vendorUrl = 'http://192.168.0.172:8083/api/vendor/search?prefix=';
  private demographicUrl = 'http://192.168.0.172:8083/api/sales-info/demographic';

  constructor(private http: HttpClient) {}
  //for boundary region
  getPosts(name: string): Observable<any> {
    const apiUrl = `${this.apiUrl}${name}`;
    return this.http.get(apiUrl);
  }
  // for genericSuggestions
  getGenericSuggestions(query: string): Observable<any> {
    const url = `${this.genericUrl}${query}&limit=10`;
    return this.http.get(url);
  }
  // for vendor suggestions
  getVendorSuggestions(query: string): Observable<VendorSuggestion[]> {
    const url = `${this.vendorUrl}${query}&limit=10`;
    return this.http.get<VendorSuggestion[]>(url);
  }
  // for demographic
  getDemographicData(
    genericId: number,
    vendorId: number,
    startDate: string,
    endDate: string
  ): Observable<any> {
    // Returns an observable of the API response.
    const params = {
      genericId: genericId.toString(),
      vendorId: vendorId.toString(),
      startDate,
      endDate,
    };

    return this.http.get(this.demographicUrl, { params });
    // Makes an HTTP GET request to the demographic API endpoint with query parameters and returns an observable.
  }
}
