import Request from "../src/services/request.service";
import Ajax from "jasmine-ajax"; //instead of https://www.npmjs.com/package/karma-jasmine-ajax because there are problems with version mess.

describe("Test request", function() {
    beforeEach(function() {
        jasmine.Ajax.install();
    });

    afterEach(function() {
        jasmine.Ajax.uninstall();
    });

    it("add url prefix", function() {
        const request = new Request("GET", "/test");
        Request.setApplicationProps({urlPrefix: "http://domain"});
        request.send(true); //disable default alert on error
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('http://domain/test');
    });
});





