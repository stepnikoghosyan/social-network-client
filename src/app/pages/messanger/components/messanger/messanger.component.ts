import { ChangeDetectionStrategy, Component } from '@angular/core';

// models
import { Room } from '@common/models/room.model';

@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessangerComponent {
  public selectedRoom?: Room;

  public handleRoomSelect(room: Room): void {
    this.selectedRoom = room;
  }
}
