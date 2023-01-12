import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { MessangerComponent } from './components/messanger/messanger.component';

const routes: Routes = [
  {
    path: '',
    component: MessangerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessangerRoutingModule {
}
