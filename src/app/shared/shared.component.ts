import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared',
  template: `
    <p>
      shared works!
    </p>
  `,
  styles: []
})
export class SharedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    function getInputValue(elementID: string): string | undefined {
      console.log('what');
      const inputElement: HTMLInputElement = <HTMLInputElement>document.getElementById(elementID);

      if (inputElement.value === '') {
        return undefined;
      }
      else {
        return inputElement.value;
      }
    }

  }

}
