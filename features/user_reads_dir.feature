Feature: user reads directory

  In order to list files in a directory
  As an user
  I want to read a directory

  Scenario: read empty directory
    Given I don't have any file
    When I read directory /
    Then I should see status code 200
    And I should see content type json
    And I should see stats
    And I should see []

  Scenario: read directory
    Given I have file /file.txt
    When I read directory /
    Then I should see status code 200
    And I should see content type json
    And I should see stats
    And I should see [file.txt]

  Scenario: read non-existent directory
    Given I don't have any file
    When I read directory /nosuch
    Then I should see status code 400
    And I should see errno 34
    And I should see error code ENOENT
