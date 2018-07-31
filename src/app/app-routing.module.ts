import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GroupsComponent } from './component/groups/groups.component'
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GroupDetailComponent } from './component/group-detail/group-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'groups', component: GroupsComponent},
  { path: 'group-detail/:id', component: GroupDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
