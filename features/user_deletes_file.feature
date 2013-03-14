Feature: user deletes file

  As an user
  I want to delete a file

  Scenario: delete file
    Given I have file /file.txt
    When I delete file /file.txt
    Then I should see status code 200
    And I should not have file /file.txt

  Scenario: delete non-existent file
    Given I don't have any file
    When I delete file /file.txt
    Then I should see status code 400
    And I should see errno 34
    And I should see error code ENOENT
