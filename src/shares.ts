import { AxiosInstance } from 'axios';

export interface ListAvailableSharesParams {
  offset?: Number;
  limit?: Number;
  sort_by?: 'name' | 'size' | 'user' | 'group' | 'mtime' | 'atime' | 'ctime' | 'crtime' | 'posix' | 'type';
  sort_direction?: 'asc' | 'desc';
  onlywritable?: Boolean;
  /** Comma-separated, including real_path / size / owner / time / perm / mount_point_type / type */
  additional: String | undefined;
}

interface ShareOwner {
  user: String;
  group: String;
  uid: Number;
  gid: Number;
}

interface ShareTime {
  atime: Number;
  mtime: Number;
  ctime: Number;
  crtime: Number;
}

interface ShareACL {
  append: Boolean;
  del: Boolean;
  exec: Boolean;
  read: Boolean;
  write: Boolean;
}

interface SharePermAdvRight {
  disable_download: Boolean;
  disable_list: Boolean;
  disabled_modify: Boolean;
}

interface SharePerms {
  share_right: 'RW' | 'RO';
  posix: Number;
  adv_right: SharePermAdvRight;
  acl_enable: Boolean;
  is_acl_mode: Boolean;
  acl: ShareACL;
}

interface ShareVolumeStatus {
  freespace: Number;
  totalspace: Number;
  readonly: Boolean;
}

interface ShareAdditional {
  real_path: String;
  owner: ShareOwner;
  time: ShareTime;
  perm: SharePerms;
  mount_point_type: String;
  volume_status: ShareVolumeStatus;
}

export interface Share {
  path: String;
  name: String;
  additional: ShareAdditional;
}

export interface ListAvailableSharesResponse {
  total: Number;
  offset: Number;
  shares: Share[];
}

const validateAdditional = (additional:String):Boolean => {
  const allowedOpts = [
    'real_path',
    'size',
    'owner',
    'time',
    'perm',
    'mount_point_type',
    'type',
  ];

  const opts = additional.split(',');

  return opts.every((o) => allowedOpts.includes(o));
};

export const listAvailableShares = async (
  api: AxiosInstance,
  params: ListAvailableSharesParams = { additional: undefined },
): Promise<ListAvailableSharesResponse> => {
  if (params.additional && !validateAdditional(params.additional)) {
    throw new Error('The following additional params are allowed: detail/transfers/file/tracker/peer');
  }

  const { data } = await api.get('/FileStation/file_share.cgi', {
    params: {
      ...params,
      api: 'SYNO.FileStation.List',
      version: 1,
      method: 'list_share',
    },
  });

  return data;
};

export interface ListSharesFilesParams {
  folder_path: String;
  offset?: Number;
  limit?: Number;
  sort_by?: 'name' | 'size' | 'user' | 'group' | 'mtime' | 'atime' | 'ctime' | 'crtime' | 'posix' | 'type';
  sort_direction?: 'asc' | 'desc';
  pattern?: String;
  filetype?: 'file' | 'dir' | 'all';
  goto_path?: String;
  /** Comma-separated, inlcuding real_path | size | owner | time | perm | mount_point_type | type */
  additional?: String;
}

interface FileAdditional {
  real_path: String;
  size: Number;
  owner: ShareOwner;
  time: ShareTime;
  perm: SharePerms;
  mount_point_type: String;
  type: String;
}

interface File {
  path: String;
  name: String;
  isdir: Boolean;
  children: File[];
  additional: FileAdditional;
}

export interface ListSharesFilesResponse {
  total: Number;
  offset: Number;
  files: File[];
}

export const listSharesFiles = async (
  api: AxiosInstance,
  params: ListSharesFilesParams = {
    folder_path: '/',
    additional: undefined,
  },
): Promise<ListSharesFilesResponse> => {
  const { data } = await api.get('/FileStation/file_share.cgi', {
    params: {
      ...params,
      api: 'SYNO.FileStation.List',
      version: 1,
      method: 'list',
    },
  });

  return data;
};
