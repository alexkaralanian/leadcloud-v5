module.exports = campaign => {
  console.log("CAMPAIGN", campaign.listings);

  return `
    <html>
      <body>
      <div style="text-align:center; ">
        <h1>${campaign.title}</h1>
        <p>${campaign.body}</p>
        ${campaign.listings &&
          campaign.listings.map(listing => {
            return `<div>
          <h2>${listing.address}</h2>
          <img src=${listing.images && listing.images[0]} style="height:400px;">
          <p max-width:600px;>${listing.description}</p>
        </div>`;
          })}
        </div>
      </body>
    </html>
  `;
};
