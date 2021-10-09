/// <reference types="cypress" />

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { resources } from './resources';

When('I filter resources solution by {string} and industry by {string}', (solution, industry) => {
    cy.get('@resourcesPath').then(path => {
        if (path === 'resources') {
            resources.filterResources(solution, industry);
            resources.validateFilteredResults(solution, industry);
        }
    })
})

When('I select resource guide {string}', (guideName) => {
    cy.get('@resourcesPath').then(path => {
      if (path === 'resources') resources.selectResourceGuide(guideName);
    })
})

Then('I should see the resources page correctly displayed', () => {
    resources.validateUrl('resources');
})


