import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LogsComponent } from './logs/logs.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from '../auth/login/login.component';
import { LogsRoutingModule } from './logs-routing.module';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    HomeComponent,
    LogsComponent,
    CreateComponent,
    DetailsComponent,
    EditComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LogsRoutingModule
  ]
})
export class ViewsModule { }
