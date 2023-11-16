import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'item',
    pathMatch: 'full',
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item.module').then((m) => m.ItemModule),
  },
  {
    path: 'character',
    loadChildren: () =>
      import('./character/character.module').then((m) => m.CharacterModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
