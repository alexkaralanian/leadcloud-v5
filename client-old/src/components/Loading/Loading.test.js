import React from "react";
import { shallow, configure } from "enzyme";
import Loading from "./Loading";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("Loading Component renders correctly", () => {
  const component = shallow(<Loading />);
  expect(component).toMatchSnapshot();
});
