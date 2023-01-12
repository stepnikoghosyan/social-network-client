import { User } from '../../pages/users/models/user.model';
import { Message } from '../../pages/messanger/models/message.model';

export interface Room {
  id: number;
  name: string;
  isPrivate: boolean;
  updatedAt: Date;
  users: User[];
  lastMessage: Message | null;
}
