import Contact from '../models/Contact';
import Sms from '../models/Sms';
import smsController from './smsControllers';

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
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }

  static viewContact(req, res) {
    return Contact.findById({
      _id: req.params.id
    }).then((existinfContact) => {
      if (!existinfContact) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'Cannot find a Contact with that Id'
            }
          })
      }
      Contact.findById({
        _id: req.params.id
      }).then((contact) => res.status(200).json({
        data: {
          message: 'Contact successfully found',
          contact: {
            name: contact.name,
            phoneNumber: contact.phoneNumber
          }
        }
      }))
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }

  static removeContact(req, res) {
    return Contact.findOneAndDelete({
      _id: req.params.id
    }).then((existingContact) => {
      if (!existingContact) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'Cannot find a Contact with that Id'
            }
          })
      }
      Contact.findOneAndDelete({
        _id: req.params.id
      }).then((contact) => {
        return Sms.deleteMany({
          senderNumber: contact.phoneNumber
        }).then(() => {
          return Sms.deleteMany({
            receiverNumber: contact.phoneNumber
          }).then(() => {
            return response.status(200).json({
              message: 'Contact successfully deleted'
            })
          })
        })
      })
      }).catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }))
    }
  }
