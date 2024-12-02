import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import L from 'leaflet';
import { HelperService } from '../../../../service/helper.service';
import { DivisionListView } from '../../models/division.models';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  @Input() divisionsList: DivisionListView[] = [];
  @Input() isShowDivisionDetails: boolean = false;
  @Output() showDistrictsEvent = new EventEmitter();

  private map: L.Map | undefined;
  private cityMarkers: L.Marker[] = [];
  public tabType: string = '';
  private divisions = [
    { name: 'Dhaka', lat: '23.8103', long: '90.4125' },
    { name: 'Chattogram', lat: '22.3569', long: '91.7832' },
    { name: 'Khulna', lat: '22.8456', long: '89.5403' },
    { name: 'Rajshahi', lat: '24.3636', long: '88.6241' },
    { name: 'Sylhet', lat: '24.9045', long: '91.8611' },
    { name: 'Barishal', lat: '22.701', long: '90.3535' },
    { name: 'Rangpur', lat: '25.7439', long: '89.2752' },
    { name: 'Mymensingh', lat: '24.7471', long: '90.4203' },
  ];

  constructor(private helperService: HelperService) {}

  ngOnInit(): void {
    if (this.divisionsList.length === 0) {
      this.divisionsList = this.divisions;
    }
    this.tabType = this.helperService.getTabItem();
  }
  ngAfterViewInit(): void {
    this.initMap();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['divisionsList'] && !changes['divisionsList'].isFirstChange()) {
      // Get the tab type from local storage
      this.tabType = this.helperService.getTabItem();

      // Reinitialize the map
      if (this.tabType !== 'brands') {
        console.log(
          'if tabType isShowDivisionDetails',
          this.tabType,
          this.isShowDivisionDetails
        );
        this.reinitializeMap();
      }
    }
  }
  private initMap(): void {
    console.log('div', this.divisionsList);
    this.map = L.map('map').setView([23.8103, 90.4125], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);
    if (this.tabType !== 'brands' || !this.isShowDivisionDetails) {
      this.updateMarkers();
    }
  }
  private reinitializeMap(): void {
    if (this.map) {
      this.map.remove();
    }
    this.initMap();
  }
  private updateMarkers(): void {
    if (!this.map) return;

    // Clear existing markers
    this.cityMarkers.forEach((marker) => this.map?.removeLayer(marker));
    this.cityMarkers = [];

    this.divisionsList.forEach((division) => {
      let marker = L.marker([
        Number(division.lat),
        Number(division.long),
      ])?.addTo(this.map as L.Map);

      this.cityMarkers.push(marker);

      marker.on('click', () => {
        this.flyToCity(Number(division.lat), Number(division.long), 10);
      });

      // Create and add custom popup
      this.createCustomPopup(division, marker);
    });
  }
  flyToCity(lat: number, lng: number, zoom: number): void {
    this.map?.flyTo([lat, lng], zoom, {
      duration: 1.5,
    });
  }

  private createCustomPopup(division: any, marker: any): void {
    const popupContent = this.createPopupContent(division);
    const popupDiv = L.DomUtil.create('div', 'custom-popup');
    popupDiv.innerHTML = popupContent;

    const popup = L.popup({
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      className: 'custom-popup',
    })
      .setLatLng([division.lat, division.long])
      .setContent(popupDiv)
      .openOn(this.map as L.Map);

    // Add event listener to the button in the popup
    if (this.tabType === 'demographic') {
      popupDiv.querySelector('div')?.addEventListener('click', () => {
        this.showDistrictsHandler(division);
      });
    }
  }

  private createPopupContent(division: any): string {
    let mergeAmount = '';
    if (this.tabType !== 'market_share') {
      mergeAmount = `৳${division.amount}`;
    } else {
      mergeAmount = `${division.amount}%`;
    }

    return `
      <div class="popover bs-popover-top" style="width: 100px;">
        <div class="popover-body" style="padding: 5px;">
          <p>${division.name}</p>
          <p>${division.amount ? mergeAmount : ''}</p>
        </div>
      </div>
    `;
  }
  showDistrictsHandler(division: DivisionListView) {
    console.log('In popup', division);
    this.showDistrictsEvent.emit(division);
  }
}
