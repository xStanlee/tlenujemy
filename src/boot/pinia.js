import { createPinia } from 'pinia';
import { boot } from 'quasar/wrappers';

import logService from 'src/services/log.serivce';

export default boot(({ app }) => {
  const pinia = createPinia();
  app.use(pinia);

  logService.info('Pinia initialized.')
});