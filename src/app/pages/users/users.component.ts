import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';

// services
import { UsersHttpService } from './services/users.service';
import { FriendshipHttpService } from '../../modules/friendship/services/friendship.service';

// models
import { Friend } from '../../modules/friendship/models/friend.model';
import { User } from './models/user.model';
import { FriendshipStatus } from '../../modules/friendship/models/friend-status.model';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit, OnDestroy {
  public usersList: User[] = [];
  public friendsList?: Friend[];

  public isLoadingUsers = true;

  public search?: string;

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly usersService: UsersHttpService,
    private readonly friendshipService: FriendshipHttpService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getFriendsList();
    this.getUsersList();
  }

  private getFriendsList(): void {
    this.friendshipService.getFriendsList({ showAll: true })
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (res) => {
          this.friendsList = res.results;
          this.cdr.detectChanges();
        },
      });
  }

  private getUsersList(): void {
    this.isLoadingUsers = true;

    this.usersService.getUsersList({ search: this.search })
      .pipe(
        takeUntil(this.subscriptions$),
        finalize(() => {
          this.isLoadingUsers = false;
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (res) => {
          this.usersList = res.results;
        },
      });
  }

  public getFriendshipStats(targetUser: User): FriendshipStatus | null {
    const currentUser = this.usersService.currentUserData!;

    const friendship = this.friendsList!.find((friendship) =>
      (friendship.user.id === currentUser.id && friendship.friend.id === targetUser.id) ||
      (friendship.friend.id === currentUser.id && friendship.user.id === targetUser.id)
    );

    return friendship?.friendshipStatus || null;
  }

  public onSearch(value?: string): void {
    this.search = value;
    this.getUsersList();
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
