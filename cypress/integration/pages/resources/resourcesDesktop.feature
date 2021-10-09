Feature: Resources page for desktop resolution

As a noggin user
I should be able to see the resources center
So that I can see how noggin might help me

@desktop
Scenario Outline: Validate Resources page for desktop resolution
Given I navigate to the landing page
Then I should see the landing page correctly displayed
When I select menu item "<menu-item>" and drop down item "<drop-down-item>"
  And I filter resources solution by "Emergency Management" and industry by "Industry"
  And I select resource guide "Guide to AIIMS and CIMS"

Scenarios:
| menu-item | drop-down-item    |
# | Resources | Blog              |
| Resources | Resource Center   |
# | Resources | Events & Webinars |
# | Resources | Noggin Newsroom   |