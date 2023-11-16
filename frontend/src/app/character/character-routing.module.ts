import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './character.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterInformationComponent } from './components/character-information/character-information.component';

const routes: Routes = [
  {
    path: '',
    component: CharacterComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: CharacterListComponent,
      },
      {
        path: 'info',
        component: CharacterInformationComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharacterRoutingModule {}
