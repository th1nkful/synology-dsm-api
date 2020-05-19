import { AxiosInstance } from 'axios';

export enum Session {
  Download = 'DownloadStation',
  File = 'FileStation',
}

export interface SynologyApi {
  account: String;

  password: String;

  api: AxiosInstance;

  session: Session | undefined;
}
