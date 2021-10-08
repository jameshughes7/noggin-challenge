/// <reference types="cypress" />

import { BasePage } from '../base/basePage';

const filterResourcesSelectors = '.filter-resources-cm label > .data-selector'

export class Resources extends BasePage {

    filterResources(solution, industry) {
        cy.get(filterResourcesSelectors).eq(0).select(solution);
        cy.get(filterResourcesSelectors).eq(1).select(industry);
    }

    validateFilteredResults(solution, industry) {
        cy.get('.element-item.ngos:visible').should('have.length', 8);
    }
    
}

export const resources = new Resources();

