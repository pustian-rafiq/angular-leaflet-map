export interface DivisionListView {
  id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
  amount: number;
}

export interface DistrictListView {
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
  amount: number;
}

export interface BrandListView {
  id: string;
  name: string;
  amount: number;
}
