export interface Company {
        id: string;
        name: string;
        customerId: string;
        customerUsername?: string; // Ajout de cette propriété
        answerIds?: string[];
        consultantIds?: string[];   

      }