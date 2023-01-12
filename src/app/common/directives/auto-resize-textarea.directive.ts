import { AfterViewInit, Directive, DoCheck, ElementRef, Input } from '@angular/core';

@Directive({
  selector: 'textarea[autoResizeTextarea]',
  standalone: true,
})
export class AutoResizeTextareaDirective implements DoCheck, AfterViewInit {
  @Input() public realtime = false;
  @Input() public calculateWidth = false;
  @Input() public maxHeight: number | null = null;

  constructor(
    private readonly elRef: ElementRef<HTMLTextAreaElement>,
  ) {
  }

  ngDoCheck() {
    if (this.realtime) {
      this.updateHeight();
    }
  }

  ngAfterViewInit() {
    this.updateHeight();
  }

  private updateHeight(): void {

    // TODO: improve this calculation, there should be a better way
    if (this.calculateWidth && this.elRef.nativeElement.value) {
      this.elRef.nativeElement.style.width = this.elRef.nativeElement.value.length * 9 + 'px';
    }

    if (this.realtime || !this.elRef.nativeElement.value) {
      this.elRef.nativeElement.style.height = 'auto';

      const calculatedHeight = this.elRef.nativeElement.scrollHeight - 5;
      if (this.maxHeight && this.maxHeight < calculatedHeight) {
        this.elRef.nativeElement.style.height = this.maxHeight + 'px';
      } else {
        this.elRef.nativeElement.style.height = calculatedHeight + 'px';
      }
    }
  }
}
