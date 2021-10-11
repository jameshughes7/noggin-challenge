/// <reference types="cypress" />

import { BasePage } from '../base/basePage';

const filterResourcesSelectors = '.filter-resources-cm label > .data-selector';
const visibleGuideElements = '.element-item.ngos:visible';
const resourceGuideHeadingContainer = '.heading-container';
const featuredCovidBackgroundUrl = 'url("https://www.noggin.io/hubfs/Website%20Assets%20%5BJuly%202021%5D/Resource%20Images/A%20guide%20to%20developing%20your%20covid-19%20return%20to%20work%20plan.jpg")';
const featuredCovidPCopy = 'After over a year of COVID-19-induced disruptions, businesses who have suffered interruption are understandably ready to go back to normal as part of the business recovery process. And going back to normal, for many, means resuming operations in work facilities vacated due to local, state, and national lockdown orders';

export class Resources extends BasePage {

    validatePageCorrectlyDisplayed(path) {
        resources.validateUrl(path);
        resources.validateHeading();
        resources.validateFeaturedWhitepaper();
    }

    validateHeading() {
        cy.get('@resolution').then(resolution => {
            cy.get('.heading-container').then(headingContainer => {
                cy.wrap(headingContainer).find('h6').should('contain', 'Resources').and('be.visible');
                cy.wrap(headingContainer).find('h1').should('contain', 'Best Practice Guides & Free Downloads').and('be.visible');
                cy.wrap(headingContainer).find('p').should('have.text', "Browse Noggin's library of best-practice thought leadership, case studies, white papers, and more.").and('be.visible');
            })
        })
    }

    validateFeaturedWhitepaper() {
        cy.get('.cm-container').then(featuredWPcontainer => {
            cy.wrap(featuredWPcontainer).find('.span6.left-col').should('have.css', 'background-image', featuredCovidBackgroundUrl).and('be.visible');
            cy.wrap(featuredWPcontainer).find('.tag').should('contain', 'Featured Whitepaper').and('be.visible');
            cy.wrap(featuredWPcontainer).find('h2').should('contain', 'Developing Your COVID-19 Return to Work Plan').and('be.visible');
            cy.wrap(featuredWPcontainer).find('p').should('have.text', featuredCovidPCopy).and('be.visible');
        })
    }

    filterResources(solution, industry) {
        industry === 'Default' ? industry = 'Industry' : industry;
        cy.get(filterResourcesSelectors).eq(0).select(solution);
        cy.get(filterResourcesSelectors).eq(1).select(industry);
    }

    validateFilteredResults(solution, industry) {
        solution = solution.split(" ").join("");
        cy.fixture(`pages/resources/solutions/${solution}/solutionsByIndustry`).then(filteredResources => {
            const filteredResourcesObject = filteredResources[`${industry}`];
            cy.get(visibleGuideElements).then(visibleGuides => {
                cy.wrap(visibleGuides).should('have.length', filteredResourcesObject.length);
                cy.get(visibleGuides).each(($resourceGuide, index) => {
                    this.validateResourceGuide($resourceGuide, filteredResourcesObject[index]);
                })
            })
        })
    }

    validateResourceGuide(resourceGuide, resourcesGuideObject) {
        cy.wrap(resourceGuide).find('.content-heading > h4').then(resourceHeading => {
            cy.wrap(resourceHeading).should('have.text', resourcesGuideObject['content-heading']).and('be.visible');
        })
        cy.wrap(resourceGuide).find('img').invoke('attr', 'src').then(src => {
            const trimmedSrc = src.replaceAll('%20', "");
            expect(trimmedSrc).to.contain(resourcesGuideObject['image']);
        })
        cy.wrap(resourceGuide).find('img').should('be.visible');
    }

    selectResourceGuide(guideName) {
        cy.wrap(guideName).as('guideName');
        cy.get(visibleGuideElements).each(($guideElement => {
            cy.wrap($guideElement).find('h4').then(h4 => {
                const h4Text = h4.text();
                if (h4Text.trim() === guideName) {
                    cy.wrap($guideElement).find('a').then(guideElementLink => {
                        // TODO: an option is to use Puppeteer here to perform the task of 'switchTab' and validating the new tab
                        // cy.task('switchTab', (guideElementLink));
                        cy.wrap(guideElementLink).invoke('removeAttr', 'target').click()
                    })
                }
            })
        }))
    }

    validateResourceGuidePage(guideName) {
        cy.get(resourceGuideHeadingContainer).find('h1').then(h1 => {
            cy.trimText(h1).should($e1 => expect($e1).to.eq(guideName));
        })
        this.validateBestPracticeGuide(guideName);
        this.validateFormContainer(guideName);
    }

    validateBestPracticeGuide(guideName) {
        cy.get('.content-container').then(contentContainer => {
            cy.wrap(contentContainer).find('h6').then(h6 =>{
                cy.trimText(h6).should($e1 => expect($e1).eq('Best Practice Guide'));
            })
            cy.wrap(contentContainer).find('h3').then(h3 => {
                cy.trimText(h3).should($e1 => expect($e1).eq('Introducing CIMS (Coordinated Incident Management System)'));
            })
        })
    }

    validateFormContainer(guideName) {
        cy.get('.form-container').then(formContainer => {
            cy.wrap(formContainer).find('h3').then(h3 => {
                cy.trimText(h3).should($e1 => expect($e1).eq('Download the Free Guide'));
            })
        })
    }
    
}

export const resources = new Resources();