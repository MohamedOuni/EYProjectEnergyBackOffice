import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConsultantService } from 'src/app/Services/Consultant/consultant.service';

@Component({
  selector: 'app-consulting-companies',
  templateUrl: './consulting-companies.component.html',
  styleUrls: ['./consulting-companies.component.css'],
  providers: [MessageService]
})

export class ConsultingCompaniesComponent implements OnInit {
  companies: any[] = [];
  selectedCompany: any;
  responses: any[] = [];
  totalResponses: number = 0;
  displayResponsesDialog: boolean = false;
  sidebarWidth = 260;
  selectedCompanyId!: string;

  constructor(private consultantService: ConsultantService, private messageService : MessageService) {}
  
  ngOnInit(): void {
    this.loadAssignedCompanies();
  }

  loadAssignedCompanies() {
    this.consultantService.getAssignedCompanies().subscribe(data => {
      this.companies = data;
      this.calculateTotalResponses();
    });
  }

  calculateTotalResponses() {
    this.totalResponses = 0;
    const responseCounts = this.companies.map(company => 
      this.consultantService.getCompanyResponses(company.id).toPromise()
    );

    Promise.all(responseCounts).then(responsesArray => {
      responsesArray.forEach(responses => {
        this.totalResponses += responses.length;
      });
    });
  }

  viewResponses(company: any) {
    this.selectedCompany = company;
    this.selectedCompanyId = company.id;
    this.consultantService.getCompanyResponses(company.id).subscribe(data => {
      this.responses = data;
      this.displayResponsesDialog = true;
    }
  );
    
  }

  exportToPdf(): void {
    this.consultantService.exportResponsesToPdf(this.selectedCompanyId).subscribe(
      (data: Blob) => {
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(data);
        a.href = objectUrl;
        a.download = 'responses.pdf';
        a.click();
        URL.revokeObjectURL(objectUrl);
      },
      (error) => {
        console.log('Error exporting responses to PDF:', error);
      }
    );
  }
}