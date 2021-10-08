Feature: Resources page for desktopXL resolution

As a noggin user
I should be able to see the resources center
So that I can see how noggin might help me

@desktopXL
Scenario Outline: Validate Resources page for desktopXL resolution
Given I navigate to the landing page
Then I should see the landing page correctly displayed
When I select menu item "<menu-item>" and drop down item "<drop-down-item>"
  And I filter resources solution by "Emergency Management" and industry by "Industry"

Scenarios:
| menu-item | drop-down-item    |
| Resources | Blog              |
| Resources | Resource Center   |
| Resources | Events & Webinars |
| Resources | Noggin Newsroom   |