export interface ClientResponse {
    responseId: string;
    formId: string;
    questionId: string;
    optionId?: string; 
    responseText: string;
    fileId: string; 
    oldFileIds: string[];
    customerId: string;
    companyId: string;
    questionText?: string; 

  }