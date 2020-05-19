import { AxiosInstance } from "axios";

export interface ListRssFeedsParams {
  id?: String; /** Comma-separated IDs to list */
  offset?: Number;
  limit?: Number;
};

export interface RssFeed {
  title: String;
  size: String;
  time: Number; /** timestamp */
  download_url: String;
  external_link: String;
};

export interface ListRssFeedsResponse {
  total:Number;
  offset:Number;
  feeds: RssFeed[];
};

export const listRssFeeds = async (
  api: AxiosInstance,
  params: ListRssFeedsParams = {},
): Promise<any> => {
  const { data } = await api.get('/DownloadStation/RSSfeed.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.RSS.Feed',
      version: 1,
      method: 'list',
    },
  });

  return data;
};
