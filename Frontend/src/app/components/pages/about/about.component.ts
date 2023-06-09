import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  constructor() {
    var i = 0;
    var phrases = [
      "Hello",
      "Bonjour",
      "Hola",
      "Ciao",
    ];
    var currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];

    function writeText() {
      if (i < currentPhrase.length) {
        document.getElementById("hello")!.innerHTML += currentPhrase.charAt(i);
        i++;
        setTimeout(writeText, 50);
      } else {
        setTimeout(eraseText, 1000);
      }
    }

    function eraseText() {
      if (i > 0) {
        document.getElementById("hello")!.innerHTML = document.getElementById("hello")!.innerHTML.slice(0, -1);
        i--;
        setTimeout(eraseText, 50);
      } else {
        currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        i = 0;
        setTimeout(writeText, 1000);
      }
    }

    setTimeout(writeText, 1000);

    }


}
