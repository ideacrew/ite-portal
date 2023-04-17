import { Component } from '@angular/core';

@Component({
  templateUrl: './business-glossary.component.html',
  styleUrls: ['./business-glossary.component.scss'],
})
export class BusinessGlossaryComponent {
  scrollToElement($element: HTMLElement): boolean {
    console.log($element);
    $element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    return false;
  }
}
