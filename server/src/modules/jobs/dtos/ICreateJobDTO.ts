interface ICreateJobDTO {
  title: string;
  description: string;
  technologies: string[];
  level: string;
  location?: string;
  home_office: boolean;
}

export { ICreateJobDTO };