import { MemoryRouter } from "react-router-dom";
import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { Unwrapped } from "./DashboardContainer";

configure({ adapter: new Adapter() });

test("DashboardContainer renders without crashing", () => {
  mount(
    <MemoryRouter>
      <Unwrapped />
    </MemoryRouter>
  );
});
