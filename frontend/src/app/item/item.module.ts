import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemSearchComponent } from './components/item-search/item-search.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ItemComponent } from './item.component';
import { ItemRoutingModule } from './item-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [ItemSearchComponent, ItemComponent],
  imports: [
    CommonModule,
    ItemRoutingModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
    MatOptionModule,
    MatSelectModule,
  ],
  exports: [ItemSearchComponent],
})
export class ItemModule {}
