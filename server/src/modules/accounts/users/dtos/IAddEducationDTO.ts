interface IAddEducationDTO {
  school: string;
  degree: string;
  field: string;
  start_month: number;
  start_year: number;
  end_month: number;
  end_year: number;
  grade: string;
  activities?: string;
  description?: string;
}