import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ClientResponse } from 'src/app/Model/ClientResponse';
import { Company } from 'src/app/Model/Company';
import { User } from 'src/app/Model/User';
import { CompanyService } from 'src/app/Services/Company/company.service';

@Component({
  selector: 'app-listcompanies',
  templateUrl: './listcompanies.component.html',
  styleUrls: ['./listcompanies.component.css'],
  providers: [MessageService]

})
export class ListcompaniesComponent {
  companies: Company[] = [];
  consultants: User[] = [];
  responsesByForm: { [formTitle: string]: ClientResponse[] } = {};
  expandedForms: { [formTitle: string]: boolean } = {};
  cols: any[] = [];
  rowsPerPageOptions = [10, 20, 30];
  sidebarWidth: number;
  selectedCompanyId!: string;
  selectedConsultantId!: string;
  displayAssignConsultantModal = false;
  displayResponsesModal = false;

  constructor(private companyService: CompanyService, private messageService: MessageService) {
    this.sidebarWidth = 250;
  }

  ngOnInit(): void {
    this.loadCompanies();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'customerUsername', header: 'Customer Username' },
      { field: 'consultantUsernames', header: 'Consultants' },
      { field: 'actions', header: 'Actions' }
    ];
  }

  loadCompanies(): void {
    this.companyService.getCompanies().subscribe(
      (data: Company[]) => {
        this.companies = data;
      },
      (error) => {
        console.log('Error retrieving companies:', error);
      }
    );
  }

  openAssignConsultantModal(companyId: string): void {
    this.selectedCompanyId = companyId;
    this.companyService.getConsultants().subscribe(
      (data: User[]) => {
        this.consultants = data;
        this.displayAssignConsultantModal = true;
      },
      (error) => {
        console.log('Error retrieving consultants:', error);
      }
    );
  }

  assignConsultant(): void {
    if (this.selectedConsultantId && this.selectedCompanyId) {
      const model = {
        companyId: this.selectedCompanyId,
        consultantId: this.selectedConsultantId
      };
      this.companyService.assignConsultant(model).subscribe(
        () => {
          this.displayAssignConsultantModal = false;
          this.loadCompanies();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Consultant assigned successfully.' });
        },
        (error) => {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Consultant is already assigned to this company.' });
        }
      );
    }
  }

  openResponsesModal(companyId: string): void {
    this.selectedCompanyId = companyId;
    this.companyService.getResponsesByCompanyGroupedByForm(companyId).subscribe(
      (data: { [formTitle: string]: ClientResponse[] }) => {
        this.responsesByForm = data;
        this.expandedForms = {};
        this.displayResponsesModal = true;
      },
      (error) => {
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'this company dont have any answers' });
      }
    );
  }

  toggleForm(formTitle: string): void {
    this.expandedForms[formTitle] = !this.expandedForms[formTitle];
  }

  downloadFile(fileId: string): void {
    this.companyService.downloadFile(fileId).subscribe(
      (data: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(data);
        a.href = objectUrl;
        a.download = 'file';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (error) => {
        console.log('Error downloading file:', error);
      }
    );
  }

  exportResponsesByFormToPdf(): void {
    this.companyService.exportResponsesByFormToPdf(this.selectedCompanyId).subscribe(
      (data: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(data);
        a.href = objectUrl;
        a.download = 'ResponsesByForm.zip';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (error) => {
        console.log('Error exporting responses by form to PDF:', error);
      }
    );
  }

}