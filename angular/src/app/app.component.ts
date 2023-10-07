import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'find the distance';

  getValue(val: string) {
    return val;
  }

  public mostraDistanza(l1: string, lo1:string, l2:string, lo2:string){
    console.log(l1 + " " + lo1 + " " + l2 + " " + lo2 + " ");
  }

}
