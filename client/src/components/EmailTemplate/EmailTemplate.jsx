import React from "react";
import { Email, Item, Span, A, renderEmail } from "react-html-email";
import ReactHtmlParser from "react-html-parser";

const reactEmail = ({ campaignListings }) => {
  const emailHTML = renderEmail(
    <Email title="Hello World!">
      <Item align="center">
        <Span fontSize={20}>
          {campaignListings[0].address}
          <A href="https://github.com/chromakode/react-html-email" />
        </Span>
      </Item>
    </Email>
  );

  return <div>{ReactHtmlParser(emailHTML)}</div>;
};

export default reactEmail;
