import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AssignRole } from 'src/app/Model/AssignRole';
import { Role } from 'src/app/Model/Role';
import { User } from 'src/app/Model/User';
import { AdminService } from 'src/app/Services/User/admin.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css'],
  providers: [MessageService,ConfirmationService]

})
export class ListuserComponent {

  users: User[] = [];
  user: any = {};
  selectedUsers: any[] = [];
  cols: any[] = [];
  rowsPerPageOptions = [5,10, 20, 30];
  createUserDialog: boolean = false;
  BannedUserDialog: boolean = false;
  AllowedUserDialog: boolean = false;
  changeRoleDialog: boolean = false;
  selectedUserForRoleChange: User | null = null;
  newRole: Role | null = null;
  searchQuery: string ='';
  selectedRole: string | null = null;

  roles = [
    { label: 'Manager', value: Role.Manager },
    { label: 'Consultant', value: Role.Consultant }
  ];

  constructor(private adminService: AdminService, private messageService: MessageService) {

    this.getAllUsers();

    this.cols = [
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'username', header: 'User Name' },
      { field: 'email', header: 'Email' },
      { field: 'role', header: 'Role' },
      { field: 'banned', header: 'Banned Status' },
      { field: 'actions', header: 'Actions' }
    ];
  }

  ngOnInit(): void {}

  getAllUsers() {
    this.adminService.getAllUsersCombined().subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.log('Error retrieving users:', error);
      }
    );
  }

  getRoleString(role: number): string {
    switch (role) {
      case Role.Manager:
        return 'Manager';
      case Role.Consultant:
        return 'Consultant';
      default:
        return '';
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  BannedUsers(user: any) {
    this.BannedUserDialog = true;
    this.user = { ...user };
  }

  BannedUser() {
    this.BannedUserDialog = false;
    const username = this.user.username;

    this.adminService.BannedUser(username).subscribe(
      () => {
        this.getAllUsers();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Banned', life: 3000 });
      },
      error => {
        console.error('Error banning user:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error banning user', life: 3000 });
      }
    );
  }

  AllowedUsers(user: any) {
    this.AllowedUserDialog = true;
    this.user = { ...user };
  }

  Allowed() {
    this.AllowedUserDialog = false;
    const username = this.user.username;

    this.adminService.AllowedUser(username).subscribe(
      () => {
        this.getAllUsers();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Allowed', life: 3000 });
      },
      error => {
        console.error('Error banning user:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Allowed user', life: 3000 });
      }
    );
  }

  openCreateUserModal() {
    this.createUserDialog = true;
  }

  onSubmit() {
    this.adminService.createUser(this.user).subscribe(
      response => {
        console.log('User created successfully:', response);
        this.createUserDialog = false; // Close the modal
        this.getAllUsers(); // Refresh the user list
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
      },
      error => {
        console.error('Error creating user:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating user', life: 3000 });
      }
    );
  }

  openChangeRoleDialog(user: User) {
    this.selectedUserForRoleChange = user;
    this.changeRoleDialog = true;
  }

  confirmRoleChange() {
    if (this.selectedUserForRoleChange && this.newRole !== null) {
      const assignRole: AssignRole = {
        username: this.selectedUserForRoleChange.username,
        role: Role[this.newRole].toString().toLowerCase()
      };
      this.adminService.assignRole(assignRole.username, assignRole.role).subscribe(
        (response: any) => {
          console.log(response.message);
          this.getAllUsers();
          this.changeRoleDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Role Assigned', life: 3000 });
        },
        (error) => {
          console.error('Error assigning role:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error assigning role', life: 3000 });
        }
      );
    }
  }

  
  searchUsers() {
    this.adminService.searchUsersByUsername(this.searchQuery).subscribe(
      response => {
        this.users = response;
      },
      error => {
        console.error('Error searching users by username:', error);
      }
    );
  }
  searchUsersByRole() {
    if (this.selectedRole) {
      this.adminService.searchUsersByRole(this.selectedRole).subscribe(
        response => {
          this.users = response;
        },
        error => {
          console.error('Error searching users by role:', error);
        }
      );
    }
  }
}