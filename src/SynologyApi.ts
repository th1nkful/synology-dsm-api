import axios, { AxiosInstance } from 'axios';
import ds, { DownloadStation } from './DownloadStation';
import fs, { FileStation } from './FileStation';

export enum Session {
  Download = 'DownloadStation',
  File = 'FileStation',
}

class SynologyAPI {
  account: String;
  password: String;
  api: AxiosInstance;
  session: Session | undefined;
  downloadStation: DownloadStation | undefined;
  fileStation: FileStation | undefined;

  constructor(server:String, account:String, password:String) {
    this.account = account;
    this.password = password;

    this.api = axios.create({
      baseURL: `http://${server}/webapi`,
    });

    this.session = undefined;
    this.downloadStation = ds(this);
    this.fileStation = fs(this);
  }

  async login(session:Session = Session.Download) {
    const params = {
      api: 'SYNO.API.Auth',
      version: 3,
      method: 'login',
      account: this.account,
      passwd: this.password,
      session,
      format: 'cookie',
    };

    await this.api.get('/auth.cgi', { params });
    this.session = session;
  }

  async logout(session:Session = Session.Download) {
    const params = {
      api: 'SYNO.API.Auth',
      version: 1,
      method: 'logout',
      session,
    };

    await this.api.get('/auth.cgi', { params });
    this.session = undefined;
  }
}

export default SynologyAPI;
