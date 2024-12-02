// import {
//   Component,
//   EventEmitter,
//   Input,
//   Output,
//   SimpleChanges,
// } from '@angular/core';

// @Component({
//   selector: 'app-show-results',
//   standalone: true,
//   imports: [TableComponent, BrandDetailsComponent],
//   templateUrl: './show-results.component.html',
//   styleUrl: './show-results.component.css',
// })
// export class ShowResultsComponent {
//   @Input() divisionName: string = '';
//   @Input() isShowDivisionDetails: boolean = false;
//   @Input() divisionsDataList: DivisionListView[] = [];
//   @Output() showDistrictsEvent = new EventEmitter();
//   @Output() goBackEvent = new EventEmitter();
//   @Output() tabClickEvent = new EventEmitter();

//   public showBrandDetails: boolean = false;
//   public tableTabType: string = 'demographic';
//   public totalAmount: number = 0;

//   constructor(private helperService: HelperService) {}

//   ngOnInit(): void {
//     console.log('this.divisionsDataList', this.divisionsDataList);
//     this.calculateTotalAmount();
//   }
//   ngOnChanges(changes: SimpleChanges): void {
//     if (
//       changes['divisionsDataList'] &&
//       !changes['divisionsDataList'].isFirstChange()
//     ) {
//       this.calculateTotalAmount();
//     }
//   }
//   calculateTotalAmount() {
//     this.totalAmount = this.divisionsDataList.reduce(
//       (acc, division) => acc + (division?.amount ?? 0),
//       0
//     );
//   }
//   tabHandler(tabType: string) {
//     console.log('tabType', tabType);
//     this.tableTabType = tabType;
//     this.tabClickEvent.emit(tabType);
//     this.helperService.setTabItem(tabType);
//   }
//   showDistrictsHandler(division: DivisionListView) {
//     console.log('showDistrictsHandler', division);
//     this.divisionName = division.name;
//     this.showDistrictsEvent.emit(division);
//   }
//   showBrandDetailsHandler(brandId: number) {
//     console.log('showBrandDetailsHandler', brandId);
//     this.showBrandDetails = true;
//   }
//   goBack() {
//     console.log('goBack');
//     this.showBrandDetails = false;
//     this.goBackEvent.emit('back');
//   }
//   formatNumber(value: number): string {
//     const formatter = new Intl.NumberFormat('en-US', {
//       maximumFractionDigits: 0,
//       minimumFractionDigits: 0,
//     });
//     return formatter.format(value);
//   }
// }
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HelperService } from '../../../../service/helper.service';
import { DivisionListView } from '../../models/division.models';
import { ShowResultsComponent } from '../../views/show-results/show-results.component';

@Component({
  selector: 'app-show-results-container',
  standalone: true,
  imports: [ShowResultsComponent],
  templateUrl: './show-results-container.component.html',
  styleUrls: ['./show-results-container.component.css'],
})
export class ShowResultsContainerComponent implements OnInit, OnChanges {
  @Input() divisionName: string = '';
  @Input() isShowDivisionDetails: boolean = false;
  @Input() divisionsDataList: DivisionListView[] = [];
  @Output() showDistrictsEvent = new EventEmitter();
  @Output() goBackEvent = new EventEmitter();
  @Output() tabClickEvent = new EventEmitter();

  public showBrandDetails: boolean = false;
  public tableTabType: string = 'demographic';
  public totalAmount: number = 0;

  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    console.log('this.divisionsDataList', this.divisionsDataList);
    this.calculateTotalAmount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['divisionsDataList'] &&
      !changes['divisionsDataList'].isFirstChange()
    ) {
      this.calculateTotalAmount();
    }
  }

  calculateTotalAmount() {
    this.totalAmount = this.divisionsDataList.reduce(
      (acc, division) => acc + (division?.amount ?? 0),
      0
    );
  }

  tabHandler(tabType: string) {
    console.log('tabType', tabType);
    this.tableTabType = tabType;
    this.tabClickEvent.emit(tabType);
    this.helperService.setTabItem(tabType);
  }

  showDistrictsHandler(division: DivisionListView) {
    console.log('showDistrictsHandler', division);
    this.divisionName = division.name;
    this.showDistrictsEvent.emit(division);
  }

  showBrandDetailsHandler(brandId: number) {
    console.log('showBrandDetailsHandler', brandId);
    this.showBrandDetails = true;
  }

  goBack() {
    console.log('goBack');
    this.showBrandDetails = false;
    this.goBackEvent.emit('back');
  }

  formatNumber(value: number): string {
    const formatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  }
}
