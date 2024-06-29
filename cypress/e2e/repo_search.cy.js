describe('Repository Search', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should display repositories of the current user if the search field is empty', () => {
        cy.get('ul').within(() => {
            cy.get('li').should('have.length.gt', 0);
        });
    });

    it('should allow the user to search for repositories', () => {
        const searchQuery = 'react';

        cy.get('input[type="text"]').type(searchQuery).should('have.value', searchQuery);
        cy.get('ul').within(() => {
            cy.get('li').should('have.length.gt', 0);
            cy.get('li').first().contains(searchQuery);
        });
    });

    it('should allow pagination', () => {
        cy.get('button').contains('2').click();
        cy.get('ul').within(() => {
            cy.get('li').should('have.length.gt', 0);
        });
    });

    it('should navigate to the repository details page when a repo link is clicked', () => {
        cy.get('ul').within(() => {
            cy.get('li').first().within(() => {
                cy.get('a').first().click();
            });
        });
        cy.url().should('include', '/repository/');
    });
});
