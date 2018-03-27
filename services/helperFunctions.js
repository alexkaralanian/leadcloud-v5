const helperFunctions = {
  emailTransform: emailsArray => {
    const nextPageToken = emailsArray[0];

    const emailArray = emailsArray[1].map(email => {
      function findSender(array) {
        return array.name === "From" || "";
      }

      function findSubject(array) {
        return array.name === "Subject" || "";
      }

      function findDate(array) {
        return array.name === "Date" || "";
      }

      const snippet = email.snippet
        .replace(/&#39;/g, "")
        .replace(/&amp;/g, "&")
        .trim();

      const headers = email.payload.headers;

      const senderEmail = headers.find(findSender).value.trim();

      let emailAddress = senderEmail.slice(
        senderEmail.indexOf("<") + 1,
        senderEmail.length - 1
      );

      const senderName = headers.find(findSender).value.trim();

      let name = senderName
        .slice(0, senderEmail.indexOf("<") - 1)
        .replace(/"/g, "")
        .trim();

      let subject;

      if (headers.find(findSubject)) {
        subject = headers.find(findSubject).value;
      } else {
        subject = "";
      }

      // GETTING AN ERROR HERE WITH ALEKSANDRA DIER'S EMAILS

      const date = headers.find(findDate).value;
      const id = email.id;
      const threadId = email.threadId;
      const labelIds = email.labelIds;

      return {
        name,
        emailAddress,
        subject,
        snippet,
        date,
        id,
        threadId,
        labelIds
      };
    });
    return {
      nextPageToken,
      emailArray
    };
  },
  secureObject: obj => {
    let securedObject = {};

    return securedObj;
  }
};

module.exports = helperFunctions;
