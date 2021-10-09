Feature: Resources page for tablet resolution

As a noggin user
I should be able to see the resources center
So that I can see how noggin might help me

@tablet
Scenario Outline: Validate Resources page for tablet resolution
Given I navigate to the landing page
Then I should see the landing page correctly displayed
When I select menu item "<menu-item>" and drop down item "<drop-down-item>"
  And I filter resources solution by "Emergency Management" and industry by "Industry"

Scenarios:
| menu-item | drop-down-item    |
| Resources | Blog              |
| Resources | Resource Centre   |
| Resources | Events & Webinars |
| Resources | Noggin Newsroom   |