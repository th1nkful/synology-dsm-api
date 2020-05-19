import { AxiosInstance } from "axios";


export interface ListParams {
  offset?: Number;
  limit?: Number;
};

export interface RssSites {
  id: Number;
  is_update: Boolean;
  last_update: Number;
  title: String;
  url: String;
  username: String;
};

export interface ListResponse {
  total: Number;
  offset: Number;
  sites: RssSites[];
};

export const listRssSite = async (
  api: AxiosInstance,
  params: ListParams = {},
): Promise<ListResponse> => {
  const { data } = await api.get('/DownloadStation/RSSsite.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.RSS.Site',
      version: 1,
      method: 'list',
    },
  });

  return data;
};


export interface RefreshParams {
  id: String; /* comma-separated IDs, use 'ALL' for all RSS Sites */
};

export const refreshRssSites = async (
  api: AxiosInstance,
  params: RefreshParams = { id: 'ALL' },
): Promise<any> => {
  const { data } = await api.get('/DownloadStation/RSSsite.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.RSS.Site',
      version: 1,
      method: 'refresh',
    },
  });

  return data;
};
