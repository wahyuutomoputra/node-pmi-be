export interface IRole {
  id_role: number;
  name_role: string | null;
  created_on: string;
  created_by: number | null;
}

export interface addRole {
  name_role?: string;
  created_on?: string;
  created_by?: number;
}
