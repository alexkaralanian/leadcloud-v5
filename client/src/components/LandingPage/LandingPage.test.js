import React from "react";
import { shallow, configure } from "enzyme";
import LandingPage from "./LandingPage";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("Landing Page Component renders correctly", () => {
  const component = shallow(<LandingPage />);
  expect(component).toMatchSnapshot();
});
