import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Directive({
  selector: "[patternControl]"
})
export class PatternControlDirective implements OnInit {
  @Input() patternControl: [AbstractControl, string];
  patternError: boolean;
  className: string;
  @Output() showWarning = new EventEmitter();
  constructor(public elementRef: ElementRef) {
  }
  settingHighlight(): void {
    this.patternError = this.patternControl[0].hasError("pattern");
    this.className = this.patternControl[1];
    if (this.patternError) {
      this.elementRef.nativeElement.parentNode.classList.add(this.className);
      return;
    }
    this.elementRef.nativeElement.parentNode.classList.remove(this.className);
  }
  ngOnInit(): void {
    this.settingHighlight();
    this.showWarning.emit(this.patternError);
  }
  @HostListener("input") inputNewText(): void {
    this.settingHighlight();
    this.showWarning.emit(this.patternError);
  }
}
