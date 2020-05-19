import { AxiosInstance } from "axios";


export const SearchErrors = {
  400: 'Unknown error',
  401: 'Invalid parameter',
  402: 'Parse the user setting failed',
  403: 'Get category failed',
  404: 'Get the search result from DB failed',
  405: 'Get the user setting failed',
};


export interface SearchStartParams {
  module: 'all'|'enabled';
  keyword: String;
};

export interface SearchStartResponse {
  taskid: String;
};

export const startSearch = async (
  api: AxiosInstance,
  params: SearchStartParams = { module: 'enabled', keyword: 'ubuntu' },
): Promise<SearchStartResponse> => {
  const { data } = await api.get('/DownloadStation/btsearch.cgi', {
    params: {
      api: 'SYNO.DownloadStation.BTSearch',
      version: 1,
      method: 'start',
    },
  });

  return data;
};


export interface ListSearchParams {
  taskid: String;
  offset: Number;
  limit: Number;
  sort_by: 'title'|'size'|'date'|'peers'|'provider'|'seeds'|'leeches';
  sort_direction: 'asc'|'desc';
  filter_category: String; /** categoryId from getSearchCategories */
  filter_title: String;
};

export interface SearchFeedItem {
  title: String;
  date: String;
  download_uri: String;
  external_link: String;
  peers: Number;
  leechs: Number;
  size: String;
  module_id: String;
  module_title: String;
};

export interface ListSearchResponse {
  taskid: String;
  finished: Boolean;
  offset: Number;
  total: Number;
  items: SearchFeedItem[];
};

export const listSearches = async (
  api: AxiosInstance,
  params: ListSearchParams,
): Promise<ListSearchResponse> => {
  const { data } = await api.get('/DownloadStation/btsearch.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.BTSearch',
      version: 1,
      method: 'list',
    },
  });

  return data;
};


export interface SearchCategory {
  id: String;
  title: String;
};

export interface SearchCategoriesResponse {
  categories: SearchCategory[];
};

export const getSearchCategories = async (
  api: AxiosInstance,
): Promise<SearchCategoriesResponse> => {
  const { data } = await api.get('/DownloadStation/btsearch.cgi', {
    params: {
      api: 'SYNO.DownloadStation.BTSearch',
      version: 1,
      method: 'getCategory',
    },
  });

  return data;
};


export const cleanSearch = async (
  api: AxiosInstance,
  taskid: String,
): Promise<any> => {
  const { data } = await api.get('/DownloadStation/btsearch.cgi', {
    params: {
      api: 'SYNO.DownloadStation.BTSearch',
      version: 1,
      method: 'clean',
      taskid,
    },
  });

  return data;
};


export interface SearchModule {
  enabled: Boolean;
  id: String;
  title: String;
};

export interface SearchModulesResponse {
  modules: SearchModule[];
};

export const getSearchModules = async (
  api: AxiosInstance,
): Promise<SearchModulesResponse> => {
  const { data } = await api.get('/DownloadStation/btsearch.cgi', {
    params: {
      api: 'SYNO.DownloadStation.BTSearch',
      version: 1,
      method: 'getModule',
    },
  });

  return data;
};
