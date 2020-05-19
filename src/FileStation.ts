import { SynologyApi } from './SynologyApi.def';

import { listAvailableShares, listSharesFiles } from './shares';

import { createFolder, rename, CreateFolderParams } from './folders';

export interface FileStation {
  listShares(): Promise<any>;
  listShare(): Promise<any>;
  createFolder(path: String, name: String, options: CreateFolderParams): Promise<any>;
  renameFolder(path: String, name: String): Promise<any>;
  renameFile(path: String, name: String): Promise<any>;
}

const FileStation = (
  synoApi: SynologyApi,
):FileStation => ({
  // shares.ts
  listShares: () => listAvailableShares(synoApi.api),
  listShare: () => listSharesFiles(synoApi.api),

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
