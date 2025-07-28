import { boot } from 'quasar/wrappers';
import logService from 'src/services/log.serivce';

export default boot(async () => {
  // Dynamic import of FontAwesome CSS
  await import('@quasar/extras/line-awesome/line-awesome.css');
  logService.info('Line Awsome initialized.');
});