import { User } from '../../users/models/user.model';
import { FriendshipAction } from './friendship-action.model';
import { FriendshipStatus } from './friend-status.model';

export interface Friendship {
  id: number;
  friend: User;
  lastActionUser: User;
  actionType: FriendshipAction;
  friendshipStatus: FriendshipStatus;
}
