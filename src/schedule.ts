import { AxiosInstance } from 'axios';


export interface ScheduleConfigOptions {
  enabled:Boolean; /** If download schedule is enabled */
  emule_enabled:Boolean; /** If eMule download schedule is enabled */
}


export const getScheduleConfig = async (
  api: AxiosInstance,
): Promise<ScheduleConfigOptions> => {
  const params = {
    api: 'SYNO.DownloadStation.Schedule',
    version: 1,
    method: 'getconfig',
  };

  const { data } = await api.get('/DownloadStation/schedule.cgi', { params });
  return data;
};


export const setScheduleConfig = async (
  api: AxiosInstance,
  params: ScheduleConfigOptions,
): Promise<any> => {
  const { data } = await api.get('/DownloadStation/schedule.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.Schedule',
      version: 1,
      method: 'setconfig',
    },
  });
  return data;
};
