import SynologyAPI from './SynologyApi';
import { Session } from './SynologyApi.def';

const setupSynoApi = async (
  server: String, account: String, passwd: String,
) => {
  const api = new SynologyAPI(server, account, passwd);
  await api.login(Session.Download);
  return api;
};

export default setupSynoApi;
