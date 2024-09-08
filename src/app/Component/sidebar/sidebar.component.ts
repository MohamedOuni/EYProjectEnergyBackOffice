import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/Services/Cookies/cookies.service';
import { AuthenticateService } from 'src/app/Services/User/authenticate.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

 isSidebarClosed = false;

 constructor(private authService: AuthenticateService,private cookiesService:CookiesService ,private router:Router) {
 }

 ngOnInit(): void {  
 }
 toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
 }
 
 logout(): void {
   this.authService.logout().subscribe(
     () => {
       this.router.navigate(['/signin'])
     },
     (error) => {
       console.error('Error when disconnecting:', error);       
     }
   );
 }

 GetUser(): string {
  const userRole = this.cookiesService.getUserRole();
  if (userRole  == 'Consultant')
    {
      return 'Consultant'
    }
   if (userRole =='Manager') {
      return 'Manager'
    }
   if (userRole=='Admin') {
      return 'Admin' 
    }
  return '';
 }

 hasAccessToUsers(): boolean {
   const userRole = this.cookiesService.getUserRole();
   return userRole == 'Consultant' || userRole =='Manager' || userRole=='Admin' ;
 }

 AdminhasAccessToUsers(): boolean {
   const userRole = this.cookiesService.getUserRole();
   return userRole == 'Admin' ;
 }

 ManagerConsultantAccessToUsers(): boolean {
  const userRole = this.cookiesService.getUserRole();
  return userRole == 'Consultant' || userRole =='Manager' ;
}
 ConsultanthasAccessToUsers(): boolean {
  const userRole = this.cookiesService.getUserRole();
  return userRole == 'Consultant' ;
 } 

 ManagerAdminAccessToUsers(): boolean {
   const userRole = this.cookiesService.getUserRole();
   return userRole == 'Admin' || userRole == 'Manager';
 }

 ManagerAccessToUsers(): boolean {
   const userRole = this.cookiesService.getUserRole();
   return userRole == 'Manager';
 }

}