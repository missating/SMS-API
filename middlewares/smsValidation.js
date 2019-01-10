import { isEmpty } from 'lodash';
import validator from 'validator';

export const verifySendSms = (req, res, next) => {
  const { senderNumber, receiverNumber, message } = req.body;
  const errors = {};

  if (!senderNumber) {
    errors.senderNumber = `Sender's phone number is required`;
  } else if (senderNumber && !validator.isMobilePhone(senderNumber.trim())) {
    errors.senderNumber = `Sender's phone number is invalid or empty`;
  } else if (!receiverNumber) {
    errors.receiverNumber = `Receiver's phone number is required`;
  } else if (receiverNumber && !validator.isMobilePhone(receiverNumber.trim())) {
    errors.receiverNumber = `Receiver's phone number is invalid or empty`;
  } else if(!message) {
    errors.message = `Message is required`;
  } else if (message && validator.isEmpty(message.trim())) {
    errors.message = `Message cannot be empty`;
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};
