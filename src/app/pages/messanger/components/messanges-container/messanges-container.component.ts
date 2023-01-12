import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of, Subject, takeUntil, tap } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { MessagesHttpService } from '../../services/messages-http.service';
import { UsersHttpService } from '../../../users/services/users.service';

// dto
import { CreateMessageDto } from '../../dto/create-message.dto';

// models
import { Room } from '@common/models/room.model';
import { Message } from '../../models/message.model';

// validators
import { notOnlySpacesValidator } from '@common/validators/not-only-spaces.validator';

@Component({
  selector: 'app-messanges-container',
  templateUrl: './messanges-container.component.html',
  styleUrls: ['./messanges-container.component.scss'],
})
export class MessangesContainerComponent implements OnDestroy {
  @Input()
  public set room(value: Room | undefined) {
    this.selectedRoom = value;
    this.updateMessagesList();
  }

  public selectedRoom?: Room;

  public messagesList$: Observable<Message[]> = of([]);

  public currentUserId = this.usersService.currentUserData?.id;

  public currentUserProfilePicture: string | undefined;

  public ctrl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    notOnlySpacesValidator,
  ]);

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly messagesService: MessagesHttpService,
    private readonly usersService: UsersHttpService,
  ) {
  }

  private updateMessagesList(): void {
    if (!this.selectedRoom) {
      this.messagesList$ = of([]);
      return;
    }

    this.messagesList$ = this.messagesService.getMessagesList(this.selectedRoom.id, { showAll: true })
      .pipe(
        map((res) => {
          return Array(10).fill(res.results).reduce((prev, current) => {
            return [...prev, ...current];
          }, res.results);
        }),
        tap(() => {
          document?.scrollingElement?.scroll(0, 1);
        }),
      );
  }

  public sendMessage(): void {
    this.ctrl.disable();

    this.messagesService.createMessage(new CreateMessageDto({ roomId: this.selectedRoom!.id, message: this.ctrl.getRawValue()! }))
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: () => {
          // TODO: update implementation after adding sockets
          this.ctrl.reset('');
          this.ctrl.enable();
          this.updateMessagesList();
        },
        error: () => {
          this.ctrl.enable();
        },
      });
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
