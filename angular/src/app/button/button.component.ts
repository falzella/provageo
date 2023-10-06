import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  
  @Input() azione: string = '';
  @Input() parametri: string = '';

  public eseguiAzione() {
    if(this.azione!='')
    {
      eval(`this.${this.azione}(${this.parametri})`);
    }
      
  }

}
