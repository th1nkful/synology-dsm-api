import SynologyAPI from "./SynologyApi";

import {
  getInfo,
  getConfig,
  setServerConfig,
  getInfoResponse,
  ServerConfig,
} from './info';

import { getStatistics, StatisticsResponse } from "./statistic";

import { getScheduleConfig, setScheduleConfig, ScheduleConfigOptions } from "./schedule";


export interface DownloadStation {
  getInfo(): Promise<getInfoResponse>;
  getConfig(): Promise<ServerConfig>;
  setServerConfig(params: ServerConfig): Promise<any>;

  getStatistics(): Promise<StatisticsResponse>;

  getScheduleConfig(): Promise<ScheduleConfigOptions>;
  setScheduleConfig(params: ScheduleConfigOptions): Promise<any>;
};


const DownloadStation = (
  synoApi:SynologyAPI,
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
});

export default DownloadStation;
