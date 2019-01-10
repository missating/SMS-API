import Sms from '../models/Sms';
import Contact from '../models/Contact';

export default class smsController {
  static sendSms(req, res) {
    return Contact.findOne({
      phoneNumber: req.body.senderNumber
    }).then(existingContact => {
      if(!existingContact) {
        return res.status(404)
        .json({
          errors: {
            status: 404,
            title: 'Not Found',
            detail: `Cannot find the sender's phone number`
          }
        });
      }

      return Contact.findOne({
        phoneNumber: req.body.receiverNumber
      }).then(existingContact => {
        if (!existingContact) {
        return res.status(404)
          .json({
            errors: {
              status: 404,
              title: 'Not Found',
              detail: `Cannot find the receiver's phone number`
            }
          });
        }

        return Sms.create({
          senderNumber: req.body.senderNumber,
          receiverNumber: req.body.receiverNumber,
          message: req.body.message,
        }).then((newSms) => {
          res.status(201).json({
            data: {
              status: 'Delivered',
              sms: {
                From: newSms.senderNumber,
                message: newSms.message,
                To: newSms.receiverNumber
              }
            }
          });
        })
        .catch(() => res.status(500).json({
          errors: {
            status: 'Pending'
          }
        }));
      })
    })
      .catch(() => res.status(500).json({
        errors: {
          status: '500',
          detail: 'Internal server error'
        }
      }));
  }

  static viewSentSms(req, res) {
    return Contact.findById({
      _id: req.params.id
    }).then((existingContact) => {
      if(!existingContact) {
        return res.status(404)
          .json({
            errors: {
              status: '404',
              title: 'Not Found',
              detail: 'Cannot find a Contact with that Id'
            }
          })
      } 

      const phoneNumber = existingContact.phoneNumber;

      Sms.find({
        senderNumber: phoneNumber
      }).then((allSentSms) => res.status(200).json({
        data: {
          sentSms: allSentSms
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

  static viewReceivedSms(req, res) {
    return Contact.findById({
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

      const phoneNumber = existingContact.phoneNumber;

      Sms.find({
        receiverNumber: phoneNumber
      }).then((allReceivedSms) => res.status(200).json({
        data: {
          receivedSms: allReceivedSms
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
}
