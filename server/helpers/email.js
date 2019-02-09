exports.transform = emailsArray => {
  const nextPageToken = emailsArray[0];
  const emailArray = emailsArray[1].map(email => {
    const findSender = array => array.name === "From" || "";
    const findSubject = array => array.name === "Subject" || "";
    const findDate = array => array.name === "Date" || "";

    const snippet = email.snippet
      .replace(/&#39;/g, "")
      .replace(/&amp;/g, "&")
      .trim();

    const headers = email.payload.headers;
    const senderEmail = headers.find(findSender).value.trim();
    const emailAddress = senderEmail.slice(senderEmail.indexOf("<") + 1, senderEmail.length - 1);

    const findSenderResult = headers.find(findSender);
    const senderName = findSenderResult && findSenderResult.value.trim();
    const name = senderName
      .slice(0, senderEmail.indexOf("<") - 1)
      .replace(/"/g, "")
      .trim();

    let subject;
    if (headers.find(findSubject)) {
      subject = headers.find(findSubject).value;
    } else {
      subject = "";
    }

    const findDateResult = headers.find(findDate);
    const date = findDateResult && findDateResult.value;
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
};
