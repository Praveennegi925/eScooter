export interface stackLink {
  title: string;
  href: string;
}

export interface Asset {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: string[];
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
}

export interface Metadata {
  uid: string;
}
