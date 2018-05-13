import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Errors from "./Error";
configure({ adapter: new Adapter() });

test("Errors Component renders correctly", () => {
  const component = shallow(<Errors />);
  expect(component).toMatchSnapshot();
});

