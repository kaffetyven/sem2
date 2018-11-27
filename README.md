# sem2
You will be building an online board game for Game of Thrones using the following API: https://anapioficeandfire.com/. The board game will be made using HTML, CSS and JavaScript. 

The board game will have three main pages:

The character select page
The first page the user should arrive to is a page to select their character. Use the API above to create 10 characters from Game of Thrones that the user can choose from. They should show up in cards displaying all relevant information about that character on this page.

The user should only be able to select two characters. Once the characters have been selected, the chosen characters should move to the board where they will be represented by a token or icon on the board.

This page should be responsive.

The board game page
This page does not have to be responsive.

You are going to mimic a board game here. Each of the characters that were chosen from the previous page will be used on this page as a token. You will need to create dice which can be rolled, and will only produce a number between 1 and 6. Whatever number the user rolls on the dice, their token will advance the number shown on the dice. This will obviously have to be automated. From the start to the end there should be 30 tiles for the tokens to move on.

To make the game interesting, you’ll need to add a few traps to slow users down. For example, if a user lands on tile 15 there could be a trap saying “Deanerys’s Dragons have blocked the road ahead go back three spaces”. The bead or token should then move back three spaces.

Make this game as interactive as possible. There should be a minimum of 5 traps on the board. You can choose the traps and the penalties they make.

When a six is rolled on the dice the system should know that the same player will get another turn. The application should also swap out turns between each token depending on whose turn it is to roll the dice.

The finale page
A bead or token will eventually need to reach the end of the game. When the token wins the game, you are going to have a finale page where you will congratulate the user that has won. This page needs to be aesthetically pleasing. It would be nice if you could do some JavaScript animations on this page to make it interactive. Use your imagination here.
