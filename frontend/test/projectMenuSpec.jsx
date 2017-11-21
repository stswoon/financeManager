import React from "react";
import ReactTestUtils from "react-addons-test-utils";

import ProjectMenu from "../src/components/projectsmenu/ProjectMenu";

const renderer = ReactTestUtils.createRenderer();


// describe('AppSpec', () => {
//     let page;
//
//     beforeEach(() => {
//         page = new Page(<ProjectMenu />)
//     });
//
//     afterEach(() => {
//         page.destroy()
//     });
//
//     it('should pass', () => {
//         expect(page.content()).toMatch(/Welcome to React/)
//     })
// });

//https://www.undefinednull.com/2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/
describe("Test2", function () {
    //todo use https://github.com/airbnb/enzyme!!!
    it("error", function () {
        let projects = [{name: "test1", id: 1}, {name: "test2", id: 2}];
        let projectMenu = ReactTestUtils.renderIntoDocument(<ProjectMenu projects={projects}/>);
        let result = ReactTestUtils.scryRenderedDOMComponentsWithClass(projectMenu, "ProjectMenu")[0];

        // let div = document.createElement('div');
        // div.id = "test";
        // document.documentElement.appendChild(div);
        // div.appendChild(result);

        expect(result.tagName).toBe("DIV");
        expect(result.className).toBe("ProjectMenu");
        expect(result.children[0].innerText).toBe("Projects");

        ReactTestUtils.Simulate.click(result.children[0]); //a href click
        result = ReactTestUtils.scryRenderedDOMComponentsWithClass(projectMenu, "ProjectMenu")[0];
        expect(document.getElementsByClassName("projectMenu__item-text").length).toBe(2); //tofo remove from dom

        // div.remove();
    });
});