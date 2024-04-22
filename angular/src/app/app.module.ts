import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { appRoutingProviders, routing } from './routes/app.routing';

import { HomeComponent } from './components/home/home.component';
import { DetallesComponent } from './components/detalles/detalles.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetallesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

