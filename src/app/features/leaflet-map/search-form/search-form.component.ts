import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HelperService } from '../../../core/services/helper.service';
import { ClearInputDirective } from '../../../shared/directive/clear-input.directive';
// import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ClearInputDirective],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent {
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
    if (this.searchForm.valid) {
      console.log(this.searchForm.value);
      this.searchParamEmiter.emit(this.searchForm.value);

      this.helperService.setTabItem(this.tabType || 'demographic');

      // Add your sign-up logic here
    }
  }

  openModal(modalId: string) {
    console.log('object');
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
      // const modal = new bootstrap.Modal(modalElement);
      // modal.show(); // Programmatically show the modal
    }
  }
  closeModal(): void {
    console.log('object');
    this.closeModalEmiter.emit();
  }
}
