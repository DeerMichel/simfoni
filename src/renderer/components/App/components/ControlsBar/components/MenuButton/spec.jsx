import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import { MoreVertical } from "react-feather";
import MenuButton from "./index";
import Clickable from "~/components/Clickable";

describe("MenuButton", () => {
    it("renders itself", () => {
        const component = mount(<MenuButton />);

        expect(component).to.be.present();
    });

    it("displays its icon", () => {
        const component = mount(<MenuButton />);

        expect(component).to.have.exactly(1).descendants(MoreVertical);
    });

    it("invokes callback on click", () => {
        let callbackInvoked = false;
        const onClick = () => { callbackInvoked = true; };
        const component = mount(<MenuButton onShowMenu={onClick} />);
        component.find(Clickable).simulate("click");

        expect(callbackInvoked).to.equal(true);
    });
});
