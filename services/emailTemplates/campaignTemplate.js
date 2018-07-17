module.exports = campaign => {
  return `
    <html>
      <body>
        <h1>${campaign.title}</h1>
        <br />
        ${campaign.listings &&
          campaign.listings.map(
            listing =>
              `<div>
          <h3>${listing.address}</h3>
          <img src=${listing.images[0]}>
        </div>`
          )}
      </body>
    </html>
  `;
};
