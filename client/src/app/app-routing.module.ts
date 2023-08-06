import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LogsComponent } from './views/logs/logs.component';
import { CreateComponent } from './views/create/create.component';
import { MissingComponent } from './views/missing/missing.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', },
  { path: 'home', component: HomeComponent, },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
  {
    path: 'logs',
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule)
},
{path: '**',component: MissingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
