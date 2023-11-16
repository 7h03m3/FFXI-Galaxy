import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item.component';
import { ItemSearchComponent } from './components/item-search/item-search.component';

const routes: Routes = [
  {
    path: '',
    component: ItemComponent,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: ItemSearchComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemRoutingModule {}
