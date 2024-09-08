import { Question } from "./Question";

export interface Option {
  optionId: string;
  text: string;
  subQuestions?: Question[];  // Ajoutez cette ligne pour inclure la sous-question directement dans le modèle

  }