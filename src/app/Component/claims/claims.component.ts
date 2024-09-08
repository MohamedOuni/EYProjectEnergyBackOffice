import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ClaimsService } from 'src/app/Services/Claims/claims.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class ClaimsComponent {
  unvalidatedClaims: any[] = [];
  validatedClaims: any[] = [];
  sidebarWidth = 320;
  displayModal = false;
  selectedClaim: any = null;
  validationMessage = '';

  constructor(
    private claimsService: ClaimsService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.fetchClaims();
  }

  fetchClaims() {
    this.claimsService.getAllClaims().subscribe({
      next: (claims) => {
        this.unvalidatedClaims = claims.filter((c: any) => !c.isProcessed);
        this.validatedClaims = claims.filter((c: any) => c.isProcessed);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not fetch claims: ' + error.message
        });
      }
    });
  }

  onValidate(claim: any) {
    this.selectedClaim = claim;
    this.displayModal = true;
  }

  confirmValidation() {
    if (this.validationMessage.trim()) {
      this.claimsService.validateClaim(this.selectedClaim.id, this.validationMessage).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Claim validated successfully'
          });
          this.fetchClaims(); 
          this.closeModal();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Validation failed: ' + error.message
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Validation Message Required',
        detail: 'Please enter a validation message.'
      });
    }
  }

  closeModal() {
    this.displayModal = false;
    this.selectedClaim = null;
    this.validationMessage = '';
  }
}