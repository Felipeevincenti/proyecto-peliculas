import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Felipe Vincenti';

  estiloHamburguesa = false;

  menuHamburguesa() {
    this.estiloHamburguesa = !this.estiloHamburguesa
  }
}

