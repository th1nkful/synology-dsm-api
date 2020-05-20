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

import {
  listDownloadTasks, getDownloadTaskInfo, createDownloadTask,
  deletDownloadTask, pauseDownloadTask, resumeDownloadTask,
  editDownloadTaskDestination, ListTaskParams, ListTaskResponse,
  GetTaskParams, CreateTaskParams, DeleteTaskParams, PauseTaskParams,
  ResumeTaskParams, EditTaskParams, EditTaskResponse, ResumeTaskResponse,
  PauseTaskResponse, DeleteTaskResponse, GetTaskResponse,
} from './task';


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

  listDownloadTasks(params: ListTaskParams): Promise<ListTaskResponse>;
  getDownloadTaskInfo(params: GetTaskParams): Promise<GetTaskResponse>;
  createDownloadTask(params: CreateTaskParams): Promise<any>;
  deletDownloadTask(params: DeleteTaskParams): Promise<DeleteTaskResponse>;
  pauseDownloadTask(params: PauseTaskParams): Promise<PauseTaskResponse>;
  resumeDownloadTask(params: ResumeTaskParams): Promise<ResumeTaskResponse>;
  editDownloadTaskDestination(params: EditTaskParams): Promise<EditTaskResponse>;
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
  listDownloadTasks: (params: ListTaskParams) => listDownloadTasks(synoApi.api, params),
  getDownloadTaskInfo: (params: GetTaskParams) => getDownloadTaskInfo(synoApi.api, params),
  createDownloadTask: (params: CreateTaskParams) => createDownloadTask(synoApi.api, params),
  deletDownloadTask: (params: DeleteTaskParams) => deletDownloadTask(synoApi.api, params),
  pauseDownloadTask: (params: PauseTaskParams) => pauseDownloadTask(synoApi.api, params),
  resumeDownloadTask: (params: ResumeTaskParams) => resumeDownloadTask(synoApi.api, params),
  editDownloadTaskDestination: (
    params: EditTaskParams,
  ) => editDownloadTaskDestination(synoApi.api, params),

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
