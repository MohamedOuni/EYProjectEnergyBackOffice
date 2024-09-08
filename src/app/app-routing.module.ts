import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './Component/ErnstYoungUser/profile/profile.component';
import { ListuserComponent } from './Component/ErnstYoungUser/listuser/listuser.component';
import { SigninComponent } from './Component/ErnstYoungUser/signin/signin.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { ListcustomerComponent } from './Component/ErnstYoungUser/ExternelUser/listcustomer/listcustomer.component';
import { AccessdeniedComponent } from './Component/accessdenied/accessdenied.component';
import { NotfoundComponent } from './Component/notfound/notfound.component';
import { ListcompaniesComponent } from './Component/ErnstYoungUser/ExternelUser/listcompanies/listcompanies.component';
import { NotAuthenticatedGuard } from './Helper/NotAuthenticatedGuard';
import { AuthGuard } from './Helper/AuthGuard';
import { AccessDeniedAdmin } from './Helper/AccessDeniedAdmin';
import { AccessDenied } from './Helper/AccessDenied';
import { FormComponent } from './Component/form/form.component';
import { ConsultingCompaniesComponent } from './Component/consulting-companies/consulting-companies.component';
import { ClaimsComponent } from './Component/claims/claims.component';
import { PublicationComponent } from './Component/publication/publication.component';
import { ChatComponent } from './Component/ChatHub/chat/chat.component';
import { ForgetPasswordComponent } from './Component/ErnstYoungUser/Password/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Component/ErnstYoungUser/Password/reset-password/reset-password.component';
import { DemoRequestComponent } from './Component/demo-request/demo-request.component';
import { DemoRequestConsultantComponent } from './Component/demo-request-consultant/demo-request-consultant.component';


const routes: Routes = [
  {path:'signin', component:SigninComponent,canActivate: [NotAuthenticatedGuard]},
  {path:'dashboard', component:DashboardComponent,canActivate: [AccessDeniedAdmin]},
  {path:'ListUser', component:ListuserComponent,canActivate: [AccessDeniedAdmin]},
  {path:'ListCostumer', component:ListcustomerComponent,canActivate: [AccessDenied]},
  {path:'profile', component:ProfileComponent,canActivate: [AuthGuard]},  
  {path:'forms',component:FormComponent,canActivate: [AuthGuard]},
  {path:'consultCompanies',component:ConsultingCompaniesComponent,canActivate: [AuthGuard]},
  {path:'accessDenied',component:AccessdeniedComponent,canActivate: [AuthGuard]},
  {path:'notfound',component:NotfoundComponent,canActivate: [AuthGuard]},
  {path:'companies' , component:ListcompaniesComponent,canActivate: [AuthGuard]},
  {path:'claims' , component:ClaimsComponent,canActivate: [AuthGuard]},
  {path:'chat' , component:ChatComponent,canActivate: [AuthGuard]},
  {path:'forgotpassword' , component:ForgetPasswordComponent},
  {path:'resetpassword' , component:ResetPasswordComponent},
  {path:'demonstration' , component:DemoRequestComponent},
  {path:'publication' , component:PublicationComponent,canActivate: [AuthGuard]},
  {path: 'consultant-demos', component: DemoRequestConsultantComponent},
  {path:'**' , pathMatch:'full' , redirectTo : '/notfound'},
 { path: '', redirectTo: 'signin', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
