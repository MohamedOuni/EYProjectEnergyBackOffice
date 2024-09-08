import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { PublicationService } from 'src/app/Services/Publication/publication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fileTypeStats: { [key: string]: number } = {};
  publicationReviewStats: { title: string, reviewCount: number }[] = [];
  selectedFileType: string = 'Images';

  fileTypeChartData: any;
  reviewStatsChartData: any;
  barChartOptions: any;

  bestPublications: { [key: string]: { title: string } } = {};
  bestCustomers: { [key: string]: string } = {};

  fileTypeOptions = [
    { label: 'Images', value: 'Images' },
    { label: 'Videos', value: 'Videos' },
    { label: 'PDFs', value: 'PDFs' },
    { label: 'XLS', value: 'XLS' },
    { label: 'Docs', value: 'Docs' }
  ];

  constructor(private statisticsService: PublicationService) { }

  ngOnInit(): void {
    this.getFileTypeStatistics();
    this.getPublicationReviewStatsByFileType(this.selectedFileType);
    this.getBestPublications();
    this.getBestCustomers();

    // Bar chart options
    this.barChartOptions = {
      scales: {
        x: {
          beginAtZero: true
        },
        y: {
          beginAtZero: true
        }
      }
    };
  }

  getFileTypeStatistics(): void {
    this.statisticsService.getFileTypeStatistics().subscribe(
      stats => {
        this.fileTypeStats = stats;
        this.fileTypeChartData = {
          labels: Object.keys(this.fileTypeStats),
          datasets: [{
            label: 'File Types',
            data: Object.values(this.fileTypeStats),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57'],
            borderColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5733', '#33FF57'],
            borderWidth: 1
          }]
        };
      },
      error => {
        console.error('Error retrieving file type statistics:', error);
      }
    );
  }

  getPublicationReviewStatsByFileType(fileType: string): void {
    this.statisticsService.getPublicationReviewStatsByFileType(fileType).subscribe(
      stats => {
        this.publicationReviewStats = stats;
        this.reviewStatsChartData = {
          labels: this.publicationReviewStats.map(p => p.title),
          datasets: [{
            data: this.publicationReviewStats.map(p => p.reviewCount),
            backgroundColor: this.publicationReviewStats.map(() => '#' + Math.floor(Math.random() * 16777215).toString(16))
          }]
        };
      },
      error => {
        console.error(`Error retrieving publication review stats for ${fileType}:`, error);
      }
    );
  }

  getBestPublications(): void {
    this.statisticsService.getBestPublications().subscribe(
      publications => {
        this.bestPublications = publications;
      },
      error => {
        console.error('Error retrieving best publications:', error);
      }
    );
  }

  getBestCustomers(): void {
    this.statisticsService.getBestCustomers().subscribe(
      customers => {
        this.bestCustomers = customers;
      },
      error => {
        console.error('Error retrieving best customers:', error);
      }
    );
  }

  onFileTypeChange(fileType: string): void {
    this.selectedFileType = fileType;
    this.getPublicationReviewStatsByFileType(fileType);
  }
}