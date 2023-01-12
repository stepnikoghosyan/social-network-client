import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common';


import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

// modules
import { MessangerRoutingModule } from './messanger-routing.module';
import { RoomsModule } from '../rooms/rooms.module';

// components
import { MessangerComponent } from './components/messanger/messanger.component';
import { MessangesContainerComponent } from './components/messanges-container/messanges-container.component';
import { LazyImageComponent } from '@common/components/lazy-image/lazy-image.component';
import { MessageComponent } from './components/message/message.component';

// directives
import { AutoResizeTextareaDirective } from '@common/directives/auto-resize-textarea.directive';

@NgModule({
  declarations: [
    MessangerComponent,
    MessangesContainerComponent,
    MessageComponent,
  ],
  imports: [
    MessangerRoutingModule,
    LazyImageComponent,
    AsyncPipe,
    NgForOf,
    NgIf,
    NgClass,
    AutoResizeTextareaDirective,
    ReactiveFormsModule,
    RoomsModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    DatePipe,
  ],
})
export class MessangerModule {
}
