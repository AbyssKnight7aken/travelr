import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';

//import { AuthActivate } from '../../core/guards/auth.acivate';

const routes: Routes = [
    {
        path: '',
        //  pathMatch: 'full',
        component: LogsComponent,      
    },
    {
        path: 'search',
        component: SearchComponent,
    },
    {
        path: 'create',
        component: CreateComponent,
        //canActivate: [AuthGuard],
    },
    {
        path: ':logId',
        component: DetailsComponent,
        //canActivate: [AuthActivate]
    },
    {
      path: ':logId/edit',
      component: EditComponent,
      //canActivate: [AuthActivate]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LogsRoutingModule { }

