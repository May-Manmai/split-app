# Split App

No more awkward conversations with your mates. The best way to split costs and track payments.

Website: https://split-app-seixr06.herokuapp.com/

# Test user

username: test
email: test@test.com
password: test1234

Have fun!

## Screenshots

![Split Login](/assets/split-login.png)
![Split Home](/assets/split-home.png)

## Tech Used

-   Bootstrap
-   HTML/CSS
-   Node JS
-   Express JS
-   Postgres

## Vision

We want to simplify the way we split costs and allow users to track payments.
A user can login and view the payment amounts they're required to pay and is owed to them.

The `main user` can create a payment event, which includes a total amount. They can then add additional `users` with percentages attached of how much they will pay, coupled with a due date for the payment. The percentage amounts are stored in association to the `user` to pay.

Usernames are used to assign and attach specific `users` for specific payment events.

Upon login, users can view the breakdown of payment details, such as what specific users owe them and what they owe to specific users/event. Payments also include statuses, which users can update to reflect actual status - e.g. Payment received.

When a `user` logs in that was also a `main user` that created a payment event, they willl see a list of payments pending and list of payments to be made.

## Potential future features

-   Let users rate each other for payment
-   Add a comment for payments
-   User can put in a specific amounts for indviduals in addition to percentages
-   Track confirmation of payment to be paid (i.e. when a user views payments)

## Assumptions:

-   All users already have an account.
-   Users have agreed to the amount to be paid/percentage prior to using the app or creating the payment event.

# User Stories

Types of users:

-   Main User: A user who creates a payment event
-   User: A user who owes money

Every User can be a Main User and vice versa.

1. As a main user,
   I want to be able to create a payment event
   so that I can track payments

2. As a main user,
   I want to be able to track specific payment events using tags
   so that I can track where each payment was initiated

3. As a main user,
   I want to be able to split payments (using percentages) for each user at a payment event
   so that I can track who needs to pay what payment amount

4. As a main user,
   I want to be able to view whether a payment amount has been made
   so that I can confirm/validate that the payment has been made [The main user will need to verify in the app that it has been paid]

5. As a user,
   I want to be able to mark a payment as paid/done
   so that the main user will know that the payment has been made

6. As a main user,
   I want to be able to set a due date for a payment event
   so that I can give the user a guideline about when payment should be received by

7. As a user,
   I want to be able to view all payments that I need to make, is owed to me and payment history
   so that I can track my payments

## Wireframes

#### Desktop

![desktop](/assets/desktop.png)

#### Mobile

![mobile](/assets/mobile.png)

## Entity Relationship Diagram

![erd](/assets/database-ERD.png)

## Approach

This is a group project for GA's SEIX06 with 4 members - Elynn, Karishma, Kyra, May.

We started to breakdown our ideas with the vision and user stories. We then utilised Trello as to breakdown our tasks followed by Figma to plan the basic layout.

When planning for the breakdown of task, we focused on delivering a minimum viable product (MVP) first as seen on our trello board. To complete our project, we used a combination of working strategies such as mobbing, pair programming and splitting up tasks for individual work.

![Trello image](/assets/Trello-screenshot.png)

## Challenges

-   The splitting of tasks equally due to differing abilities of team members. Through stronger communication we talked about what cards everyone would like to work on moving forward.
-   The plan behind the MVP was more complicated and time consuming than what we intially thought. Therefore, we added a 'canned' column to our trello board to ensure our MVP meets its main goals by the due date
-   Working through complicated SQL queries
-   Backend error handling which we tackled

## Credits

[Logo image](https://static.thenounproject.com/png/180195-200.png)
[Coolors](https://coolors.co/c200fb-fc2f00-ec7d10-ffbc0a)
