import React from "react";
var ReactDOM = require("react-dom");
import ReactTestUtils from "react-addons-test-utils";

function MyComponent() {
    return (
        <div>
            <span className="heading">Title</span>
        </div>
    );
}


const renderer = ReactTestUtils.createRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

describe("Test react component", function() {
    it("can render without error", function() {
        expect(result.type).toBe("div");
        expect(result.props.children).toEqual(
            <span className="heading">Title</span>
        );
    });
});


import Main from "../../main/web/scripts/helloWorldCtrl.js";

const renderer2 = ReactTestUtils.createRenderer();
renderer2.render(<Main />);
const result2 = renderer2.getRenderOutput();

describe("Test2", function() {
    it("error", function() {
        expect(result2.type).toBe("div");
        //expect(result2).toBe("div");
        expect(result2.props.children).toEqual(
            "Hello World from react!"
        );
        //expect(result2.textContent).toBe("Hello World from react!");
    });
});