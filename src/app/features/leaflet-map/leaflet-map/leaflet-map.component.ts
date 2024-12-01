import { ChangeDetectorRef, Component } from '@angular/core';
import {
  DistrictListView,
  DivisionListView,
} from '../../../core/models/division.models';
import { HelperService } from '../../../core/services/helper.service';
import { MapService } from '../../../core/services/map.service';
import { MapComponent } from '../map/map.component';
import { SearchFormComponent } from '../search-form/search-form.component';
import { ShowResultsComponent } from '../show-results/show-results.component';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [MapComponent, SearchFormComponent, ShowResultsComponent],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css',
})
export class LeafletMapComponent {
  public isOpenSearchForm: boolean = false;
  public isShowDivisionDetails: boolean = false;
  public divisionsList: any[] = [];
  public storeDivisionsList: any[] = [];
  public districtDataList: DistrictListView[] = [];
  public divisionName: string = '';
  // public brandsList: BrandListView[] = [];
  // public marketSharesList: DivisionListView[] = [];
  constructor(
    private mapService: MapService,
    private cdr: ChangeDetectorRef,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    // remove tabType from local storage
    this.helperService.removeTabItem();
  }
  openModal() {
    this.isOpenSearchForm = true;
  }
  closeModal() {
    this.isOpenSearchForm = false;
  }
  searchHandler(searchData: any) {
    console.log('searchData', searchData);
    this.mapService.search(searchData).subscribe({
      next: (response) => {
        console.log('response', response);
        this.storeDivisionsList = response;
        this.divisionsList = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  public getDivisionWiseData() {
    this.mapService.getDivisionWiseData().subscribe({
      next: (response) => {
        // save the division data for later use
        this.storeDivisionsList = response;
        this.divisionsList = response;
        console.log('res', response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  public getDictrictDataByDivId(division: DivisionListView) {
    this.mapService.getDistrictDataByDivId().subscribe({
      next: (response) => {
        console.log('res', response);
        if (response) {
          this.isShowDivisionDetails = true;
          this.districtDataList = response.filter(
            (district) => district.division_id === division.id
          );
          this.divisionsList = this.districtDataList;
          this.divisionName = division.name;
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  showPreviousData(data: string) {
    if (data === 'back') {
      this.helperService.setTabItem('demographic');
      this.divisionsList = this.storeDivisionsList;
      this.isShowDivisionDetails = false;
      this.divisionName = '';
    }
  }
  getTabWiseData(tabType: string) {
    if (tabType === 'brands') {
      this.getBrandsData();
    } else if (tabType === 'demographic') {
      this.getDivisionWiseData();
    } else {
      this.getMarketShareData();
    }
  }
  getBrandsData() {
    this.mapService.getBrandsData().subscribe({
      next: (response) => {
        console.log('res', response);
        this.divisionsList = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  getMarketShareData() {
    this.mapService.getMarketShareData().subscribe({
      next: (response) => {
        console.log('res', response);
        this.divisionsList = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
