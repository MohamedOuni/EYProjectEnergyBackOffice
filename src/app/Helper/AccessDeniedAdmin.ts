
import { Injectable } from '@angular/core';
 import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookiesService } from '../Services/Cookies/cookies.service';

@Injectable({ providedIn: 'root' })
export class AccessDeniedAdmin implements CanActivate {
    constructor(private cookiesService: CookiesService, private router: Router) {}

    canActivate(): boolean {
     
     if(this.AdminhasAccessToUsers())
    {
      return true
    } 
      else {
        this.router.navigate(['/accessDenied'])
        return false;
      }
    }

    private AdminhasAccessToUsers(): boolean {
      const userRole = this.cookiesService.getUserRole();
      return userRole == 'Admin' ;
    }
  }
