import React from "react";
import MockRouter from "react-mock-router";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Typography, IconButton, Button } from "@material-ui/core";

import Base from ".";

import menuData from "../tests/data/menu";
import Header from "../Header";
import Drawer from "../Drawer";
import CookieInfo from "../CookieInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("Base", () => {
  it("renders correctly", () => {
    const tree = shallow(
      <MockRouter>
        <Base title="Foo" menuData={menuData} hasCookieInfo menuOpen>
          <div>Foo</div>
        </Base>
      </MockRouter>,
    );

    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without header", () => {
    const tree = shallow(
      <MockRouter>
        <Base
          title="Foo"
          menuData={menuData}
          hasCookieInfo
          hasHeader={false}
          menuOpen
        >
          <div>Foo</div>
        </Base>
      </MockRouter>,
    );

    expect(tree).toMatchSnapshot();
  });

  it("renders with drawer open", () => {
    const tree = shallow(
      <MockRouter>
        <Base
          title="Foo"
          menuData={menuData}
          hasCookieInfo
          hasHeader={false}
          menuOpen
        >
          <div>Foo</div>
        </Base>
      </MockRouter>,
    );

    expect(tree).toMatchSnapshot();
  });

  it("click on title", () => {
    const tree = shallow(
      <MockRouter>
        <Base title="Foo" menuData={menuData} hasCookieInfo menuOpen>
          <div>Foo</div>
        </Base>
      </MockRouter>,
    );

    tree.find(Header).find(Typography).simulate("click");

    expect(tree).toMatchSnapshot();
  });

  it("click on menu icon if open changes state", () => {
    const tree = shallow(
      <MockRouter>
        <Base title="Foo" menuData={menuData} hasCookieInfo menuOpen>
          <div>Foo</div>
        </Base>
      </MockRouter>,
    );

    tree.find(Header).find(IconButton).simulate("click");

    expect(tree).toMatchSnapshot();
  });

  it("click on menu icon if closed changes state", () => {
    const tree = shallow(
      <MockRouter>
        <Base title="Foo" menuData={menuData} hasCookieInfo menuOpen>
          <div>Foo</div>
        </Base>
      </MockRouter>,
    );

    tree.find(Drawer).find(IconButton).simulate("click");

    expect(tree).toMatchSnapshot();
  });

  it("call function when cookie is accepted", () => {
    const tree = shallow(
      <MockRouter>
        <Base title="Foo" menuData={menuData} hasCookieInfo menuOpen>
          <CookieInfo />
          <div>Foo</div>
        </Base>
      </MockRouter>,
    );

    tree.find(CookieInfo).find(Button).simulate("click");

    expect(tree).toMatchSnapshot();
  });
});
