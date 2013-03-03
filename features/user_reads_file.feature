Feature: user reads file

  As an user
  I want to read my file

  Scenario: read file
    Given I have file /file.txt
    When I read file /file.txt
    Then I should see status code 200
    And I should see stats
    And I should see the content of /file.txt

  Scenario: read non-existent file
    Given I don't have any file
    When I read file /file.txt
    Then I should see status code 400
    And I should see errno 34
    And I should see error code ENOENT

  Scenario: stat file
    Given I have file /file.txt
    When I stat file /file.txt
    Then I should see status code 200
    And I should see stats
    And I should not see message-body in response

  Scenario: stat non-existent file
    Given I don't have any file
    When I stat file /file.txt
    Then I should see status code 400
    And I should see errno 34
    And I should see error code ENOENT
