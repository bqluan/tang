Feature: user creates directory

  As an user
  I want to create a directory

  Scenario: create directory
    Given I don't have any file
    When I create directory /dir1
    Then I should see status code 201
    And I should have directory /dir1
