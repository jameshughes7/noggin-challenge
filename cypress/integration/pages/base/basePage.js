/// <reference types="cypress" />

const cookiesButtons = '#hs-eu-cookie-confirmation-button-group > a';

export class BasePage {

    setResolution(resolution) {
        if (resolution === 'desktopXL'){
            this.setViewPort([1920, 1080]);
            cy.log(`Set viewport to resolution: **${[1920,1080]}**`)
        } else {
            this.setViewPort(resolution);
            cy.log(`Set viewport to resolution: **${resolution}**`)
        }
    }

    setViewPort(size) {
        if (Cypress._.isArray(size)) {
            cy.viewport(size[0], size[1]);
        } else {
            cy.viewport(size);
        }
    }

    acceptCookies() {
        cy.get(cookiesButtons).eq(1).click();
    }

    validateUrl(path) {
        cy.url().then(url => {
            cy.wrap(url).should('contain', path);
        })
    }

}

export const basePage = new BasePage();