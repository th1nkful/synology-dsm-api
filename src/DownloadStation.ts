import { SynologyApi } from './SynologyApi.def';

import {
  getInfo,
  getConfig,
  setServerConfig,
  getInfoResponse,
  ServerConfig,
} from './info';

import { getStatistics, StatisticsResponse } from './statistic';

import { getScheduleConfig, setScheduleConfig, ScheduleConfigOptions } from './schedule';

import {
  refreshRssSites, listRssSites, ListParams, RefreshParams, ListResponse,
} from './rssSite';

import { ListRssFeedsParams, listRssFeeds, ListRssFeedsResponse } from './rssFeed';

import {
  getSearchModules, cleanSearch, startSearch, listSearches,
  getSearchCategories, SearchStartParams, SearchStartResponse,
  ListSearchParams, ListSearchResponse, SearchCategoriesResponse,
  SearchModulesResponse,
} from './search';


export interface DownloadStation {
  getInfo(): Promise<getInfoResponse>;
  getConfig(): Promise<ServerConfig>;
  setServerConfig(params: ServerConfig): Promise<any>;

  getStatistics(): Promise<StatisticsResponse>;

  getScheduleConfig(): Promise<ScheduleConfigOptions>;
  setScheduleConfig(params: ScheduleConfigOptions): Promise<any>;

  startSearch(params: SearchStartParams): Promise<SearchStartResponse>;
  listSearches(params: ListSearchParams): Promise<ListSearchResponse>;
  getSearchCategories(): Promise<SearchCategoriesResponse>;
  cleanSearch(taskId: String): Promise<any>;
  getSearchModules(): Promise<SearchModulesResponse>;

  listRssFeeds(params: ListRssFeedsParams): Promise<ListRssFeedsResponse>;

  listRssSites(params: ListParams): Promise<ListResponse>;
  refreshRssSites(options: RefreshParams): Promise<any>;
}


const DownloadStation = (
  synoApi:SynologyApi,
):DownloadStation => ({
  // info.ts
  getInfo: () => getInfo(synoApi.api),
  getConfig: () => getConfig(synoApi.api),
  setServerConfig: (
    params: ServerConfig,
  ) => setServerConfig(synoApi.api, params),

  // statistics.ts
  getStatistics: () => getStatistics(synoApi.api),

  // schedule.ts
  getScheduleConfig: () => getScheduleConfig(synoApi.api),
  setScheduleConfig: (params: ScheduleConfigOptions) => setScheduleConfig(synoApi.api, params),

  // task.ts

  // search.ts
  startSearch: (params: SearchStartParams) => startSearch(synoApi.api, params),
  listSearches: (params: ListSearchParams) => listSearches(synoApi.api, params),
  getSearchCategories: () => getSearchCategories(synoApi.api),
  cleanSearch: (taskId: String) => cleanSearch(synoApi.api, taskId),
  getSearchModules: () => getSearchModules(synoApi.api),

  // rssFeeed.ts
  listRssFeeds: (params: ListRssFeedsParams) => listRssFeeds(synoApi.api, params),

  // rssSite.ts
  listRssSites: (params: ListParams) => listRssSites(synoApi.api, params),
  refreshRssSites: (options: RefreshParams) => refreshRssSites(synoApi.api, options),
});

export default DownloadStation;
