import sms from '../controllers/smsControllers';
import { verifySendSms } from '../middlewares/smsValidation';

export default function contactRoutes(app) {

  //send an sms
  app.post('/api/v1/sms', verifySendSms, sms.sendSms);

  app.get('/api/v1/sent_messages/:id', sms.viewSentSms);

  app.get('/api/v1/received_messages/:id', sms.viewReceivedSms);
}
