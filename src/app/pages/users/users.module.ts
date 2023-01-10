import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UserRowComponent } from './components/user-row/user-row.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LazyImageComponent } from '@common/components/lazy-image/lazy-image.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SearchComponent } from '@common/components/search-input/search.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserRowComponent
  ],
  imports: [
    UsersRoutingModule,
    MatGridListModule,
    MatCardModule,
    CommonModule,
    LazyImageComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    MatProgressSpinnerModule,
    SearchComponent,
  ]
})
export class UsersModule {
}
