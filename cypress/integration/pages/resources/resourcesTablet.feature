@resources
Feature: Resources page for tablet resolution

As a noggin user
I should be able to see the resources center
So that I can see how noggin might help me

@tablet
Scenario Outline: Filter Resources page for tablet resolution according to "Emergency Management" and "<industry>"
Given I am on the home page
When I select menu item "<menu-item>" and drop down item "<drop-down-item>"
  And I filter resources solution by "Emergency Management" and industry by "<industry>"
  # And I select resource guide "Guide to AIIMS and CIMS"

Scenarios:
| menu-item | drop-down-item  | industry           |
| Resources | Resource Centre | Default            |
| Resources | Resource Centre | Aviation           |
| Resources | Resource Centre | Education          |
| Resources | Resource Centre | Financial Services |
| Resources | Resource Centre | Government         |
| Resources | Resource Centre | Healthcare         |
| Resources | Resource Centre | Manufacturing      |
| Resources | Resource Centre | Mining             |
| Resources | Resource Centre | Non-Profit         |
| Resources | Resource Centre | Public Safety      |
| Resources | Resource Centre | Retail             |
| Resources | Resource Centre | Transportation     |
| Resources | Resource Centre | Utilities          |
| Resources | Resource Centre | Other              |