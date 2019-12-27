import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";

@Directive({
  selector: "[stylesToggle]"
})
export class StylesToggleDirective implements OnInit {
  @Input() stylesToggle: string[];
  @Output() clickedOnSort = new EventEmitter();
  length: number;
  counter: number;
  constructor(public elementRef: ElementRef) {
  }

  @HostListener("click") toggle(): void {
    this.elementRef.nativeElement.classList.remove(this.stylesToggle[this.counter % this.length]);
    this.counter += 1;
    this.elementRef.nativeElement.classList.add(this.stylesToggle[this.counter % this.length]);
    this.clickedOnSort.emit(this.counter);
  }

  ngOnInit(): void {
    this.counter = 0;
    this.length = this.stylesToggle.length;
    this.elementRef.nativeElement.classList.add(this.stylesToggle[this.counter % this.length]);
  }
}
