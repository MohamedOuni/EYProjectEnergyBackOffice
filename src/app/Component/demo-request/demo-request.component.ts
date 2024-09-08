import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DemoRequestService } from 'src/app/Services/DemoRequest/demo-request.service';

@Component({
  selector: 'app-demo-request',
  templateUrl: './demo-request.component.html',
  styleUrls: ['./demo-request.component.css'],
  providers: [MessageService]

})
export class DemoRequestComponent {
  demoRequests: any[] = [];
  consultants: any[] = [];
  displayModal: boolean = false;
  displayDetailsModal: boolean = false;
  selectedConsultantId: string | null = null;
  selectedDemoDate: Date | null = null;
  selectedStartTime: string | null = null;
  selectedEndTime: string | null = null;
  demoTitle: string | null = null;
  selectedDemo: any = {};

  constructor(private demoRequestService: DemoRequestService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.loadDemoRequests();
    this.loadConsultants();
  }

  loadDemoRequests(): void {
    this.demoRequestService.getAllDemoRequests().subscribe(
      (data) => {
        this.demoRequests = data;
        this.demoRequests.forEach(demo => {
          if (demo.consultantId) {
            this.demoRequestService.getConsultantById(demo.consultantId).subscribe(
              (consultant) => {
                demo.consultantName = consultant.username; // Ajoutez le nom du consultant à chaque démo
              },
              (error) => {
                console.error('Erreur lors du chargement du consultant', error);
              }
            );
          } else {
            demo.consultantName = 'Non assigné'; // Assurez-vous d'avoir une valeur par défaut
          }
        });
      },
      (error) => {
        console.error('Erreur lors du chargement des demandes de démo', error);
      }
    );
  }

  loadConsultants(): void {
    this.demoRequestService.getConsultants().subscribe(
      (data) => {
        this.consultants = data.map(consultant => ({
          label: consultant.username,
          value: consultant.id
        }));
      },
      (error) => {
        console.error('Erreur lors du chargement des consultants', error);
      }
    );
  }

  openModal(demo: any) {
    this.selectedDemo = demo || {}; // Ajoutez une valeur par défaut pour éviter les erreurs
    this.selectedConsultantId = demo?.consultantId || null;
    this.selectedDemoDate = demo?.selectedDate ? new Date(demo.selectedDate) : null;
    this.selectedStartTime = demo?.startTime || null;
    this.selectedEndTime = demo?.endTime || null;
    this.demoTitle = demo?.demoTitle || null;
    this.displayModal = true;
  }

  closeModal() {
    this.displayModal = false;
  }

  assignConsultant(): void {
    if (this.selectedConsultantId && this.selectedDemoDate && this.selectedStartTime && this.selectedEndTime && this.demoTitle) {
        // S'assurer que la date n'est pas modifiée par les fuseaux horaires
        const correctedDate = new Date(this.selectedDemoDate.getTime() - this.selectedDemoDate.getTimezoneOffset() * 60000);

        this.demoRequestService.assignConsultant(
            this.selectedDemo.id,
            this.selectedConsultantId,
            correctedDate,
            this.selectedStartTime,
            this.selectedEndTime,
            this.demoTitle
        ).subscribe(
            () => {
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Consultant assigné avec succès' });
                this.loadDemoRequests(); // Recharger les demandes après l'assignation
                this.closeModal();
            },
            (error) => {
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de l\'assignation du consultant' });
                console.error('Erreur lors de l\'assignation du consultant', error);
            }
        );
    } else {
        this.messageService.add({ severity: 'warn', summary: 'Avertissement', detail: 'Veuillez remplir tous les champs avant de soumettre.' });
    }
}

  updateDemoRequest(): void {
    if (this.selectedConsultantId && this.selectedDemoDate && this.selectedStartTime && this.selectedEndTime && this.demoTitle) {
      const correctedDate = new Date(this.selectedDemoDate.getTime() - this.selectedDemoDate.getTimezoneOffset() * 60000);

      this.demoRequestService.updateDemoRequest(
        this.selectedDemo.id,
        this.selectedConsultantId,
        correctedDate,
        this.selectedStartTime,
        this.selectedEndTime,
        this.demoTitle
      ).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Démo mise à jour avec succès' });
          this.loadDemoRequests(); // Recharger les demandes après la mise à jour
          this.closeModal();
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour de la démo' });
          console.error('Erreur lors de la mise à jour de la démo', error);
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Avertissement', detail: 'Veuillez remplir tous les champs avant de soumettre.' });
    }
  }

  openDetailsModal(demo: any) {
    this.selectedDemo = demo || {}; // Ajoutez une valeur par défaut pour éviter les erreurs
    this.displayDetailsModal = true;
  }

  closeDetailsModal() {
    this.displayDetailsModal = false;
  }
}