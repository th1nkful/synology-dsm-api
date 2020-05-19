import { AxiosInstance } from "axios";

export interface getInfoResponse {
  version: Number;
  version_string: String;
  is_manager: Boolean;
};

export interface ServerConfig {
  bt_max_download: Number; /** Max BT download speed in KB/s (“0” means unlimited) */
  bt_max_upload: Number; /** Max BT upload speed in KB/s (“0” means unlimited) */
  emule_max_download: Number; /** Max eMule download speed in KB/s (“0” means unlimited) */
  emule_max_upload: Number; /** Max eMule upload speed in KB/s (“0” means unlimited) */
  nzb_max_download: Number; /** Max NZB download speed in KB/s (“0” means unlimited) */
  http_max_download: Number; /** Max HTTP download speed in KB/s (“0” means unlimited). For more info, please see Limitations */
  ftp_max_download: Number; /** Max FTP download speed in KB/s (“0” means unlimited). For more info, please see Limitations. */
  emule_enabled: Boolean; /** if eMule service is enabled */
  unzip_service_enabled: Boolean; /** If Auto unzip service is enabled for users */
  default_destination: String; /** except admin or administrators group Default destination */
  emule_default_destination: String; /** Emule default destination */
};


export const getInfo = async (
  api: AxiosInstance,
): Promise<getInfoResponse> => {
  const { data } = await api.get('/DownloadStation/info.cgi', {
    params: {
      api: 'SYNO.DownloadStation.Info',
      version: 1,
      method: 'getinfo',
    },
  });

  return data;
};


export const getConfig = async (
  api: AxiosInstance,
): Promise<ServerConfig> => {
  const { data } = await api.get('/DownloadStation/info.cgi', {
    params: {
      api: 'SYNO.DownloadStation.Info',
      version: 1,
      method: 'getconfig',
    },
  });

  return data;
};


export const setServerConfig = async (
  api: AxiosInstance,
  params: ServerConfig,
): Promise<any> => {
  const { data } = await api.get('/DownloadStation/info.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.Info',
      version: 1,
      method: 'setserverconfig',
    },
  });

  return data;
};
