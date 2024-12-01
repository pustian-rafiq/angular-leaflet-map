import { Routes } from '@angular/router';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';

export const mapRoutes: Routes = [
  {
    path: '',
    component: LeafletMapComponent,
  },
];
