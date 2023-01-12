import { User } from '../../users/models/user.model';
import { Room } from '@common/models/room.model';

export interface Message {
  id: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  room: Room;
  author: User;
}
