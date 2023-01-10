import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgClass,
    NgIf,
  ],
})
export class LazyImageComponent {
  @Input()
  public set src(value: string | null | undefined) {
    if (!!value) {
      this.imageSrc = value;
      this.isLoading = true;
      this.cdr.markForCheck();
    } else if (!!this.imageSrc) {
      this.imageSrc = this.defaultImageSrc;
      this.cdr.markForCheck();
    }
  }

  @Input() public containerClass = '';
  @Input() public defaultImageSrc = '/assets/img/no-image.png';
  @Input() public size = 40;

  @Input() set rounded(value: any) {
    this.isRounded = value != null && `${value}` !== 'false';
  }
  get rounded() {
    return this.isRounded;
  }

  public imageSrc?: string;

  public isLoading = true;

  public isRounded = false;


  constructor(
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  public imageLoadingSuccess(): void {
    this.isLoading = false;
  }

  public imageLoadingError(): void {
    this.imageSrc = this.defaultImageSrc;
    this.cdr.markForCheck();
  }
}
