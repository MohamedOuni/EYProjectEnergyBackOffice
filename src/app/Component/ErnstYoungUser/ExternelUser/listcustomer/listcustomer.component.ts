import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { User } from 'src/app/Model/User';
import { AdminService } from 'src/app/Services/User/admin.service';

@Component({
  selector: 'app-listcustomer',
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.css'],
  providers: [MessageService]

})
export class ListcustomerComponent {
  sidebarWidth: number;
  users: User[] = [];
  user: any = {};
  selectedUser: User | null = null;
  selectedRole: string | null = null;
  displayRoleDialog: boolean = false;
  SelectedUsers: any[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5,10, 20, 30];

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
  ) {
    this.sidebarWidth = 250;
  }

  ngOnInit(): void {
    if (!this.user.id) {
      this.loadUsers();
    }

    this.cols = [
      { field: 'id', header: 'Identifier' },
      { field: 'title', header: 'Title' },
      { field: 'username', header: 'User Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'actions', header: 'Actions' }
    ];
  }

  loadUsers(): void {
    this.adminService.getAllCostumerCombined().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  validUser(username: string) {
    this.adminService.validUser(username).subscribe(
      response => {
        console.log('User validated successfully:', response);
        this.loadUsers();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Validated', life: 3000 });
      },
      error => {
        console.error('Error validating user:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error validating user', life: 3000 });
      }
    );
  }
}

