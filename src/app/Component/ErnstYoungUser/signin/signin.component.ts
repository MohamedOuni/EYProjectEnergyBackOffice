import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/Services/Cookies/cookies.service';
import { AuthenticateService } from 'src/app/Services/User/authenticate.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  form: any = {
    username: null,
    password: null,
    rememberMe: false
  };

  isLoginFailed = false;
  errorMessage = '';
  isLoggedIn = false;

  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private cookiesService:CookiesService,
    public layoutService: LayoutService,
  ) { }

  ngOnInit(): void {
    
  }
  onSubmit(): void {
    const { username, password ,rememberMe} = this.form;
    this.authService.login(username, password,rememberMe)
      .subscribe(response => {
        const userCookie = this.cookiesService.getCookie('UserDataCookie');
        if (userCookie) {
          try {
            const decodedCookie = decodeURIComponent(userCookie);
            const cnxinformation = atob(decodedCookie)  
            const userInfo = JSON.parse(cnxinformation);
            const userRole = userInfo.Role; 
            if (userRole === 'Admin') {
              this.router.navigate(['/dashboard']);
            }
            else if ( userRole === 'Manager'){
              this.router.navigate(['/companies']);
            } 
            else if ( userRole === 'Consultant'){
              this.router.navigate(['/consultCompanies']);
            } 
            else {
              this.router.navigate(['/signin']);
            }
          } catch (error) {
            console.error('Erreur lors du décodage du cookie :', error);
          }
        } else {
          console.error('Cookie non trouvé');
        }
      }, error => {
        this.isLoginFailed = true;
        this.errorMessage = 'Invalid username or password';
        console.error('Erreur lors de la connexion :', error);
   
      });
  }

  updateRemberMe(): void{
    this.form.rememberMe=true;
  }

}
