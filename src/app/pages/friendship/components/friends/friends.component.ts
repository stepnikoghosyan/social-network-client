import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';

// services
import { FriendshipHttpService } from '../../services/friendship-http.service';

// models
import { Friendship } from '../../models/friend.model';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FriendsComponent implements OnInit, OnDestroy {
  @Output() public readonly friendshipSelected = new EventEmitter<Friendship>();

  public friendshipList?: Friendship[];

  public search?: string;

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly friendshipService: FriendshipHttpService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getFriendshipList();
  }

  // TODO: change to endless scroll with pagination
  private getFriendshipList(): void {
    this.friendshipList = undefined;

    this.friendshipService.getFriendsList({ showAll: true, search: this.search })
      .pipe(
        takeUntil(this.subscriptions$),
        finalize(() => {
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (res) => this.friendshipList = res.results,
        error: () => this.friendshipList = [],
      });
  }

  public onFriendshipSelect(friendship: Friendship): void {
    this.friendshipSelected.emit(friendship);
  }

  public onSearch(value?: string): void {
    this.search = value;
    this.getFriendshipList();
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
