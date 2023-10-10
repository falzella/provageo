import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { TextfieldComponent } from "../app/textfield/textfield.component";

import { ToastrService } from "ngx-toastr";
import { CustomToastrService } from "custom-toastr.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'find the distance';
  @ViewChild("l1", { static: false })
  textL1!: TextfieldComponent;
  @ViewChild("lo1", { static: false })
  textLo1!: TextfieldComponent;
  @ViewChild("l2", { static: false })
  textL2!: TextfieldComponent;
  @ViewChild("lo2", { static: false })
  textLo2!: TextfieldComponent;
  responseText: string | null = null; // Property to store the response body
  responseNumber: number = 0;
  mapVisible = false;
  


  constructor(    private http: HttpClient,
    
    private toastr: ToastrService,
    private customToastrService: CustomToastrService
    ){}

  getValue(val: string) {
    return val;
  }


  getValueN(val: string): number {
    // Use a regular expression to match and extract numeric characters
    const numericValue = parseFloat(val.replace(/[^0-9.-]/g, ''));
    return isNaN(numericValue) ? 0 : numericValue; // Handle cases where the result is not a valid number
  }
  

  // onTextFieldKeyPress(event: KeyboardEvent, l1: any, lo1: any, l2: any, lo2: any) {
  //   if (event.key === 'Enter' && this.textLo2.inputValue!="") { // Verifica se il tasto premuto è "Invio"
  //     event.preventDefault();

  //     this.mostraDistanza(l1, lo1, l2, lo2);
  //   }else{
  //     //checkEmpty();
  //   }
  // }

  public mostraDistanza(l1: string, lo1:string, l2:string, lo2:string){
    console.log(l1 + " " + lo1 + " " + l2 + " " + lo2 + " ");

    if(l1==="" || lo1==="" || l2==="" || lo2===""){
      if (l1 === "") {
        this.textL1.cambia(true);
  
        setTimeout(() => {
          this.textL1.cambia(false);
        }, 400);
      }
  
      if (lo1 === "") {
        this.textLo1.cambia(true);
  
        setTimeout(() => {
          this.textLo1.cambia(false);
        }, 400);
      }
  
      if (l2 === "") {
       this.textL2.cambia(true);
  
        setTimeout(() => {
          this.textL2.cambia(false);
        }, 400);
      }
  
      if (lo2 === "") {
       this.textLo2.cambia(true);
  
        setTimeout(() => {
          this.textLo2.cambia(false);
        }, 400);
      }

      this.toastr.error("Compila tutti i campi","", {
        positionClass: "toast-bottom-right",
      });
      
      return;
    }

    if (!this.isValidNumber(l1) || !this.isValidNumber(lo1) || !this.isValidNumber(l2) || !this.isValidNumber(lo2)) {
      
      if(!this.isValidNumber(l1)){
        this.textL1.cambia(true);
  
        setTimeout(() => {
          this.textL1.cambia(false);
        }, 400);
      }

      if(!this.isValidNumber(lo1)){
        this.textLo1.cambia(true);
  
        setTimeout(() => {
          this.textLo1.cambia(false);
        }, 400);
      }

            if(!this.isValidNumber(l2)){
        this.textL2.cambia(true);
  
        setTimeout(() => {
          this.textL2.cambia(false);
        }, 400);
      }

      if(!this.isValidNumber(lo2)){
        this.textLo2.cambia(true);
  
        setTimeout(() => {
          this.textLo2.cambia(false);
        }, 400);
      }

                  
      this.toastr.error("Inserisci numeri validi.","", {
        positionClass: "toast-bottom-right",
      });

      console.log("Invalid input. Please enter valid numbers.");
      return;
    }

    this.updateMap();

    
    // Create an HttpHeaders object with the "Access-Control-Allow-Origin" and "Content-Type" headers
    const headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json", // Set the content type to JSON
    });

    // Define the data to be sent in the request body
    const requestBody = {
      lat1: l1, 
      lon1: lo1,
      lat2: l2,
      lon2: lo2,
    };

    // Convert the requestBody object to a JSON string
    const requestBodyJSON = JSON.stringify(requestBody);

    // Define the options for the HTTP POST request, including the headers and the body
    const httpOptions = {
      headers: headers,
      body: requestBodyJSON, // Include the JSON request body here
    };

    this.http
      .post("http://localhost:3000/calcolo", requestBodyJSON, {
        ...httpOptions,
        observe: "response",
      })
      .subscribe({
        next: (response) => {
          console.log(response);

          if (response.status === 200) {
            this.responseNumber = response.body as number;
            const km = this.responseNumber/1000;
            const kmMiles = km * 0.62137273664981;
            this.responseText = `<b>${km.toFixed(3)}</b> KM or <br><b>${(kmMiles.toFixed(3))}</b> Miles or <br><b>${this.responseNumber.toFixed(3)}</b> meters`;
            this.mapVisible = true;
            console.log("Ok - calcolo effettuato");
            // this.textL1.resetValue();
            // this.textLo1.resetValue();
            // this.textL2.resetValue();
            // this.textLo2.resetValue();

          }
        },
        error: (error) => {
          console.log(error.status);
          console.error("Errore durante la richiesta:", error);
          // Puoi gestire gli errori di rete o altri errori qui
        },
      });
  }


  private isValidNumber(value: string): boolean {
    // Use JavaScript's isNaN function to check if the value is a valid number
    return !isNaN(parseFloat(value));
  }


    // Function to update the map with new coordinates
  private updateMap() {
      this.mapVisible = false; // Hide the map
      setTimeout(() => {
        this.mapVisible = true; // Show the map again
      });
    }

  }
