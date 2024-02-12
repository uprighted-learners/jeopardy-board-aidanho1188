<details>
<summary><b>Jeopardy Board Part 1</b></summary>
## Jeopardy Board

Jeopardy! The great American quiz show has been a staple of network television since the 60s. In this project we will be creating our own Jeopardy board which we will build the functionality for in later weeks. For now we're going to focus on site design and navigation.

This site will consist of 4 pages: a landing page, a first round page, a second round page, and a final round page.

## Wireframes

At the following link, you will find a Figma containing the four wireframes necessary for this project.

**[Link to Project Wireframes](https://www.figma.com/file/w9CN0fvM7gqYtKiGYXxvXv/jeopardy-wireframes?node-id=0%3A1)**

## Stories

## The Landing Page

**Given** an `index.html` file exists.

**When** the user visits the `index.html` file.

**Then** they should see the landing page.

**And** there should be a centered title at the top of the page.

**And** a centered image that represents your Jeopardy game.

**And** a "Play" button centered below the image.

**And** a footer displaying site information.

## Navigation to First Round

**Given** the user is on the landing page.

**When** they click the "Play" button.

**Then** they should be routed to the first round page.

## First Round

**Given** the user is on the first round page.

**Then** they should see a title, that indicates it's the first round.

**And** they should see a subtitle that indicates whose turn it is.

**And** a 6X6 grid with category names across the top row, and points from 200 - 1000 below each category, doubling in each row.

**And** the grid should be centered on the page.

**And** they should see a box to enter their input, a Guess button, a Pass button.

**And** they should see the scores of Player 1 and Player 2 displayed.

**And** a button to navigate to the next round.

**And** a footer displaying site information.

## Second Round Navigation

**Given** the user is on the first round page.

**When** they click the button to navigate to the second round page.

**Then** they should be taken to the second round page.

## Second Round Page

**Given** the user is on the second round page.

**Then** they should see a title, that indicates it's the second round.

**And** they should see a subtitle that indicates whose turn it is.

**And** a 6X6 grid with category names across the top row, and points from 400 - 2000 below each category, doubling in each row.

**And** the grid should be centered on the page

**And** they should see a box to enter their input, a Guess button, a Pass button.

**And** they should see the scores of Player 1 and Player 2 displayed.

**And** a button to navigate to the next round.

**And** a footer displaying site information.

## Final Jeopardy Navigation

**Given** the user is on the second round page.

**When** they click the button to the next round.

**Then** they should be taken to the Final Round page.

## Final Round

**Given** the user is on the Final Round page.

**Then** they should see a title indicating it's the Final Round.

**And** a single final category with a single final question.

**And** Two forms:

- One with a field for the amount you want to bet.
- One for the final answer, the button for which should be disabled

## Icebox

- Create your own theme for your site.
- Make the site fully mobile responsive.
- The site should have animated elements. Libraries are allowed.
</details>

<!-- <details> -->
<summary><b>Jeopardy Board Part 2</b></summary>

## Jeopardy Game
In this project, we will be completing the functionality for our Jeopardy / quiz game utilizing what we learned this week!

The game of Jeopardy consists of several players that compete to earn points by selecting questions of varying points values from a board. The board is a 6 X 6 square with each column representing a category, and the first row containing the titles of each category, and every row after being increasingly difficult questions (with correspondingly higher point values) for their categories

You will be given placeholder data for this project in the form of an array of objects.

# Stories
## Ready, Set, Go!
Given the players are on the landing page

When one player clicks the 'Start Game' button

Then the players redirected to the Round 1 page

## Start the Game
Given the players have been redirected to the Round 1 page

When the page loads

Then there is a notification that it is player 1's turn to choose

And the "Guess", "Pass", and "Round 2" buttons are disabled

## Select a Question
Given an empty board, and player 1 is currently up

When player 1 selects a card

Then the score on the card is replaced by a question

And the "Submit Answer" button is enabled

And the "Pass Question" button is enabled

## Pass a Question
Given a question has been chosen

When the user clicks on the "Pass Question" button

Then player 2 gets an opportunity to answer the question

And the notification area changes to player 2's turn

## Answer a Question Correctly
Given a question has been chosen

When the player submits an answer

And the answer is correct

Then the game awards the player the amount of points that were on the card

And the card is blanked out

And the current player does not change

## Answer a Question Incorrectly
Given a question has been chosen

When the player submits an answer

And the answer is incorrect

Then the game subtracts the point total from the player's score

And the other player gets a chance to answer the question

And if no one guesses correctly the original player gets to choose a new question

## Score Board
Given the game has been started

When the score changes

Then the game should display each player's current score on the page

## Only Allow One Question
Given a card has already been selected

When the player tries to pick a new card

Then the question does not change

And the game alerts the player that they must answer, or pass the question

## End Round 1
Given that the score of one user reaches 15,000 points.

Or the board has been cleared

Then the game alerts the players to move on to Round 2.

And the "Round 2" button becomes enabled

And the "Round 2" button navigates to the Round 2 page.

# Hint: You can use query parameters in the URL to pass score information between pages

## Round 2
Given the players are on the Round 2 Page

Then the players scores are the same as they were at the end of Round 1.

And the game logic behaves as Round 1.

And the "Final Round" button is disabled

## End Round 2
Given that the score of one user reaches 30,000 points.

Or the board has been cleared

Then the game alerts the players to move on to the Final Round.

And the "Final Round" button becomes enabled

And the "Final Round" button navigates to the Final Round page.

## Final Round
Given the players are on the Final Round page

Then they should be presented with a category

And prompted to make a wager up to their maximum point total

## Let's Make a Wager!
Given we're on the Final Round page

When all players have made a wager

Then the question is revealed

And all players get a chance to answer the question before the answer is revealed

## Winning the Game
Given all players have answered the final question

When the last answer is submitted

Then the amount wagered is added or subtracted from the total score

And the game should notify the users who won based on the final score

# Icebox
## Say my Name!
Given the the user is on the landing page

When the user clicks "Start Game"

Then the game should allow the user(s) to set their player names

And should use those names throughout the game

## Random Questions
Given a game has been started

When the board is generated

Then the board has questions different from the placeholder data

## Daily Double
Given a game is started

When the board is generated

Then two random questions should be set as the "Daily Double" and are worth twice the amount of points on their cards

## Try to Make Fetch Happen
Given a game is started

When the board is generated

Then the board has questions fetched from an external API
<!-- </details> -->