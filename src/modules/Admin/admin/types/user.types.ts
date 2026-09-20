export interface UserProfileDto {
  id: number;
  mobile: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  maritalStatus: string;
  role: string;
  createDate: string;
  cycleCount: number;
}

export interface UpdateUserProfileDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  maritalStatus: string;
  newPassword: string;
}
