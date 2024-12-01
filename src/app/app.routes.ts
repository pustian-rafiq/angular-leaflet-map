import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/signin',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/auth.routes').then(
        (routes) => routes.authRoutes
      ),
  },
  {
    path: 'leaflet-map',
    loadChildren: () =>
      import('./features/leaflet-map/map.routes').then(
        (routes) => routes.mapRoutes
      ),
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];
