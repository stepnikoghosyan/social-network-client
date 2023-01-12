export class UpdateMessageDto {
  message: string;

  constructor(data: { message: string }) {
    this.message = data.message;
  }
}
