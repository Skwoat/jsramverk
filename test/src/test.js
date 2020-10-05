/**
 * Test for getting started with Selenium.
 */
"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const By = webdriver.By;

let browser;

test.describe("My-App", function() {
    test.beforeEach(async function(done) {
        await this.timeout(200000);
        browser = await new webdriver.Builder().
            withCapabilities(webdriver.Capabilities.firefox()).build();

        await browser.get("http://localhost:8082/");
        await done();
    });

    test.afterEach(async function(done) {
        await browser.quit();
        await done();
    });


    async function goToNavLink(target) {
        await browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

   async function matchUrl(target) {
        await browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith("localhost:8082/" + target));
        });
    }

    async function assertH2(target) {
        await browser.findElement(By.css("h2")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    test.it("Test go to Login", async function(done) {
        goToNavLink("Login");

        assertH2("Login");
        matchUrl("login" );

        await done();
    });

    test.it("Test go to Register", async function(done) {
        goToNavLink("Register");

        assertH2("Register");
        matchUrl("register" );

        await done();
    });

    test.it("Test go to Me", async function(done) {
        goToNavLink("Me");

        assertH2("Om mig");
        matchUrl("");

        await done();
    });
});
