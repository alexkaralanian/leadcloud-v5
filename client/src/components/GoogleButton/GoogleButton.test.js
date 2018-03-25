import React from "react";
import { shallow, configure } from "enzyme";
import GoogleButton from "./GoogleButton";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("Google Button Component renders correctly", () => {
  const component = shallow(<GoogleButton />);
  expect(component).toMatchSnapshot();
});
