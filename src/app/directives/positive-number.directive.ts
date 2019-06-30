/*
 * @Author: Rahul Raj 
 * @Date: 2019-04-12 12:28:48 
 * @Last Modified by: Rahul Raj
 * @Last Modified time: 2019-05-28 15:34:54
 */

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[positiveNumber]'
})
export class PositiveNumberDirective {

  // Allow decimal numbers and negative values
  // private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
  // Allow decimal numbers and positive values with a limited precision of 3
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]{0,3}){0,2}?$/g);

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {
  }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
