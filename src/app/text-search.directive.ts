import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
} from '@angular/core';

@Directive({
  selector: '[appTextSearch]',
  exportAs: '[aElement]',
})
export class TextSearchDirective implements OnChanges {
  @Input() name: string = '';
  @Input() taskName: string = '';

  searchName: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  setTextColor(text: string) {
    this.elementRef.nativeElement.innerHTML = text;
  }

  ngOnChanges() {
    let result: string = '';

    const index = this.taskName.toLowerCase().indexOf(this.name.toLowerCase());
    
    if (~index) {
    // case sensitive
      let replaceResult: string = '';

      for (let i = 0; i < this.name.length; i++) {
        if (this.name[i] != this.taskName[index + i])
          replaceResult += this.taskName[index + i];
        else replaceResult += this.name[i];
      }
       
      result = this.taskName.replace(
        this.taskName.slice(index, index + this.name.length),
        `<b style="color: red">${replaceResult}</b>`
      );

      this.setTextColor(result);
    }
  }
}
