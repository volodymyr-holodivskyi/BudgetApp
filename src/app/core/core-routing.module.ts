import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'login',loadChildren: ()=>import('../login/login.module').then(m=>m.LoginModule)},
  {path:'main',loadChildren: ()=>import('../main-page/main-page.module').then(m=>m.MainPageModule)},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'**',loadChildren: ()=>import('../not-found/not-found.module').then(m=>m.NotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }