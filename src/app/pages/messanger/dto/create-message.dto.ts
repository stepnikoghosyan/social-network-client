export class CreateMessageDto {
  roomId: number;
  message: string;

  constructor(data: { roomId: number, message: string }) {
    this.roomId = data.roomId;
    this.message = data.message;
  }
}
