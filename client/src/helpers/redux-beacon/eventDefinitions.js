export const pageView = action => ({
  hitType: "pageview",
  page: action.payload
});
