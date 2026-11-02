Feature: API Authentication

  Background:
    Given the API user is authenticated

  @api @smoke
  Scenario: Verify authenticated user details
    When the user requests their authenticated profile
    Then the API response status should be 200
    And the authenticated username should be "emilys"
    And the authenticated email should be "emily.johnson@x.dummyjson.com"
    And the authenticated first name should be "Emily"

  @api @smoke
  Scenario: Verify authenticated user ID
    When the user requests their authenticated profile
    Then the API response status should be 200
    And the authenticated user ID should be 1