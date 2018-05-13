import React from "react";
import { shallow, configure } from "enzyme";
import Profile from "./Profile";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("Profile Component renders correctly", () => {
  const component = shallow(<Profile />);
  expect(component).toMatchSnapshot();
});
