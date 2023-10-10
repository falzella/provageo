import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CustomToastrService } from 'custom-toastr.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { ButtonComponent } from './button/button.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AppComponent,
    TextfieldComponent,
    ButtonComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Add this line
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule,
  ],
  providers: [CustomToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
