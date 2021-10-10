/// <reference types="cypress" />

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { homePage } from './homePage';

Given('I am on the home page', () => {
    cy.visit('');
    homePage.acceptCookies();
    homePage.validateHeader();
})

When('I select menu item {string} and drop down item {string}', (menuItem, dropDownItem) => {
    cy.get('@resolution').then(resolution => {
        if (resolution === 'mobile' || resolution === 'tablet') {
            homePage.clickOnMobileMenuTrigger();
            homePage.selectMobileMenuItem(menuItem);
            homePage.selectMobileDropDownItem(dropDownItem);
        } else {
            homePage.hoverOverMenuItem(menuItem);
            homePage.selectDropDownMenuItem(menuItem, dropDownItem);
        }
    })
})
