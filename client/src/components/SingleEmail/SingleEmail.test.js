import React from "react";
import { shallow, configure } from "enzyme";
import SingleEmail from "./SingleEmail";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("SingleEmail Component renders correctly", () => {
  const component = shallow(<SingleEmail />);
  expect(component).toMatchSnapshot();
});
