// import { ChangeDetectorRef, Component } from '@angular/core';
// import { HelperService } from '../../../../service/helper.service';
// import { MapService } from '../../../../service/map.service';
// import {
//   DistrictListView,
//   DivisionListView,
// } from '../../models/division.models';
// import { MapComponent } from '../../views/map/map.component';
// import { SearchFormContainerComponent } from '../search-form-container/search-form-container.component';
// import { ShowResultsContainerComponent } from '../show-results-container/show-results-container.component';

// @Component({
//   selector: 'app-leaflet-map-container',
//   standalone: true,
//   imports: [
//     MapComponent,
//     SearchFormContainerComponent,
//     ShowResultsContainerComponent,
//   ],
//   templateUrl: './leaflet-map-container.component.html',
//   styleUrl: './leaflet-map-container.component.css',
// })
// export class LeafletMapComponent {
//   public isOpenSearchForm: boolean = false;
//   public isShowDivisionDetails: boolean = false;
//   public divisionsList: any[] = [];
//   public storeDivisionsList: any[] = [];
//   public districtDataList: DistrictListView[] = [];
//   public divisionName: string = '';
//   // public brandsList: BrandListView[] = [];
//   // public marketSharesList: DivisionListView[] = [];
//   constructor(
//     private mapService: MapService,
//     private cdr: ChangeDetectorRef,
//     private helperService: HelperService
//   ) {}

//   ngOnInit() {
//     // remove tabType from local storage
//     this.helperService.removeTabItem();
//   }
//   openModal() {
//     this.isOpenSearchForm = true;
//   }
//   closeModal() {
//     this.isOpenSearchForm = false;
//   }
//   searchHandler(searchData: any) {
//     console.log('searchData', searchData);
//     this.mapService.search(searchData).subscribe({
//       next: (response) => {
//         console.log('response', response);
//         this.storeDivisionsList = response;
//         this.divisionsList = response;
//       },
//       error: (error) => {
//         console.error(error);
//       },
//     });
//   }
//   public getDivisionWiseData() {
//     this.mapService.getDivisionWiseData().subscribe({
//       next: (response) => {
//         // save the division data for later use
//         this.storeDivisionsList = response;
//         this.divisionsList = response;
//         console.log('res', response);
//       },
//       error: (error) => {
//         console.error(error);
//       },
//     });
//   }
//   public getDictrictDataByDivId(division: DivisionListView) {
//     this.mapService.getDistrictDataByDivId().subscribe({
//       next: (response) => {
//         console.log('res', response);
//         if (response) {
//           this.isShowDivisionDetails = true;
//           this.districtDataList = response.filter(
//             (district) => district.division_id === division.id
//           );
//           this.divisionsList = this.districtDataList;
//           this.divisionName = division.name;
//           this.cdr.detectChanges();
//         }
//       },
//       error: (error) => {
//         console.error(error);
//       },
//     });
//   }
//   showPreviousData(data: any) {
//     if (data === 'back') {
//       this.helperService.setTabItem('demographic');
//       this.divisionsList = this.storeDivisionsList;
//       this.isShowDivisionDetails = false;
//       this.divisionName = '';
//     }
//   }
//   getTabWiseData(tabType: string) {
//     if (tabType === 'brands') {
//       this.getBrandsData();
//     } else if (tabType === 'demographic') {
//       this.getDivisionWiseData();
//     } else {
//       this.getMarketShareData();
//     }
//   }
//   getBrandsData() {
//     this.mapService.getBrandsData().subscribe({
//       next: (response) => {
//         console.log('res', response);
//         this.divisionsList = response;
//       },
//       error: (error) => {
//         console.error(error);
//       },
//     });
//   }
//   getMarketShareData() {
//     this.mapService.getMarketShareData().subscribe({
//       next: (response) => {
//         console.log('res', response);
//         this.divisionsList = response;
//       },
//       error: (error) => {
//         console.error(error);
//       },
//     });
//   }
// }
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HelperService } from '../../../../service/helper.service';
import { MapService } from '../../../../service/map.service';
import {
  DistrictListView,
  DivisionListView,
} from '../../models/division.models';
import { MapComponent } from '../../views/map/map.component';
import { SearchFormContainerComponent } from '../search-form-container/search-form-container.component';
import { ShowResultsContainerComponent } from '../show-results-container/show-results-container.component';

@Component({
  selector: 'app-leaflet-map-container',
  standalone: true,
  imports: [
    MapComponent,
    SearchFormContainerComponent,
    ShowResultsContainerComponent,
  ],
  templateUrl: './leaflet-map-container.component.html',
  styleUrls: ['./leaflet-map-container.component.css'],
})
export class LeafletMapContainerComponent implements OnInit {
  public isOpenSearchForm: boolean = false;
  public isShowDivisionDetails: boolean = false;
  public divisionsList: any[] = [];
  public storeDivisionsList: any[] = [];
  public districtDataList: DistrictListView[] = [];
  public divisionName: string = '';

  constructor(
    private mapService: MapService,
    private cdr: ChangeDetectorRef,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.helperService.removeTabItem();
    // this.getDivisionWiseData();
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

  showPreviousData(data: any) {
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
