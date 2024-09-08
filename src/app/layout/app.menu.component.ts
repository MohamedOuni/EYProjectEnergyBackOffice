import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';
const TOKEN_KEY = 'auth-token';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent {

    model: any[] = [];
    constructor(public layoutService: LayoutService, private router: Router) { }
    
    ngOnInit() {
        this.updateMenuItems();
    }

    updateMenuItems() {
        const userRole = this.getRole().Role;
        const isSupervisor = userRole === 'Supervisor';

        this.model = [
            {
                label: 'HOME',
                items: [

                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-id-card',
                        command: () => {
                            if (isSupervisor) {
                                this.router.navigate(['/ey/dashboard']);
                            } else {
                                this.router.navigate(['/auth/access']);
                            }
                        }
                    },
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                  /*   {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    }, */
                    {
                        label: 'Project',
                        icon: 'pi pi-fw pi-briefcase',
                        command: () => {
                            if (isSupervisor) {
                                this.router.navigate(['/ey/pages/crud']);
                            } else {
                                this.router.navigate(['/auth/access']);
                            }
                        }
                    },
                    
                    {
                        label: 'Task',
                        icon: 'pi pi-fw pi-book',
                        items: [
                            {
                                label: 'New Task',
                                icon: 'pi pi-fw pi-plus',
                                routerLink: ['/ey/pages/task']
                            },
                            {
                                label: 'My Task',
                                icon: 'pi pi-fw pi-clone',
                                routerLink: ['/ey/pages/mytask']
                            },
                            {
                                label: 'WeeklyTimesheet',
                                icon: 'pi pi-fw pi-file-export',
                                routerLink: ['/ey/pages/weekly']
                            },
                            {
                                label: 'MonthlyTimesheet',
                                icon: 'pi pi-fw pi-file-excel',
                                command: () => {
                                    if (isSupervisor) {
                                        this.router.navigate(['/ey/pages/monthly']);
                                    } else {
                                        this.router.navigate(['/auth/access']);
                                    }
                                }
                            },
                        ]
                    },
                ]
            },
        ];
    }

    getRole(): any {
        const token = window.sessionStorage.getItem(TOKEN_KEY);

        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));

            return {
                Role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
            };
        }
    }
}
