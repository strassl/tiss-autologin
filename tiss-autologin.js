// ==UserScript==
// @name         TISS Autologin
// @namespace    https://sigmoid.at
// @version      1.0
// @description  Automatically performs a login to TISS
// @author       Simon Strassl
// @match        https://iu.zid.tuwien.ac.at/AuthServ.authenticate*
// @match        https://tiss.tuwien.ac.at/*
// @match        https://tuwel.tuwien.ac.at/*
// @grant        none
// ==/UserScript==

var NAME = null;
var PASSWORD = null;

(function() {
    'use strict';
    if (location.hostname == 'iu.zid.tuwien.ac.at') {
        attemptZidLogin();
    } else if (location.hostname == 'tiss.tuwien.ac.at') {
        attemptTISSLogin();
    } else if (location.hostname == 'tuwel.tuwien.ac.at') {
        attemptTuwelLogin();
    } else {
        console.log('Unknown hostname, how did we get here?');
    }
})();

function attemptTuwelLogin() {
    var form = document.querySelector('form#zid_login');

    if (form !== null) {
        console.log('Found login button, logging in');
        form.submit();
    } else {
        console.log('No login button found, assuming already logged in');
    }
}

function attemptTISSLogin() {
    // First check if we are at the login page
    if (location.pathname == '/admin/authentifizierung') {
        console.log('At TISS authentication page - checking for login link');
        var loginLink = document.querySelector('a.anmelden');
        if (loginLink !== null) {
            console.log('Login link found, we are done here');
            loginLink.click();
            return;
        } else {
            console.log('No login link found');
        }
    }
    // Only if it's not: Check if the button is present
    var loginButton = document.querySelector('.toolLogin');
    if (loginButton !== null) {
        console.log('Found login button, logging in');
        loginButton.click();
    } else {
        console.log('No login button found, assuming already logged in');
    }
}

function attemptZidLogin() {
    var form = document.querySelector('form');

    if (form !== null) {
        console.log('Filling form');
        var name = document.querySelector('input[name="name"]');
        var password = document.querySelector('input[type=password]');
        name.value = NAME;
        password.value = PASSWORD;
        console.log('Submitting form');
        form.submit();
    } else {
        console.log('Couldn\'t find form to submit');
    }
}
