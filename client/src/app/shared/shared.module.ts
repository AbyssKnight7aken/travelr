import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { CardComponent } from './card/card.component';
import { PaginationComponent } from './pagination/pagination.component';



@NgModule({
  declarations: [
    LoaderComponent,
    CardComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    CardComponent,
    PaginationComponent,
  ]
})
export class SharedModule { }
