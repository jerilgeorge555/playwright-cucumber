Feature: Verify Login Functionality

  @smoke @login
  Scenario Outline: Verify Login
    Given the user is on Login Page
    When the user logs in using "<username>" and "<password>"
    Then the user should be navigated to Secure Area Page

    Examples:
      | username | password             |
      | tomsmith | SuperSecretPassword! |

  @regression @login
  Scenario Outline: Verify Invalid Login
    Given the user is on Login Page
    When the user logs in using "<username>" and "<password>"
    Then the user should see the error message "<errorMessage>"

    Examples:
      | username | password  | errorMessage              |
      | jeril    | password! | Your username is invalid! |
      | tomsmith   | password! | Your password is invalid! |
