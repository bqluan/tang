Feature: user uploads file

  As an user
  I want to upload a file

  Scenario: upload file
    Given I don't have any file
    When I upload file /file.txt
    Then I should see status code 201
    And I should have file /file.txt
