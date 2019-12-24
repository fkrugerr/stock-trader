import { mapActions as authActions, mapGetters as authGetters } from './auth';
import {
  mapActions as portfolioActions,
  mapGetters as portfolioGetters,
} from './portfolio';
import { mapActions as stockActions, mapGetters as stockGetters } from './stock';
import { mapActions as appActions, mapGetters as appGetters } from './app';

export {
  authActions, authGetters,
  portfolioActions, portfolioGetters,
  stockActions, stockGetters,
  appActions, appGetters,
};
