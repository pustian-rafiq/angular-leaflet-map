import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClearInputDirective } from '../../../../shared/directive/clear-input.directive';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ClearInputDirective],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent {
  @Input() searchForm!: FormGroup;
  @Output() search = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  ngOnInit() {
    console.log('searchForm', this.searchForm);
  }
  onSearch() {
    this.search.emit();
  }

  onClose() {
    this.close.emit();
  }
}
