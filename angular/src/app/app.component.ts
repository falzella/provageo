import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { TextfieldComponent } from "../app/textfield/textfield.component";

// import { ToastrService } from "ngx-toastr";
// import { CustomToastrService } from "../custom-toastr.service";

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

  constructor(    private http: HttpClient,
    
    // private toastr: ToastrService,
    // private customToastrService: CustomToastrService
    ){}

  getValue(val: string) {
    return val;
  }

  public mostraDistanza(l1: string, lo1:string, l2:string, lo2:string){
    console.log(l1 + " " + lo1 + " " + l2 + " " + lo2 + " ");


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
            // this.toastr.success("Calolco effettuato", "!", {
            //   positionClass: "toast-bottom-right",
            // });
            console.log("Ok - calcolo effettuato");

          }
        },
        error: (error) => {
          console.log(error.status);
          console.error("Errore durante la richiesta:", error);
          // Puoi gestire gli errori di rete o altri errori qui
        },
      });
  }


  }
