Feature: user uploads file

  As an user
  I want to upload a file

  Scenario: upload file
    Given I don't have any file
    When I upload file /file.txt
    Then I should see status code 201
    And I should have file /file.txt

  Scenario: upload existing file
    Given I have file /file.txt
    When I upload file /file.txt
    Then I should see status code 400
    And I should see errno 47
    And I should see error code EEXIST
    And I should see error message file already exists
