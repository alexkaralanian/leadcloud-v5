import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import DashboardContainer from "./DashboardContainer";

configure({ adapter: new Adapter() });

test("DashboardContainer renders correctly", () => {
  const component = shallow(<DashboardContainer />).dive();
  expect(component).toMatchSnapshot();
});
