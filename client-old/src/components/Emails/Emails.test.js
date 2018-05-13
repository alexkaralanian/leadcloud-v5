import React from "react";
import { shallow, configure } from "enzyme";
import Emails from "./Emails";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("Emails Component renders correctly", () => {
  const component = shallow(<Emails />);
  expect(component).toMatchSnapshot();
});

