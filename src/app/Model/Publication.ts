export interface Publication {
    id?: string;
    title: string;
    content: string;
    imageIds?: string[];
    videoIds?: string[];
    pdfIds?: string[];
    xlsIds?: string[];
    docIds?: string[];
    reviews?: Review[];
  }
  
  export interface Review {
    id?: string;
    userIds?: string[];
    rating: number;
  }
  