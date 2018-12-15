const moment = require("moment");

exports.mapGoogleContacts = (contact, userId) => {
  const imageArray = contact.photos && contact.photos.map(photo => photo.url);
  const membershipArray =
    contact.memberships &&
    contact.memberships.map(group => group.contactGroupMembership.contactGroupId);
  return {
    UserUuid: userId,
    googleId: contact.metadata.sources[0].id,
    firstName: contact.names && contact.names[0].givenName,
    lastName: contact.names && contact.names[0].familyName,
    fullName: contact.names && contact.names[0].displayName,
    email: contact.emailAddresses && contact.emailAddresses,
    phone: contact.phoneNumbers && contact.phoneNumbers,
    address: contact.addresses && contact.addresses,
    membership: membershipArray,
    images: imageArray,
    updated: moment(contact.metadata.sources[0].updateTime).format("YYYY-MM-DD HH:mm:ss.SSS")
  };
};
