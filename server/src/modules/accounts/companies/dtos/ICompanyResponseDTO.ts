interface ICompanyResponseDTO {
  email: string;
  description: string;
  employees_num: number | null;
  linkedin: string | null;
  logo: string | null;
  name: string;
  web_site: string | null;
  created_at: Date;
}