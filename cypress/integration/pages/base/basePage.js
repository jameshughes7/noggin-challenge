/// <reference types="cypress" />

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

    validateUrl(page) {
        cy.url().then(url => {
            cy.wrap(url).should('contain', page);
        })
    }

    acceptCookies() {
        cy.get('#hs-eu-cookie-confirmation-button-group > a').eq(1).click();
    }

    validatePageisCorrectFromDropDown() {
        cy.get('@resourcesPath').then(path => {
            this.validateUrl(path);
        })
    }

}

export const basePage = new BasePage();