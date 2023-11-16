import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from '../character/character.component';
import { CharacterRoutingModule } from './character-routing.module';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { CharacterAddDialogComponent } from './components/character-add-dialog/character-add-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteConfirmDialogComponent } from '../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { CharacterInventoryListComponent } from './components/character-inventory-list/character-inventory-list.component';
import { CharacterInformationComponent } from './components/character-information/character-information.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    CharacterComponent,
    CharacterListComponent,
    CharacterAddDialogComponent,
    DeleteConfirmDialogComponent,
    CharacterInventoryListComponent,
    CharacterInformationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CharacterRoutingModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSelectModule,
  ],
})
export class CharacterModule {}
