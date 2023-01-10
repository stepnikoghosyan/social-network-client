import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, Subject, takeUntil } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild('input', { static: true }) public inputElement?: ElementRef;

  @Input() public label = 'Search';
  @Input() public value? = '';
  @Input() public autoSubmit = true;
  @Input() public autoSubmitDelayInMilliseconds = 1000;

  @Output() public onSearch = new EventEmitter<string>();

  public readonly enterPressedOrSearchBtnClicked$ = new Subject<string>();
  private isEventEmittedBeforeTimer = false;

  private subscriptions$ = new Subject<void>();

  ngOnInit(): void {
    this.listenForEnterPressOrSearchBtnClick();

    // Emit search event when value changes (after delay)
    if (this.autoSubmit && this.inputElement) {
      fromEvent(this.inputElement.nativeElement, 'input')
        .pipe(
          debounceTime(this.autoSubmitDelayInMilliseconds),
          distinctUntilChanged(),
          takeUntil(this.subscriptions$),
        )
        .subscribe({
          next: () => {
            if (this.isEventEmittedBeforeTimer) {
              this.isEventEmittedBeforeTimer = false;
              return;
            }

            this.emitSearchEvent();
          },
        });
    }
  }

  // Emit search event before delay
  private listenForEnterPressOrSearchBtnClick(): void {
    this.enterPressedOrSearchBtnClicked$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.subscriptions$),
      )
      .subscribe(() => {
        this.isEventEmittedBeforeTimer = true;
        this.emitSearchEvent();
      });
  }

  private emitSearchEvent(): void {
    this.onSearch.emit(this.inputElement?.nativeElement.value || '');
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
