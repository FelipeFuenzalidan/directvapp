@LoginTest
Feature: Login Test

    Login Test for prepaid and postpaid users

    Scenario Outline: Login test with wrong password for the prepaid and postpaid user
        When I login the "<username>" and "<password>" for the "<typeUser>" user
        Then I verify that the message is displayed

        Examples:
            | username          | password | typeUser |
            | posact1@gmail.com | password | postpaid |
            | preact2@gmail.com | password | prepaid  |

    Scenario Outline: Login test for prepaid and postpaid user
        When I login the "<username>" and "<password>" for the "<typeUser>" user
        Then I verify the login is successful

        Examples:
            | username          | password | typeUser |
            | posact1@gmail.com | posact1  | postpaid |
            | preact2@gmail.com | preact   | prepaid  |
