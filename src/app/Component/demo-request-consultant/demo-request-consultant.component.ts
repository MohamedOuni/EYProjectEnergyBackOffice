import { Component } from '@angular/core';
import { CookiesService } from 'src/app/Services/Cookies/cookies.service';
import { DemoRequestService } from 'src/app/Services/DemoRequest/demo-request.service';

@Component({
  selector: 'app-demo-request-consultant',
  templateUrl: './demo-request-consultant.component.html',
  styleUrls: ['./demo-request-consultant.component.css']
})
export class DemoRequestConsultantComponent {
  demos: any[] = [];
  consultantId: string | undefined;

  constructor(private demoRequestService: DemoRequestService, private cookiesService: CookiesService) {}

  ngOnInit(): void {
    this.consultantId = this.cookiesService.getUserId();
    if (this.consultantId) {
      this.loadDemos();
    } else {
      console.error('Consultant ID non trouvé dans les cookies');
    }
  }

  loadDemos(): void {
    this.demoRequestService.getDemosByConsultant(this.consultantId!).subscribe(
      (data) => {
        this.demos = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des démos', error);
      }
    );
  }
}