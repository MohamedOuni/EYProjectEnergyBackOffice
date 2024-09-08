import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Publication } from 'src/app/Model/Publication';
import { PublicationService } from 'src/app/Services/Publication/publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
  providers: [MessageService]
})

export class PublicationComponent implements OnInit {
  publications: Publication[] = [];
  publication: Publication = { title: '', content: '' };
  selectedPublication: Publication | null = null;
  files: File[] = [];
  editFiles: File[] = [];
  createPublicationDialog: boolean = false;
  editPublicationDialog: boolean = false;
  deleteConfirmationDialog: boolean = false;
  publicationToDelete: Publication | null = null;
  fullTextDialog: boolean = false;
  fullTextTitle: string = '';
  fullTextContent: string = '';
  selectedFilesText: string = 'Choose files';

  constructor(
    private publicationService: PublicationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getAllPublications();
  }

  getAllPublications(): void {
    this.publicationService.getAllPublications().subscribe(
      publications => {
        this.publications = publications;
      },
      error => {
        console.error('Error retrieving publications:', error);
      }
    );
  }

  openCreatePublicationDialog(): void {
    this.createPublicationDialog = true;
  }


  onFileChange(event: any) {
    this.files = Array.from(event.target.files)
    if (this.files.length > 0) {
      const fileNames = Array.from(this.files).map((file: any) => file.name).join(', ');
      this.selectedFilesText = fileNames;
      } else {
      this.selectedFilesText = 'Choose files';
      }
    }

  onEditFileChange(event: any): void {
    this.editFiles = Array.from(event.target.files);
   if (this.editFiles.length > 0) {
      const fileNames = Array.from(this.editFiles).map((file: any) => file.name).join(', ');
      this.selectedFilesText = fileNames;
      } else {
      this.selectedFilesText = 'Choose files';
      }
  }

  createPublication(): void {
    this.publicationService.createPublication(this.publication, this.files).subscribe(
      response => {
        this.createPublicationDialog = false;
        this.getAllPublications();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Publication Created', life: 3000 });
      },
      error => {
        console.error('Error creating publication:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error creating publication', life: 3000 });
      }
    );
  }

  openEditPublicationDialog(publication: Publication): void {
    this.selectedPublication = { ...publication };
    this.editPublicationDialog = true;
  }

  updatePublication(): void {
    if (this.selectedPublication) {
      this.publicationService.updatePublication(this.selectedPublication.id!, this.selectedPublication, this.editFiles).subscribe(
        response => {
          this.editPublicationDialog = false;
          this.getAllPublications();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Publication Updated', life: 3000 });
        },
        error => {
          console.error('Error updating publication:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating publication', life: 3000 });
        }
      );
    }
  }

  confirmDeletePublication(publication: Publication): void {
    this.publicationToDelete = publication;
    this.deleteConfirmationDialog = true;
  }

  deletePublication(): void {
    if (this.publicationToDelete) {
      this.publicationService.deletePublication(this.publicationToDelete.id!).subscribe(
        () => {

          this.getAllPublications();
          this.deleteConfirmationDialog = false;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Publication Deleted', life: 3000 });
        },
        error => {
          console.error('Error deleting publication:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting publication', life: 3000 });
        }
      );
    }
  }

  getFileUrl(fileId: string): string {
    return this.publicationService.getFileUrl(fileId);
  }

  showFullText(event: Event, content: string, title: string): void {
    event.preventDefault();
    this.fullTextTitle = title;
    this.fullTextContent = content;
    this.fullTextDialog = true;
  }
}