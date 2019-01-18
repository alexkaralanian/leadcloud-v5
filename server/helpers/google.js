const moment = require("moment");

exports.mapGoogleContacts = (contact, userId) => {
  const imageArray = contact.photos && contact.photos.map(photo => photo.url);

  const membershipArray =
    contact.memberships &&
    contact.memberships.map(group => group.contactGroupMembership.contactGroupId);

  const typeCheck = data => {
    if (data.type === "(null)") {
      return null;
    }
    return data.type;
  };

  const emails =
    contact.emailAddresses &&
    contact.emailAddresses.map(email => ({
      value: email.value,
      type: email.type ? typeCheck(email) : null
    }));

  const phoneNumbers =
    contact.phoneNumbers &&
    contact.phoneNumbers.map(phone => ({
      value: phone.value,
      type: phone.type ? typeCheck(phone) : null
    }));

  return {
    UserUuid: userId,
    googleId: contact.metadata.sources[0].id,
    firstName: contact.names && contact.names[0].givenName,
    lastName: contact.names && contact.names[0].familyName,
    fullName: contact.names && contact.names[0].displayName,
    email: emails,
    phone: phoneNumbers,
    address: contact.addresses && contact.addresses,
    membership: membershipArray,
    images: imageArray,
    updated: contact.metadata.sources[0].updateTime
  };
};
