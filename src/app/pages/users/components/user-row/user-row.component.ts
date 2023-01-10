import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { finalize, Subscription } from 'rxjs';

// services
import { FriendshipHttpService } from '../../../../modules/friendship/services/friendship.service';

// dto
import { ManageFriendshipDto } from '../../../../modules/friendship/dto/manage-friendship.dto';

// models
import { User } from '../../models/user.model';
import { FriendshipStatus } from '../../../../modules/friendship/models/friend-status.model';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRowComponent implements OnDestroy {
  @Input() public set user(value: User) {
    this.userData = value || undefined;
  }

  @Input() public set friendshipStatus(value: FriendshipStatus | null) {
    this.friendshipStatusData = value || undefined;
    this.updateBtnLabel();
  }

  public userData?: User;
  public friendshipStatusData?: FriendshipStatus;

  public isLoading = false;

  public btnLabel = 'Add Friend';
  public isBtnDisabled = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly friendshipService: FriendshipHttpService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  public addFriend(userId: number): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;

    const sub = this.friendshipService.sendFriendRequest(new ManageFriendshipDto({ userId }))
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: () => this.friendshipStatus = FriendshipStatus.PENDING,
      });

    this.subscriptions.add(sub);
  }

  private updateBtnLabel(): void {
    let label: string;

    switch (this.friendshipStatusData) {
      case FriendshipStatus.ACCEPTED:
        this.isBtnDisabled = true;
        label = 'Friends';
        break;
      case FriendshipStatus.REJECTED:
        label = 'Add Friend (Request Rejected)';
        break;
      case FriendshipStatus.PENDING:
        this.isBtnDisabled = true;
        label = 'Waiting for response...';
        break;
      case FriendshipStatus.BLOCKED:
        this.isBtnDisabled = true;
        label = 'You\'re blocked';
        break;
      default:
        label = 'Add Friend';
    }

    this.btnLabel = label;

    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
