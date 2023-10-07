import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent {

  constructor(private el: ElementRef) {}

  @Input() placeholder: string = '';
  inputValue: string = ''; // Questa variabile conterrà il valore inserito nell'input
  @Input() type: string = 'text'; // Default to 'text'
  @Input() css: string = 'input'; // Default to 'text'
  cambiacss=false;
  @ViewChild('textInput', { static: false }) textInput: ElementRef | undefined;


  addTodo(title:string) {
    console.log(title);
  }

  resetValue(){
    this.inputValue = '';
  }

  cambia(v: boolean){

    this.cambiacss=v;

  }


  focusNextInput() {
    const parent = this.el.nativeElement.parentElement;
    const nextInput = parent.nextElementSibling?.querySelector('app-textfield input');
    if (nextInput) {
      nextInput.focus();
    }
  }

}
