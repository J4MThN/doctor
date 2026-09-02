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
