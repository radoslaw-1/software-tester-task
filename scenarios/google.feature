Feature: Searching for the word "prowly" on google.com, filtered by date.

  Scenario: Verify the "Past hour" date filter
    Given I am on the Google homepage
    When I search for "prowly"
    And I set the date filter to "Past hour"
    Then returned results should be relevant to "prowly"
    And the results' returned timestamps should not be older than one hour
  
  Scenario Outline: Verify the "Custom range..." date filter
    Given I am on the Google homepage
    When I search for "prowly"
    And I set the custom date from "<From>" to "<To>"
    Then returned results should be relevant to "prowly"
    And the results' returned timestamps should be between "<From>" and "<To>"

    Examples:
      | From      | To          |
      | 1/1/2024  | 12/31/2024  |
      | 1/1/2025  | 1/30/2025   |
      | 1/2/2022  | 2/3/2024    |
  
  Scenario: Verify the "Past year" date filter
    Given I am on the Google homepage
    When I search for "prowly"
    And I set the date filter to "Past year"
    Then returned results should be relevant to "prowly"
    And the results' returned timestamps should not be older than one year from today
