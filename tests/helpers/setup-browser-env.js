const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM('<body></body>');
global.window = window;