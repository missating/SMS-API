import Contact from '../models/Contact';

export default class contactController {
  static registerContact(req, res) {
    Contact.findOne({
      phoneNumber: req.body.phoneNumber,
    }).then((existingContact) => {
      if (existingContact) {
        return res.status(409)
          .json({
            errors: {
              status: '409',
              title: 'Conflict',
              detail: 'A contact with this Phone Number already exist'
            }
          });;
      }
      return Contact.create({
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
      }).then((newContact) => {
        res.status(201).json({
          data: {
            message: 'Contact successfully registered',
            contact: {
              id: newContact._id,
              name: newContact.name,
              phoneNumber: newContact.phoneNumber,
            },
          }
        });
      })
    })
      .catch((error) => console.log(error));
  }
}
