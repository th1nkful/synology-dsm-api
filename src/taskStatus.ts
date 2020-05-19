export interface TaskStatusMap { [key:string]: String; }

export const TaskStatus:TaskStatusMap = {
  waiting: 'Waiting',
  downloading: 'Downloading',
  paused: 'Paused',
  finishing: 'Finishing',
  finished: 'Finished',
  hash_checking: 'Hash Checking',
  seeding: 'Seeding',
  filehosting_waiting: 'File Hosting - Waiting',
  extracting: 'Extracting',
  error: 'Error',
};


export interface TaskErrorTypesMap { [key:string]: String; }

export const TaskErrorTypes:TaskErrorTypesMap = {
  broken_link: 'Broken Link',
  destination_not_exist: "Destination - Doesn't Exist",
  destination_denied: 'Destination - Denied',
  disk_full: 'Disk Full',
  quota_reached: 'Quota Reached',
  timeout: 'Timeout',
  exceed_max_file_system_size: 'Exceeded Max - File System Size',
  exceed_max_destination_size: 'Exceeded Max - Ddestination Size',
  exceed_max_temp_size: 'Exceeded Max - Temp Size',
  encrypted_name_too_long: 'Encrypted Name Too Long',
  name_too_long: 'Name Too Long',
  torrent_duplicate: 'Torrent Duplicated',
  file_not_exist: "File Doesn't Exist",
  required_premium_account: 'Required Premium Account',
  not_supported_type: 'Unsupported Type',
  try_it_later: 'Try It Later',
  task_encryption: 'Task Encryption',
  missing_python: 'Missing Python',
  private_video: 'Private Video',
  ftp_encryption_not_supported_type: 'FTP Encryption Unsupported Type',
  extract_failed: 'Extract Failed',
  extract_failed_wrong_password: 'Extract Failed - Wrong Password',
  extract_failed_invalid_archive: 'Extract Failed - Invalid Archive',
  extract_failed_quota_reached: 'Extract Failed - Quota Reached',
  extract_failed_disk_full: 'Extract Failed - Disk Full',
  unknown: 'Unknown',
};
