import { BasePage } from '../base/basePage';

const menuListItems = '.menu-container .hs-menu-wrapper li';
const header = '.header-main-container';
const mobileMenuTrigger = '.cd-dropdown-trigger.mobile-trigger';
const mobileMenuItemLinks = '.cd-dropdown-content > li > a';
const mobileDropDownLinks = '.cd-dropdown-gallery.is-active > .inner-content > a';

export class HomePage extends BasePage {

    hoverOverMenuItem(menuItem) {
        cy.log(`menuItem: ${menuItem}`);
        cy.get(menuListItems).each(($listItem) => {
            cy.wrap($listItem).find('a').then(link => {
                const listItemText = link.text();
                cy.log(`listItemText: ${listItemText}`);
                if (listItemText === menuItem) {
                    cy.wrap($listItem).realHover();
                }
            })
        })
    }

    clickOnMobileMenuTrigger() {
        cy.get(mobileMenuTrigger).click();
    }

    selectDropDownMenuItem(menuItem, dropDownItem) {
        cy.log(`menuItem: ${menuItem}, dropDownItem: ${dropDownItem}`);
        let menuItemIndex = 0;
        if (menuItem === 'Products') {
            menuItemIndex;
        } else if (menuItem === 'Solutions') {
            menuItemIndex = 1;
        } else if (menuItem === 'Resources') { 
            menuItemIndex = 2;
        } else if (menuItem === 'About') {
            menuItemIndex = 3;
        } else {
            cy.log('Currently there are no other menuItems implemented');
        }
        cy.get('.mega-menu-popout-container').eq(menuItemIndex).then(popoutContainer => {
            if (menuItem === 'Resources' || menuItem === 'About') {
                cy.wrap(popoutContainer).find('[role="menu"] a').each(($popoutListItemLink => {
                    const listItemText = $popoutListItemLink.text();
                    cy.log(`listItemText: ${listItemText}`)
                    if (listItemText === dropDownItem) {
                        cy.wrap($popoutListItemLink).invoke('attr', 'href').then(href => {
                            const resourcesPath  = href.split('/').pop().split('-').pop();
                            cy.wrap(resourcesPath).as('resourcesPath');
                        })
                        cy.wrap($popoutListItemLink).click();
                    }
                }))
            } else if (menuItem === 'Products') {
                cy.wrap(popoutContainer).find('.content-wrapper .hs_cos_wrapper h5').each(($popoutListItemLink => {
                    const listItemText = $popoutListItemLink.text();
                    cy.log(`listItemText: ${listItemText}`)
                    if (listItemText === dropDownItem) cy.wrap($popoutListItemLink).click();
                }))
            } else if (menuItem === 'Solutions') {
                // TODO: implementation for this menuItem wip
            }
        })
    }

    selectMobileMenuItem (menuItem) {
        cy.get(mobileMenuItemLinks).each(($menuItemLink => {
            const menuItemText = $menuItemLink.text();
            if (menuItemText === menuItem) cy.wrap($menuItemLink).click();
        }))
    }

    selectMobileDropDownItem(dropDownItem) {
        cy.log(`dropDownItem: ${dropDownItem}`);
        cy.get(mobileDropDownLinks).each(($mobileDropDownLink) => {
            const dropDownLinkText = $mobileDropDownLink.text();
            if (dropDownLinkText.trim() === dropDownItem) {
                cy.wrap($mobileDropDownLink).then(dropDownLink => {
                    cy.wrap(dropDownLink).invoke('attr', 'href').then(href => {
                        const resourcesPath  = href.split('/').pop().split('-').pop();
                        cy.wrap(resourcesPath).as('resourcesPath');
                        cy.wrap(dropDownLink).click();
                    })
                })
            }
        })
    }

    validateHeader() {
        this.validateUrl('');
        cy.get(header).then(header => {
            this.validateLogo(header);
        })
    }

    validateLogo(header) {
        cy.wrap(header).find('.logo').then(logo => {
            cy.wrap(logo).find('a').should('have.attr', 'href', 'https://www.noggin.io/');
            cy.wrap(logo).find('img').invoke('attr', 'src').should('contain', 'Noggin%20Logo.svg');
        })
    }

}

export const homePage = new HomePage();