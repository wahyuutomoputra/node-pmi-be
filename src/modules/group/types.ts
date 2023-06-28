export interface IGroup {
  id_group: number;
  nama_group: string | null;
  is_internal: number | null;
}

export interface addGroup {
  id_group?: number;
  nama_group?: string;
  is_internal?: number;
}
