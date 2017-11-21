import React from 'react';
import {render} from 'react-dom';
import ProjectMenu from "../src/components/projectsmenu/ProjectMenu";

//http://prgssr.ru/development/avtomatizaciya-regressionnogo-testirovaniya-css-2016.html
//todo remove WA with -g (npm install -g backstopjs)
let projects = [{name: "test1", id: 1}, {name: "test2", id: 2}, {name: "test3", id: 3}];
render(
    <ProjectMenu projects={projects}/>,
    document.querySelector("#root")
);
//todo disable animations via stylesheet first
document.getElementsByClassName("ProjectMenu")[0].children[0].click();
