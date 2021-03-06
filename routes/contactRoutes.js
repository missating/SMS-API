import contact from '../controllers/contactControllers';
import { verifyRegisterContact } from '../middlewares/contactValidation';

export default function contactRoutes(app) {

  //register a contact
  app.post('/api/v1/contact/register', verifyRegisterContact, contact.registerContact);

  // view a contact details
  app.get('/api/v1/contact/:id', contact.viewContact);

  // delete a contact 
  app.delete('/api/v1/contact/:id', contact.removeContact)
}
