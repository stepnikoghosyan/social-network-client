export class CreateRoomDto {
  name: string;
  isPrivate: boolean;
  users?: number[];

  constructor(data: { name: string, isPrivate: boolean, userIds?: number[] }) {
    this.name = data.name;
    this.isPrivate = data.isPrivate;
    this.users = data.userIds || undefined;
  }
}
