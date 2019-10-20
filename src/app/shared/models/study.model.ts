export class Study {
  uid: number;
  level: LevelStudy;
  title: TitleStudy;
  certificate: boolean; // Sera un fichero
  date: string;
  bilingue: boolean;
}

export class CollegeStudy extends Study {
  name: string;
  institution: string;
}

export class VocationalStudy extends Study {
  category: Category;
  grade: Grade;
  dual: boolean;

  institution: Institution;
}

export class Institution {
  uid: number;
  name: string;
}
export class Category {
  uid: number;
  name: string;
}
export class Grade {
  uid: number;
  name: string;
}
export class TitleStudy {
  uid: number;
  name: string;
  uidCategory: number;
  uidGrade: number;
}
export class LevelStudy {
  uid: number;
  name: string;
}
