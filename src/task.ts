import { AxiosInstance } from 'axios';

import { TaskStatus, TaskErrorTypes } from './taskStatus';

interface TaskErrorMap { [key:number]: String; }

export const TaskErrors:TaskErrorMap = {
  0: 'Success',
  400: 'File upload failed',
  401: 'Max number of tasks reached',
  402: 'Destination denied',
  403: 'Destination does not exist',
  404: 'Invalid task id',
  405: 'Invalid task action',
  406: 'No default destination',
  407: 'Set destination failed',
  408: 'File does not exist',
};


interface TaskDetail {
  destination: String;
  uri: String;
  create_time: String; /** Timestamp */
  priority: String;
  total_peers: Number;
  connected_seeders: Number;
  connected_leechers: Number;
}

interface TaskTransfer {
  size_downloaded: String;
  size_uploaded: String;
  speed_download: Number;
  speed_upload: Number;
}

interface TaskFile {
  filename: String;
  size: String;
  size_downloaded: String
  priority: 'skip' | 'low' | 'high' | 'normal';
}

interface TaskTracker {
  url: String;
  status: String;
  update_timer: Number;
  seeds: Number;
  peers: Number;
}

interface TaskPeer {
  address: String;
  agent: String;
  progress: Number;
  speed_download: Number;
  speed_upload: Number;
}

interface TaskStatusExtra {
  error_detail: String;
  error_detail_friendly?: String;
  unzip_progress: Number;
}

interface TaskAdditional {
  detail: TaskDetail;
  transfer: TaskTransfer;
  file: TaskFile;
  tracker: TaskTracker;
  peer: TaskPeer;
}

export interface DownloadTask {
  id: String;
  type: String;
  username: String;
  title: String;
  size: String;
  status: String;
  status_friendly?: String;
  status_extra: TaskStatusExtra;
  additional: TaskAdditional;
}


const validateAdditional = (additional:String):Boolean => {
  const allowedOpts = [
    'detail',
    'transfers',
    'file',
    'tracker',
    'peer',
  ];

  const opts = additional.split(',');

  return opts.every((o) => allowedOpts.includes(o));
};


export interface ListTaskParams {
  offset?: Number;
  limit?: Number;
  /** Comma-separated, including detail / transfers / file / tracker / peer */
  additional?: String;
}

export interface ListTaskResponse {
  total: Number;
  offset: Number;
  tasks: DownloadTask[];
}


const addStatusDescriptions = (
  tasks: DownloadTask[],
):DownloadTask[] => tasks.map((task) => {
  const taskWithDescriptions = {
    ...task,
    status_friendly: TaskStatus[`${task.status}`] || 'Unknown',
  };

  if (task.status_extra) {
    const friendlyType = TaskErrorTypes[`${task.status_extra.error_detail}`];
    taskWithDescriptions.status_extra.error_detail_friendly = friendlyType;
  }

  return taskWithDescriptions;
});

export const listDownloadTasks = async (
  api: AxiosInstance,
  params: ListTaskParams,
): Promise<ListTaskResponse> => {
  if (params.additional && !validateAdditional(params.additional)) {
    throw new Error('The following additional params are allowed: detail/transfers/file/tracker/peer');
  }

  const { data } = await api.get('/DownloadStation/task.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.Task',
      version: 1,
      method: 'list',
    },
  });

  data.tasks = addStatusDescriptions(data.tasks);

  return data;
};


export interface GetTaskParams {
  id: String; /** Comma-separated IDs */
  additional?: String; /** Comma-separated, including detail/transfers/file/tracker/peer */
}


export interface GetTaskResponse {
  tasks: DownloadTask[];
}


export const getDownloadTaskInfo = async (
  api: AxiosInstance,
  params: GetTaskParams,
): Promise<GetTaskResponse> => {
  if (params.additional && !validateAdditional(params.additional)) {
    throw new Error('The following additional params are allowed: detail/transfers/file/tracker/peer');
  }

  const { data } = await api.get('/DownloadStation/task.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.Task',
      version: 1,
      method: 'getinfo',
    },
  });

  data.tasks = addStatusDescriptions(data.tasks);

  return data;
};


export interface CreateTaskParams {
  uri?: String; /** http/https/ftp/manget_link/ed2k_link/filepath with share folder */
  // file?: Buffer;
  username?: String;
  password?: String;
  unzip_password?: String;
  destination?: String;
}

export const createDownloadTask = async (
  api: AxiosInstance,
  params: CreateTaskParams,
): Promise<any> => {
  const { data } = await api.post('/DownloadStation/task.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.Task',
      version: 1,
      method: 'create',
    },
  });

  return data;
};


export interface DeleteTaskParams {
  id: String;
  force_complete: Boolean; /** delete task and move uncompleted downloads to destination */
}

export interface DeleteTaskResponse {
  id: String;
  error: Number;
  status: String;
}

export const deletDownloadTask = async (
  api: AxiosInstance,
  params: DeleteTaskParams,
): Promise<DeleteTaskResponse> => {
  const { data } = await api.get('/DownloadStation/task.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.Task',
      version: 1,
      method: 'delete',
    },
  });

  const [item] = data;
  item.status = TaskErrors[item.error];
  return item;
};

export interface PauseTaskParams {
  id: String;
}

export interface PauseTaskResponse {
  id: String;
  error: Number;
  status: String;
}

export const pauseDownloadTask = async (
  api: AxiosInstance,
  params: PauseTaskParams,
): Promise<PauseTaskParams> => {
  const { data } = await api.get('/DownloadStation/task.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.Task',
      version: 1,
      method: 'pause',
    },
  });

  const [item] = data;
  item.status = TaskErrors[item.error];
  return item;
};


export interface ResumeTaskParams {
  id: String;
}

export interface ResumeTaskResponse {
  id: String;
  error: Number;
  status: String;
}

export const resumeDownloadTask = async (
  api: AxiosInstance,
  params: ResumeTaskParams,
): Promise<ResumeTaskResponse> => {
  const { data } = await api.get('/DownloadStation/task.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.Task',
      version: 1,
      method: 'resume',
    },
  });

  const [item] = data;
  item.status = TaskErrors[item.error];
  return item;
};


export interface EditTaskParams {
  id: String;
  destination: String;
}

export interface EditTaskResponse {
  id: String;
  error: Number;
  status: String;
}

export const editDownloadTaskDestination = async (
  api: AxiosInstance,
  params: EditTaskParams,
): Promise<EditTaskResponse> => {
  const { data } = await api.get('/DownloadStation/task.cgi', {
    params: {
      ...params,
      api: 'SYNO.DownloadStation.Task',
      version: 1,
      method: 'edit',
    },
  });

  const [item] = data;
  item.status = TaskErrors[item.error];
  return item;
};
