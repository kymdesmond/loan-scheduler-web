import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShedulerComponent } from './sheduler/sheduler.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'scheduler',
    pathMatch: 'full'
  },
  {
    path: 'scheduler',
    component: ShedulerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
