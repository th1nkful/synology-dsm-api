import { SynologyApi } from './SynologyApi.def';

import { listAvailableShares, listSharesFiles, ListAvailableSharesResponse, ListAvailableSharesParams, ListSharesFilesResponse, ListSharesFilesParams } from './shares';

import { createFolder, rename, CreateFolderParams } from './folders';

export interface FileStation {
  listAvailableShares(params: ListAvailableSharesParams): Promise<ListAvailableSharesResponse>;
  listShare(params: ListSharesFilesParams): Promise<ListSharesFilesResponse>;
  createFolder(path: String, name: String, options: CreateFolderParams): Promise<any>;
  renameFolder(path: String, name: String): Promise<any>;
  renameFile(path: String, name: String): Promise<any>;
}

const FileStation = (
  synoApi: SynologyApi,
):FileStation => ({
  // shares.ts
  listAvailableShares: (
    params: ListAvailableSharesParams,
  ) => listAvailableShares(synoApi.api, params),
  listShare: (params: ListSharesFilesParams) => listSharesFiles(synoApi.api, params),

  // folders.ts
  createFolder: (
    path: String, name: String, options: CreateFolderParams,
  ) => createFolder(
    synoApi.api, path, name, options,
  ),
  renameFolder: (path: String, name: String) => rename(
    synoApi.api, path, name,
  ),
  renameFile: (path: String, name: String) => rename(
    synoApi.api, path, name,
  ),
});

export default FileStation;
