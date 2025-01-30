Feature: Searching for the word "semrush" on bing.com, filtered by content category (everything, video, news, etc.).

  Scenario: Verify the first result in the default search
    Given I am on the Bing homepage
    When I search for "semrush"
    Then the first result should contain "semrush.com"
  
  Scenario Outline: Verify the "<Category>" filter
    Given I am on the Bing homepage
    When I search for "semrush"
    And I navigate to the "<Category>" tab
    Then returned results should be relevant to "semrush"

    Examples:
      | Category  |
      | Images    |
      | Videos    |
      | News      |
  
  Scenario Outline: Verify the "<Date Filter>" filter in the "News" tab
    Given I am on the Bing homepage
    When I search for "semrush"
    And I navigate to the "News" tab
    And I select the "<Date Filter>" date filter
    Then returned results should be relevant to "semrush"
    And the dates of results should not be older than "<Date Filter>"

    Examples:
      | Date Filter   |
      | Past hour     |
      | Past 24 hours |
      | Past 7 days   |
      | Past 30 days  |
