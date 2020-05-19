import { AxiosInstance } from 'axios';

export interface StatisticsResponse {
  speed_download:Number;
  speed_upload:Number;
  emule_speed_download:Number;
  emule_speed_upload:Number;
}

export const getStatistics = async (
  api: AxiosInstance,
): Promise<StatisticsResponse> => {
  const params = {
    api: 'SYNO.DownloadStation.Statistic',
    version: 1,
    method: 'getinfo',
  };

  const { data } = await api.get('/DownloadStation/statistic.cgi', { params });

  return data;
};
