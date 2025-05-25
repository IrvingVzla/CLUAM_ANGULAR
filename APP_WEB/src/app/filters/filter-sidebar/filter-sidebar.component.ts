// src/app/filters/filter-sidebar/filter-sidebar.component.ts
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: false,
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent implements OnInit {
  filterForm: FormGroup;
  showFilters = false;
  
  // Recibir las categorías desde el componente padre
  @Input() categories: string[] = ['Todos'];
  @Output() filtersChanged = new EventEmitter<FilterOptions>();
  
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      category: ['Todos'],
      minPrice: [0],
      maxPrice: [1000],
      sort: ['default']
    });
  }
  
  ngOnInit(): void {
    // Escuchar cambios en el formulario
    this.filterForm.valueChanges.subscribe(values => {
      this.filtersChanged.emit(values);
    });
  }
  
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  
  applyFilters(): void {
    this.filtersChanged.emit(this.filterForm.value);
  }
  
  resetFilters(): void {
    this.filterForm.reset({
      category: 'Todos',
      minPrice: 0,
      maxPrice: 1000,
      sort: 'default'
    });
    this.filtersChanged.emit(this.filterForm.value);
  }
}