import { isEmpty } from 'lodash';
import validator from 'validator';

export const verifyRegisterContact = (req, res, next) => {
  const { name, phoneNumber } = req.body;
  const errors = {};

  if (!name) {
    errors.name = `Contact's name is required`;
  } else if (name && validator.isEmpty(name.trim())) {
    errors.name = `Contact's name cannot be empty`;
  } else if (!phoneNumber) {
    errors.phoneNumber = `Contact's phone number is required`;
  } else if (phoneNumber && !validator.isMobilePhone(phoneNumber.trim())) {
    errors.phoneNumber = `Contact's phone number is invalid or empty`;
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
};
