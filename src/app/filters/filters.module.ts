import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';

@NgModule({
  declarations: [
    FilterSidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    FilterSidebarComponent
  ]
})
export class FiltersModule { }