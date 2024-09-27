import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {
  title: string = "";
  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex:number = 0;
  questionMaxIndex:number = 0;
  questionOptions:any;

  results:any;

  finalAnswer:string = '';

  finished:boolean = false;

  ngOnInit(): void {
    if(quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;

      this.results = quizz_questions.results;

      console.log(this.questionIndex);
      console.log(this.questionMaxIndex);
    }
  }

  usuarioResponde(value:string) {
    this.answers.push(value);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex += 1;
    if(this.questionIndex < this.questionMaxIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      this.determinaRespostaVencedora();
    }
  }

  determinaRespostaVencedora() {
    let respostasA:number = 0;
    let respostasB:number = 0;

    for(let resposta of this.answers) {
      if(resposta == "A")
        respostasA+=1;
      else if(resposta == "B")
        respostasB+=1;
    }

    respostasA > respostasB
      ? this.answerSelected = 'A'
      : this.answerSelected = 'B'

    this.finalAnswer = this.results[this.answerSelected];
  }


}
