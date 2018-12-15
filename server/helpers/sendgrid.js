const helper = require("sendgrid").mail;

exports.cleanContacts = contactsArray => {
  const emails = [];
  const names = [];

  contactsArray.forEach(contact => {
    const name = contact.dataValues.firstName || null;
    if (contact.dataValues.email) {
      contact.dataValues.email.forEach(email => {
        if (!emails.includes(email.value)) {
          emails.push(email.value);
          names.push(name);
        }
      });
    }
  });
  // we map over the final namee and emails arrays and into one signle array cleanedContacts array ready for SendGrid.
  const cleanedContacts = [];
  for (let i = 0; i < emails.length; i++) {
    cleanedContacts.push(new helper.Email(emails[i], names[i]));
  }
  return cleanedContacts;
};
