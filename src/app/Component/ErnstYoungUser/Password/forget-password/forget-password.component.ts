import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string = '';


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    
  }

  submitForm() {
    this.userService.forgotPassword(this.email).subscribe({
      next: (response: any) => {
        this.router.navigate(['/resetpassword'], { queryParams: { expiration: response.expiration } });
        console.log('Password reset email sent successfully');
      },
      error: error => {
        console.error('Error sending password reset email:', error);
      }
    });
  }

}
