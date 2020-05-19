import { AxiosInstance } from 'axios';

export interface CreateFolderParams {
  /**
   * Optional:
   * - `true` then no error occurs if a folder exists and make parent folders as needed
   * - `false` then parent folders are not created
   */
  force_parent?: Boolean;
}

export interface CreateFolderResponse {
  isdir: Boolean;
  name: String;
  path: String;
}

// API Error Code
// 1100 - Failed to create a folder. More information in <errors> object.
// 1101 - The number of folders to the parent folder would exceed the system limitation.

export const createFolder = async (
  api: AxiosInstance,
  path: String,
  name: String,
  params: CreateFolderParams = {},
): Promise<CreateFolderResponse> => {
  const { data } = await api.get('/FileStation/file_crtfdr.cgi', {
    params: {
      ...params,
      path,
      folder_name: name,
      api: 'SYNO.FileStation.CreateFolder',
      version: 1,
      method: 'create',
    },
  });

  const { folders } = data;
  const [item] = folders;
  return item;
};


export interface RenameResponse {
  isdir: Boolean;
  name: String;
}

// API Error Code
// 1200 Failed to rename it. More information in <errors> object.

export const rename = async (
  api: AxiosInstance,
  path: String,
  name: String,
): Promise<RenameResponse> => {
  const { data } = await api.get('/FileStation/file_rename.cgi', {
    params: {
      path,
      name,
      api: 'SYNO.FileStation.Rename',
      version: 1,
      method: 'rename',
    },
  });

  const { files } = data;
  const [item] = files;
  return item;
};
