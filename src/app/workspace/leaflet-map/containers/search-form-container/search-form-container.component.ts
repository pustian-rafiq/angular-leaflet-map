import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HelperService } from '../../../../service/helper.service';
import { SearchFormComponent } from '../../views/search-form/search-form.component';

@Component({
  selector: 'app-search-form-container',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SearchFormComponent],
  templateUrl: './search-form-container.component.html',
  styleUrls: ['./search-form-container.component.css'],
})
export class SearchFormContainerComponent implements OnInit {
  @Output() closeModalEmiter = new EventEmitter();
  @Output() searchParamEmiter = new EventEmitter();
  public searchForm!: FormGroup;
  public tabType: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.tabType = this.helperService.getTabItem();
    this.initializeSearchForm();
  }

  initializeSearchForm() {
    this.searchForm = this.formBuilder.group({
      brand_name: [''],
      vendor_name: [''],
      start_date: [''],
      end_date: [''],
    });
  }

  searchHandler() {
    console.log('searchHandler', this.searchForm.value);
    console.log('this.tabType', this.tabType);
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
      this.searchParamEmiter.emit(this.searchForm.value);
      this.helperService.setTabItem(this.tabType || 'demographic');
      // Add your search logic here
    }
  }

  closeModal(): void {
    this.closeModalEmiter.emit();
  }
}
