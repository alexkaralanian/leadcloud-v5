import React from "react";
import { shallow, configure } from "enzyme";
import Dashboard from "./Dashboard";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("Dashboard Component renders correctly", () => {
  const component = shallow(<Dashboard />);
  expect(component).toMatchSnapshot();
});
