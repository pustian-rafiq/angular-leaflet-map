import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private tabType: string = 'tabType';
  constructor() {}
  setTabItem(tabType: string) {
    localStorage.setItem(this.tabType, JSON.stringify(tabType));
  }
  getTabItem() {
    const data: any = localStorage.getItem(this.tabType);
    return JSON.parse(data) || '';
  }
  removeTabItem() {
    localStorage.removeItem(this.tabType);
  }
}
