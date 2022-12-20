interface IAddExperienceDTO {
  title: string;
  company: string;
  location: string;
  current: boolean;
  start_month: number;
  start_year: number;
  end_month?: number;
  end_year?: number;
}

export { IAddExperienceDTO };