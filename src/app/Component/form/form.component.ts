import { Component } from '@angular/core';
import { Form } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppForm } from 'src/app/Model/AppForm';
import { Option } from 'src/app/Model/Option';
import { Question } from 'src/app/Model/Question';
import { TypeQuestion } from 'src/app/Model/TypeQuestion';
import { FormsService } from 'src/app/Services/Forms/forms.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [MessageService]

})
export class FormComponent {
  newQuestion: Question = this.initNewQuestion();
  newSubQuestion: Question = this.initNewQuestion();
  newOption: Option = this.initNewOption();
  forms: AppForm[] = [];
  selectedForm: AppForm | null = null;
  selectedQuestion: Question | null = null;
  selectedOption: Option | null = null;
  selectedSubQuestion: Question | null = null;
  selectedSubQuestionOfOption: Question | null = null;
  form: any = {};
  typeQuestion = TypeQuestion;
  sidebarWidth: number;
  createCategoryDialog: boolean = false;
  updateQuestionDialog: boolean = false;
  updateOptionDialog: boolean = false;
  updateQuestionTitle: string = '';
  updateOptionTitle: string = '';
  updateFormTitleText: string = '';
  updateFormTitleDialog: boolean = false;
  
  constructor(private formService: FormsService, private messageService: MessageService) {
    this.sidebarWidth = 250;
  }

  ngOnInit(): void {
    this.loadForms();
  }

  loadForms(): void {
    this.formService.getForms().subscribe(
      (forms) => {
        this.forms = forms;
      },
    );
  }

  selectForm(event: any): void {
    this.selectedForm = event.value;
    this.resetSelections();
  }

  selectQuestion(question: Question): void {
    this.selectedQuestion = question;
    this.selectedOption = null;
    this.selectedSubQuestion = null;
    this.selectedSubQuestionOfOption = null;
  }

  selectOption(event: MouseEvent, option: Option): void {
    event.stopPropagation();
    this.selectedOption = option;
    this.selectedSubQuestion = null;
    this.selectedSubQuestionOfOption = null;

    if (this.selectedForm) {
      this.selectedQuestion = this.selectedForm.questions.find(q => q.options?.includes(option)) || null;
    }
  }

  
  openUpdateFormTitleDialog(form: AppForm): void {
    this.selectedForm = { ...form };
    this.updateFormTitleText = form.title;
    this.updateFormTitleDialog = true;
  }


 

  updateFormTitle(): void {
    if (this.selectedForm) {
      const formId = this.selectedForm.formId;
      this.formService.updateFormTitle(formId, this.updateFormTitleText).subscribe(
        () => {
          const formToUpdate = this.forms.find(f => f.formId === formId);
          if (formToUpdate) {
            formToUpdate.title = this.updateFormTitleText;
          }
          this.updateFormTitleDialog = false;
        }
      );
    }
  }
  

  deleteForm(form: AppForm): void {
    const formId = form.formId;
    this.formService.deleteForm(formId).subscribe(
      () => {
        this.forms = this.forms.filter(f => f.formId !== formId);
        if (this.selectedForm?.formId === formId) {
          this.selectedForm = null;
        }
   } );
  }
  

  selectSubQuestion(event: MouseEvent, subQuestion: Question): void {
    event.stopPropagation();
    this.selectedSubQuestion = subQuestion;
    this.selectedSubQuestionOfOption = null;
  }

  selectSubQuestionOfOption(event: MouseEvent, subQuestion: Question): void {
    event.stopPropagation();
    this.selectedSubQuestionOfOption = subQuestion;
    if (this.selectedForm && this.selectedForm.questions) {
      for (let question of this.selectedForm.questions) {
        if (question.options) {
          for (let option of question.options) {
            if (option.subQuestions && option.subQuestions.some(sq => sq.questionId === subQuestion.questionId)) {
              this.selectedOption = option;
              this.selectedQuestion = question;
              break;
            }
          }
        }
        if (this.selectedOption) {
          break;
        }
      }
    }
  }

  resetSelections(): void {
    this.selectedQuestion = null;
    this.selectedOption = null;
    this.selectedSubQuestion = null;
    this.selectedSubQuestionOfOption = null;
    this.newQuestion = this.initNewQuestion();
    this.newOption = this.initNewOption();
  }

  initNewQuestion(): Question {
    return { questionId: '', text: '', typeQuestion: TypeQuestion.Textual, options: [], subQuestions: [] };
  }

  initNewOption(): Option {
    return { optionId: '', text: '', subQuestions: [] };
  }

  addQuestion(): void {
    if (this.selectedForm) {
      this.newQuestion.questionId = this.generateUniqueId();
      const formId = this.selectedForm.formId;
      this.formService.addQuestion(formId, this.newQuestion).subscribe(
        (savedQuestion) => {
          if (this.selectedForm?.questions) {
            this.selectedForm.questions.push(savedQuestion); // Push the saved question to the form's questions
          } else {
            this.selectedForm!.questions = [savedQuestion]; // Initialize the questions array if it doesn't exist
          }
          this.newQuestion = this.initNewQuestion(); // Reset the new question form
        }
      );
    } 
  }

  generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  addOption(): void {
    if (this.selectedForm && this.selectedQuestion) {
      this.newOption.optionId = this.generateUniqueId();
      const formId = this.selectedForm.formId;
      const questionId = this.selectedQuestion.questionId;
      this.formService.addOption(formId, questionId, this.newOption).subscribe(
        (savedOption) => {
          if (this.selectedQuestion?.options) {
            this.selectedQuestion.options.push(savedOption!); // Ajoutez l'option sauvegardée à la liste des options
          } else {
            this.selectedQuestion!.options = [savedOption!]; // Initialisez le tableau des options si nécessaire
          }
          this.newOption = this.initNewOption(); // Réinitialisez le formulaire d'option
        }
      );
    }
  }

  setSubQuestion(): void {
    if (this.selectedForm && this.selectedOption && this.selectedQuestion) {
      this.newSubQuestion.questionId = this.generateUniqueId();
      const formId = this.selectedForm.formId;
      const questionId = this.selectedQuestion.questionId!;
      const optionId = this.selectedOption.optionId!;
      this.formService.setSubQuestion(formId, questionId, optionId, this.newSubQuestion).subscribe(
        (savedSubquestion) => {
            if (this.selectedOption?.subQuestions) {
              this.selectedOption.subQuestions.push(savedSubquestion!); // Ajoutez l'option sauvegardée à la liste des options
            } else {
              this.selectedOption!.subQuestions = [savedSubquestion!]; // Initialisez le tableau des options si nécessaire
            }
            this.newSubQuestion = this.initNewQuestion(); // Réinitialisez le formulaire d'option
          }
      );
    }
  }

  addOptionToSubQuestionOfOption(): void {
    if (this.selectedForm && this.selectedOption && this.selectedSubQuestionOfOption) {
      const formId = this.selectedForm.formId;
      const questionId = this.selectedQuestion?.questionId!;
      const subQuestionId = this.selectedSubQuestionOfOption.questionId!;
      this.formService.addOptionToSubQuestionOfOption(formId, questionId, subQuestionId, this.newOption).subscribe(
        () => {
          this.selectedSubQuestionOfOption?.options?.push(this.newOption);
          this.newOption = this.initNewOption();
        },
      );
    } 
  }

  autoSetNextQuestions(): void {
    if (this.selectedForm) {
      const formId = this.selectedForm.formId;
      this.formService.autoSetNextQuestions(formId).subscribe(
        () => {
          this.loadForms();
        }
      );
    }
  }

  openCreateUserModal() {
    this.createCategoryDialog = true;
  }

  onSubmit() {
    this.formService.createForm(this.form).subscribe(
      () => {
        this.createCategoryDialog = false;
        this.loadForms();
      },
    );
  }


  // Supprimer une question
  deleteQuestion(question: Question): void {
    const questionId = question.questionId;
    this.formService.deleteQuestion(questionId).subscribe(
      () => {
        this.removeQuestionFromForm(questionId);
      }
    );
  }
  removeQuestionFromForm(questionId: string): void {
    if (this.selectedForm) {
      this.selectedForm.questions = this.selectedForm.questions.filter(q => q.questionId !== questionId);
    }
  }

 
  deleteOption(option: Option): void {
    const optionId = option.optionId;
    this.formService.deleteOption(optionId).subscribe(
      () => {
        this.removeOptionFromForm(optionId);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Option deleted successfully' });
      },
    );
  }
  
  removeOptionFromForm(optionId: string): void {
    if (this.selectedForm && this.selectedForm.questions) {
      for (let question of this.selectedForm.questions) {
        if (question.options) {
          question.options = question.options.filter(o => o.optionId !== optionId);
        }
      }
    }
  }


  openUpdateQuestionDialog(question: Question): void {
    this.selectedQuestion = { ...question };
    this.updateQuestionTitle = question.text;
    this.updateQuestionDialog = true;
  }
  openUpdateOptionDialog(option: Option): void {
    this.selectedOption = { ...option };
    this.updateOptionTitle = option.text;
    this.updateOptionDialog = true;
  }
  updateQuestion() {
    const questionId = this.selectedQuestion?.questionId;
    if (this.selectedQuestion) {
      this.formService.updateQuestion(this.selectedQuestion.questionId, this.updateQuestionTitle)
        .subscribe(
          () => {
            const question = this.selectedForm?.questions?.find(o => o.questionId === questionId );
            if (question){
              question.text = this.updateQuestionTitle;
            }
            this.updateQuestionDialog = false;
          }
        );
    }
  }
  
  updateOption(): void {
    if (this.selectedForm && this.selectedQuestion && this.selectedOption) {
      const formId = this.selectedForm.formId;
      const questionId = this.selectedQuestion.questionId;
      const optionId = this.selectedOption.optionId;
      this.formService.updateOption(formId, questionId, optionId, this.updateOptionTitle).subscribe(
        () => {
          const option = this.selectedQuestion?.options?.find(o => o.optionId === optionId);
          if (option) {
            option.text = this.updateOptionTitle;
          }
          this.updateOptionDialog = false;
        }
      );
    }
}

}