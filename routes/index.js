import contactRoutes from './contactRoutes';
import smsRoutes from './smsRoutes';

const routes = (app) => {
  contactRoutes(app);
  smsRoutes(app);
}

export default routes;
