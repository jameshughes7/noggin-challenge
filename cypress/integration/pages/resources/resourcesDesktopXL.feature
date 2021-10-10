@resources
Feature: Resources page for desktopXL resolution

As a noggin user
I should be able to see the resources center
So that I can see how noggin might help me

@desktopXL
Scenario Outline: Filter Resources page for desktopXL resolution according to "Emergency Management" and "<industry>"
Given I am on the home page
When I select menu item "<menu-item>" and drop down item "<drop-down-item>"
  And I filter resources solution by "Emergency Management" and industry by "<industry>"
  # And I select resource guide "Guide to AIIMS and CIMS"

Scenarios:
| menu-item | drop-down-item  | industry           |
| Resources | Resource Center | Default            |
| Resources | Resource Center | Aviation           |
| Resources | Resource Center | Education          |
| Resources | Resource Center | Financial Services |
| Resources | Resource Center | Government         |
| Resources | Resource Center | Healthcare         |
| Resources | Resource Center | Manufacturing      |
| Resources | Resource Center | Mining             |
| Resources | Resource Center | Non-Profit         |
| Resources | Resource Center | Public Safety      |
| Resources | Resource Center | Retail             |
| Resources | Resource Center | Transportation     |
| Resources | Resource Center | Utilities          |
| Resources | Resource Center | Other              |