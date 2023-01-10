export interface User {
  id: number;
  email: string;
  firstName: string;lastName: string;profilePictureUrl?: string;
  rooms: any[]; // TODO: type (maybe I should remove rooms property in response)

  // FE side only
  fullName: string;
}
