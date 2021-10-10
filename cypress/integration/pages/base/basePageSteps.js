/// <reference types="cypress" />

import { Before, Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { basePage } from './basePage';

Before({ tags: '@desktopXL' }, () => {
    basePage.setResolution('desktopXL');
    cy.wrap('desktopXL').as('resolution');
})

Before({ tags: '@desktop' }, () => {
    basePage.setResolution('macbook-13');
    cy.wrap('dekstop').as('resolution');
})

Before({ tags: '@tablet' }, () => {
    basePage.setResolution('ipad-2');
    cy.wrap('tablet').as('resolution');
})

Before({ tags: '@mobile' }, () => {
    basePage.setResolution('iphone-5');
    cy.wrap('mobile').as('resolution');
})