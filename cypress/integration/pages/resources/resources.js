/// <reference types="cypress" />

import { BasePage } from '../base/basePage';

const filterResourcesSelectors = '.filter-resources-cm label > .data-selector';
const visibleGuideElements = '.element-item.ngos:visible';
const resourceGuideHeadingContainer = '.heading-container';

export class Resources extends BasePage {

    filterResources(solution, industry) {
        cy.get(filterResourcesSelectors).eq(0).select(solution);
        cy.get(filterResourcesSelectors).eq(1).select(industry);
    }

    validateFilteredResults(solution, industry) {
        cy.get(visibleGuideElements).should('have.length', 8);
    }

    selectResourceGuide(guideName) {
        cy.get(visibleGuideElements).each(($guideElement => {
            cy.wrap($guideElement).find('h4').then(h4 => {
                const h4Text = h4.text();
                if (h4Text.trim() === guideName) {
                    cy.wrap($guideElement).find('a').then(guideElementLink => {
                        cy.task('switchTab', (guideElementLink));
                    })
                }
            })
        }))
        this.validateResourceGuidePage(guideName);
    }

    validateResourceGuidePage(guideName) {
        cy.get(resourceGuideHeadingContainer).find('h1').should('have.text', guideName).and('be.visible');
        // cy.get(resourceGuideHeadingContainer).find('h1').then(h1 => {
        //     const trimmedH1 = cy.wrap(h1).text().trim();
        //     expect(trimmedH1).to.eq(guideName);
        //     cy.wrap(h1).should('be.visible');
        // })
    }
    
}

export const resources = new Resources();

