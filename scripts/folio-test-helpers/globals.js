// import "jsdom-global/register";

require("chai/register-expect");

// global.expect = expect;

const { mount, shallow } = require("enzyme");

global.mount = mount;
global.shallow = shallow;

global.sinon = require("sinon-sandbox");
