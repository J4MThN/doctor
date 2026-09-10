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

export interface CycleDto {
  id: number;
  userId: number;
  startDate: string;
  lastDate: string;
  periodLengthDays: number;
  cycleLengthDays: number;
  createDate: string;
}

export interface CreateNoteRequestDto {
  title: string;
  desc: string;
}

export interface AddNoteImageRequestDto {
  imageName: string;
}

export interface NoteImageDto {
  id: number;
  noteId: number;
  imageName: string;
}

export interface NoteDto {
  id: number;
  icon: string;
  title: string;
  desc: string;
  createDate: string;
  images: NoteImageDto[];
}

// //////////////////////

export interface Users {
  key: string;
  name: string;
  mobile: string;
  age: number;
  maritalStatus: string;
  cycleCount: number;
}


export interface Cycle {
  key: string;
  date: string;
  lengh: any;
  cycle: any;
}

export interface DailySymptom {
  key: string;
  cycleId: string;
  date: string;
  symptoms: {
    title: string;
    value: string;
    icon?: any;
  }[];
}

export interface Pregnancy {
  key: string;
  name: string;
  mobile: string;
  age: number;
  maritalStatus: string;
  cycleCount: number;
  pregnancyCount: string;
}

export interface Point {
  key: string;
  icon: any;
  iconName:string,
  title: string;
  desc: string;
  image: number;
}

export interface Article {
  key: string;
  icon: any;
  title: string;
  desc: string;
  subject: any;
}

export interface Comment {
  key: string;
  name: string;
  desc: string;
  status: any;
}


export interface ImageItem {
  id: string;
  src: any;
}
