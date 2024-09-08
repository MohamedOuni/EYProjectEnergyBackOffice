import { Component } from '@angular/core';
import { User } from 'src/app/Model/User';
import { CookiesService } from 'src/app/Services/Cookies/cookies.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User | undefined;
  sidebarWidth: number;

  constructor(private userService: UserService, private cookiesService:CookiesService) {
    this.sidebarWidth = 250;
  }

  ngOnInit(): void {
    this.userService.getMyProfile().subscribe(
      (user: User) => {
        this.user = user;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  updatePhoneNumber(): void {
    this.userService.updateProfile(this.user?.phone || '').subscribe(
      () => {
        console.log('Phone number updated successfully.');
      },
      (error) => {
        console.error('Error updating phone number:', error);
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
  
}