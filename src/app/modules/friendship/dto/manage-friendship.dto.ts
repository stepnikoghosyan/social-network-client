export class ManageFriendshipDto {
  userId: number;

  constructor(data: { userId: number }) {
    this.userId = data.userId;
  }
}
