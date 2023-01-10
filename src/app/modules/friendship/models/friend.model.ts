import { User } from '../../../pages/users/models/user.model';
import { FriendshipAction } from './friendship-action.model';
import { FriendshipStatus } from './friend-status.model';

export interface Friend {
  id: number;
  user: User;
  friend: User;
  lastActionUser: User;
  actionType: FriendshipAction;
  friendshipStatus: FriendshipStatus;
}
