import { NgModule } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// components
import { FriendsComponent } from './components/friends/friends.component';
import { LazyImageComponent } from '@common/components/lazy-image/lazy-image.component';
import { SearchComponent } from '@common/components/search-input/search.component';

@NgModule({
  declarations: [
    FriendsComponent,
  ],
  imports: [
    NgIf,
    LazyImageComponent,
    SearchComponent,
    MatProgressSpinnerModule,
    NgForOf,
  ],
  exports: [
    FriendsComponent,
  ],
})
export class FriendshipModule {
}
