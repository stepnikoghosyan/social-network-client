import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { finalize, Subject, takeUntil } from 'rxjs';

// services
import { RoomsHttpService } from '../../services/rooms-http.service';

// models
import { Room } from '@common/models/room.model';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
})
export class RoomsListComponent {
  @Output() public readonly roomSelected = new EventEmitter<Room>();

  public roomsList?: Room[];

  public selectedRoom?: Room;

  public search?: string;

  private subscriptions$ = new Subject<void>();

  constructor(
    private readonly roomsService: RoomsHttpService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.getRoomsList();
  }

  // TODO: change to endless scroll with pagination
  private getRoomsList(): void {
    this.roomsList = undefined;

    this.roomsService.getRoomsList({ showAll: true, search: this.search })
      .pipe(
        takeUntil(this.subscriptions$),
        finalize(() => {
          this.cdr.detectChanges();
        }),
      )
      .subscribe({
        next: (res) => {
          this.roomsList = res.results;
          this.onRoomSelect(this.roomsList[0]);
        },
        error: () => this.roomsList = [],
      });
  }

  public onRoomSelect(room: Room): void {
    this.selectedRoom = room;
    this.roomSelected.emit(room);
  }

  public onSearch(value?: string): void {
    this.search = value;
    this.getRoomsList();
  }

  ngOnDestroy() {
    this.subscriptions$.next();
    this.subscriptions$.complete();
  }
}
