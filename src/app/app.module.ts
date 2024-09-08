import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListcompaniesComponent } from './Component/ErnstYoungUser/ExternelUser/listcompanies/listcompanies.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { ListcustomerComponent } from './Component/ErnstYoungUser/ExternelUser/listcustomer/listcustomer.component';
import { SigninComponent } from './Component/ErnstYoungUser/signin/signin.component';
import { ProfileComponent } from './Component/ErnstYoungUser/profile/profile.component';
import { ListuserComponent } from './Component/ErnstYoungUser/listuser/listuser.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookiesService } from './Services/Cookies/cookies.service';
import { AuthGuard } from './Helper/AuthGuard';
import { NotAuthenticatedGuard } from './Helper/NotAuthenticatedGuard';
import { AccessDeniedAdmin } from './Helper/AccessDeniedAdmin';
import { AccessDenied } from './Helper/AccessDenied';
import { ErrorInterceptor } from './Helper/ErrorInterceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { AccessdeniedComponent } from './Component/accessdenied/accessdenied.component';
import { NotfoundComponent } from './Component/notfound/notfound.component';
import { FormComponent } from './Component/form/form.component';
import { ForgetPasswordComponent } from './Component/ErnstYoungUser/Password/forget-password/forget-password.component';
import { ResetPasswordComponent } from './Component/ErnstYoungUser/Password/reset-password/reset-password.component';
import { ConsultingCompaniesComponent } from './Component/consulting-companies/consulting-companies.component';
import { ClaimsComponent } from './Component/claims/claims.component';
import { PublicationComponent } from './Component/publication/publication.component';
import { ChartModule } from 'primeng/chart';
import { ChatComponent } from './Component/ChatHub/chat/chat.component';
import { DemoRequestComponent } from './Component/demo-request/demo-request.component';
import { DemoRequestConsultantComponent } from './Component/demo-request-consultant/demo-request-consultant.component';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    ListcompaniesComponent,
    SidebarComponent,
    ListcustomerComponent,
    SigninComponent,
    ProfileComponent,
    ListuserComponent,
    DashboardComponent,
    AccessdeniedComponent,
    NotfoundComponent,
    FormComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ConsultingCompaniesComponent,
    ClaimsComponent,
    PublicationComponent,
    ChatComponent,
    DemoRequestComponent,
    DemoRequestConsultantComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    FileUploadModule,
    RippleModule,
    ListboxModule,
    CardModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    PanelMenuModule,
    ConfirmDialogModule,
    DialogModule,
    CalendarModule,
    MenubarModule,
    PanelModule,
    BrowserAnimationsModule,
    FieldsetModule,
    CheckboxModule,
    PasswordModule,
    AccordionModule,
    ChartModule,
    DropdownModule,
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [ MessageService,CookiesService,
    AuthGuard,
    NotAuthenticatedGuard,
    AccessDeniedAdmin,
    AccessDenied,

    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true, }],
  bootstrap: [AppComponent],
})
export class AppModule { }
