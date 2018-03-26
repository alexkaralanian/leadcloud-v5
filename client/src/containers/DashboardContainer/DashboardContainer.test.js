import React from "react";
import { shallow, configure } from "enzyme";
import DashboardContainer from "./DashboardContainer";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

test("DashboardContainer renders correctly", () => {
  const component = shallow(<DashboardContainer />).dive();
  expect(component).toMatchSnapshot();
});
