import { NgModule } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// components
import { RoomsListComponent } from './components/rooms-list/rooms-list.component';
import { SearchComponent } from '@common/components/search-input/search.component';
import { LazyImageComponent } from '@common/components/lazy-image/lazy-image.component';

@NgModule({
  declarations: [
    RoomsListComponent,
  ],
  exports: [
    RoomsListComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    NgIf,
    NgForOf,
    SearchComponent,
    LazyImageComponent,
    NgClass,
  ]
})
export class RoomsModule {
}
