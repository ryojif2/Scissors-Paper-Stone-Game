var rollDice = function () {
  // Generate a decimal from 0 through 2, inclusive of 0 and exclusive of 3.
  var randomDecimal = Math.random() * 3;

  // Remove the decimal with the floor operation.
  // This will be an integer from 0 to 2 inclusive.
  var randomInteger = Math.floor(randomDecimal);

  // Add 1 to get valid dice rolls of 1 through 3 inclusive.
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

//Create function to convert dice number into signs, to identify what the computer chose.
var diceNumberToSign = function (input) {
  var outputSign = "invalid number";

  if (input == 3) {
    outputSign = "scissors";
  }
  if (input == 2) {
    outputSign = "paper";
  }
  if (input == 1) {
    outputSign = "stone";
  }

  return outputSign;
};

//Create function to add emoji to signs.
var emojiToSigns = function (input) {
  var emojiwithSign = "";
  if (input == "scissors") {
    emojiwithSign = "scissors \u2702\uFE0F";
  } else if (input == "paper") {
    emojiwithSign = "paper \uD83D\uDCC3";
  } else if (input == "stone") {
    emojiwithSign = "stone \uD83E\uDEA8";
  }
  return emojiwithSign;
};

//Creating global variables for win-loss-draw record.
var playerWin = 0;
var computerWin = 0;
var drawNo = 0;

//Creating global variable username.
var playerUsername = "";

//Creating global variable game mode.
var currentGameMode = "waiting for user name";

//Creating global variable for previous winner for Mukjjippa game.
var previousWinner = "";

//Create SPS game logic
var playSPSGame = function (playerUsername, playerGuess) {
  //Define result of game.
  var resultOfGame = "";

  // Check if player wants to return to choose game mode again. If yes, reset W/L/D counters, return to choose game mode state. If no, to check if player input of SPS is valid.
  if (playerGuess == "return") {
    currentGameMode = "waiting for player to choose game mode";
    playerWin = 0;
    computerWin = 0;
    drawNo = 0;
    return `Returning to previous menu. <br> <br> Please enter "normal" to enter normal game mode OR "reverse" to enter reverse game mode OR "mukjjippa" to enter Muk-jji-ppa game mode, OR "word" to enter secret word game. <br> <br> OR <br> <br> If you want to register a different username, please enter "return".`;
  }

  //Check if player input is valid or not. If not valid, not to run the game. Instead, ask player to enter valid option.
  if (
    playerGuess != "scissors" &&
    playerGuess != "paper" &&
    playerGuess != "stone"
  ) {
    return `Please enter a valid option (i.e. scissors/paper/stone) and try again.`;
  }

  //Relate the two functions of rolling dice and assigning rolled number to sign together.
  var computerNumber = rollDice();
  var computerSign = diceNumberToSign(computerNumber);

  //Relate emojis to the input SPS and computer rolled SPS.
  var computerSignWithEmoji = emojiToSigns(computerSign);
  var playerSignWithEmoji = emojiToSigns(playerGuess);

  //Create rule for draw.
  if (playerGuess == computerSign) {
    drawNo = drawNo + 1;
    resultOfGame = `${playerUsername} draws, try again. <br> Your W/L/D record is ${playerWin}/${computerWin}/${drawNo}.`;
    return resultOfGame;
  }

  //Create rule for winning.
  if (
    (playerGuess == "scissors" && computerSign == "paper") ||
    (playerGuess == "stone" && computerSign == "scissors") ||
    (playerGuess == "paper" && computerSign == "stone")
  ) {
    playerWin = playerWin + 1;
    resultOfGame = `${playerUsername} wins. <br> You chose ${playerSignWithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Your W/L/D record is ${playerWin}/${computerWin}/${drawNo}.`;
    return resultOfGame;
  }

  //Default result is loss.
  computerWin = computerWin + 1;
  resultOfGame = `${playerUsername} loses. <br> You chose ${playerSignWithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Your W/L/D record is ${playerWin}/${computerWin}/${drawNo}.`;

  return resultOfGame;
};

//Create Mukjjippa game logic
var playKoreanSPSGame = function (playerUsername, playerGuess) {
  //Define result of game.
  var resultOfGame = "";

  // Check if player wants to return to choose game mode again. If yes, reset previous winner counter, reset player/computer wins, return to choose game mode state. If no, to check if player input of SPS is valid.
  if (playerGuess == "return") {
    currentGameMode = "waiting for player to choose game mode";
    playerWin = 0;
    computerWin = 0;
    previousWinner = "";
    return `Returning to previous menu. <br> <br> Please enter "normal" to enter normal game mode OR "reverse" to enter reverse game mode OR "mukjjippa" to enter Muk-jji-ppa game mode OR "comvscom" to enter the Com vs Com game mode, OR "word" to enter secret word game. <br> <br> OR <br> <br> If you want to register a different username, please enter "return".`;
  }

  //Check if player input is valid or not. If not valid, not to run the game. Instead, ask player to enter valid option.
  if (
    playerGuess != "scissors" &&
    playerGuess != "paper" &&
    playerGuess != "stone"
  ) {
    return `Please enter a valid option (i.e. scissors/paper/stone) and try again.`;
  }

  //Relate the two functions of rolling dice and assigning rolled number to sign together.
  var computerNumber = rollDice();
  var computerSign = diceNumberToSign(computerNumber);

  //Relate emojis to the input SPS and computer rolled SPS.
  var computerSignWithEmoji = emojiToSigns(computerSign);
  var playerSignWithEmoji = emojiToSigns(playerGuess);

  //Create rule for winning.
  if (
    (playerGuess == "scissors" && computerSign == "paper") ||
    (playerGuess == "stone" && computerSign == "scissors") ||
    (playerGuess == "paper" && computerSign == "stone")
  ) {
    previousWinner = "player";
    resultOfGame = `${playerUsername} wins the first round. <br> You chose ${playerSignWithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Please choose again to determine the final winner!`;
    return resultOfGame;
  }
  //Create rule for draw.
  if (playerGuess == computerSign) {
    if (previousWinner == "computer") {
      computerWin = computerWin + 1;
      resultOfGame = `${playerUsername} loses. <br> You chose ${playerSignWithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Your overall W/L record is ${playerWin}/${computerWin}.`;
      previousWinner = "";
    } else if (previousWinner == "player") {
      playerWin = playerWin + 1;
      resultOfGame = `${playerUsername} wins! <br> You chose ${playerSignWithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Congrats!! Your overall W/L record is ${playerWin}/${computerWin}.`;
      previousWinner = "";
    } else
      resultOfGame = `As there is no winner in the previous round, the game continues. Please continue.`;
    return resultOfGame;
  }

  //Default is loss.
  previousWinner = "computer";
  resultOfGame = `${playerUsername} loses the first round. <br> You chose ${playerSignWithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Please choose again to determine the final winner!`;
  return resultOfGame;
};

//Create ComvVSCom game logic
var playComGame = function (playerUsername, input) {
  //Define result of game.
  var resultOfGame = "";

  // Check if player wants to return to choose game mode again. If yes, reset W/L/D counters, return to choose game mode state. If no, to check if player input of SPS is valid.
  if (input == "return") {
    currentGameMode = "waiting for player to choose game mode";
    playerWin = 0;
    computerWin = 0;
    drawNo = 0;
    return `Returning to previous menu. <br> <br> Please enter "normal" to enter normal game mode OR "reverse" to enter reverse game mode OR "mukjjippa" to enter Muk-jji-ppa game mode OR "comvscom" to enter the Com vs Com game mode, OR "word" to enter secret word game. <br> <br> OR <br> <br> If you want to register a different username, please enter "return".`;
  }

  //Relate the two functions of rolling dice and assigning rolled number to sign together, for both dice 1 and dice 2.
  var computerNumber = rollDice();
  var computerSign = diceNumberToSign(computerNumber);
  var computerNumber2 = rollDice();
  var computerSign2 = diceNumberToSign(computerNumber2);

  //Relate emojis to the computer rolled SPS (dice 1 and 2).
  var computerSignWithEmoji = emojiToSigns(computerSign);
  var computerSign2WithEmoji = emojiToSigns(computerSign2);

  //Create rule for draw.
  if (computerSign2 == computerSign) {
    drawNo = drawNo + 1;
    resultOfGame = `${playerUsername} draws. <br> You chose ${computerSign2WithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Your W/L/D record is ${playerWin}/${computerWin}/${drawNo}.`;
    return resultOfGame;
  }

  //Create rule for winning.
  if (
    (computerSign2 == "scissors" && computerSign == "paper") ||
    (computerSign2 == "stone" && computerSign == "scissors") ||
    (computerSign2 == "paper" && computerSign == "stone")
  ) {
    playerWin = playerWin + 1;
    resultOfGame = `${playerUsername} wins. <br> You chose ${computerSign2WithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Your W/L/D record is ${playerWin}/${computerWin}/${drawNo}.`;
    return resultOfGame;
  }

  //Default result is loss.
  computerWin = computerWin + 1;
  resultOfGame = `${playerUsername} loses. <br> You chose ${computerSign2WithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Your W/L/D record is ${playerWin}/${computerWin}/${drawNo}.`;

  return resultOfGame;
};

//Create Reverse SPS Game logic
var playReverseSPSGame = function (playerUsername, playerGuess) {
  //Define result of game.
  var resultOfGame = "";

  // Check if player wants to return to choose game mode again. If yes, reset W/L/D counters, return to choose game mode state. If no, to check if player input of SPS is valid.
  if (playerGuess == "return") {
    currentGameMode = "waiting for player to choose game mode";
    playerWin = 0;
    computerWin = 0;
    drawNo = 0;
    return `Returning to previous menu. <br> <br> Please enter "normal" to enter normal game mode OR "reverse" to enter reverse game mode OR "mukjjippa" to enter Muk-jji-ppa game mode OR "comvscom" to enter the Com vs Com game mode, OR "word" to enter secret word game. <br> <br> OR <br> <br> If you want to register a different username, please enter "return".`;
  }

  //Check if player input is valid or not. If not valid, not to run the game. Instead, ask player to enter valid option.
  if (
    playerGuess != "scissors" &&
    playerGuess != "paper" &&
    playerGuess != "stone"
  ) {
    return `Please enter a valid option (i.e. scissors/paper/stone) and try again.`;
  }

  //Relate the two functions of rolling dice and assigning rolled number to sign together.
  var computerNumber = rollDice();
  var computerSign = diceNumberToSign(computerNumber);

  //Relate emojis to the input SPS and computer rolled SPS.
  var computerSignWithEmoji = emojiToSigns(computerSign);
  var playerSignWithEmoji = emojiToSigns(playerGuess);

  //Create rule for draw.
  if (playerGuess == computerSign) {
    drawNo = drawNo + 1;
    resultOfGame = `${playerUsername} draws, try again. <br> Your W/L/D record is ${playerWin}/${computerWin}/${drawNo}.`;
    return resultOfGame;
  }

  //Create rule for winning.
  if (
    (playerGuess == "scissors" && computerSign == "stone") ||
    (playerGuess == "stone" && computerSign == "paper") ||
    (playerGuess == "paper" && computerSign == "scissors")
  ) {
    playerWin = playerWin + 1;
    resultOfGame = `${playerUsername} wins. <br> You chose ${playerSignWithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Your W/L/D record is ${playerWin}/${computerWin}/${drawNo}.`;
    return resultOfGame;
  }

  //Default result is loss.
  computerWin = computerWin + 1;
  resultOfGame = `${playerUsername} loses. <br> You chose ${playerSignWithEmoji}, the computer chose ${computerSignWithEmoji}. <br> Your W/L/D record is ${playerWin}/${computerWin}/${drawNo}.`;

  return resultOfGame;
};

//Create secret game mode.
var playSecretWordGame = function (playerUsername, input) {
  var myOutputValue = "";

  if (input == "return") {
    currentGameMode = "waiting for player to choose game mode";
    return `Returning to previous menu. <br> <br> Please enter "normal" to enter normal game mode OR "reverse" to enter reverse game mode, OR "mukjjippa" to enter Muk-jji-ppa game mode OR "comvscom" to enter the Com vs Com game mode OR "word" to enter secret word game. <br> <br> OR <br> <br> If you want to register a different username, please enter "return".`;
  } else if (input == "papaya") {
    myOutputValue = `${playerUsername} wins! <br> You have guessed the secret word! Congrats!!`;
    return myOutputValue;
  }
  myOutputValue = `${playerUsername} loses. <br> You guessed ${input}. That is not the secret word. Try again.`;
  return myOutputValue;
};

//Run main function.
var main = function (input) {
  var myOutputValue = "";

  //Register first input as the username. Change mode of game to choose game mode.
  if (currentGameMode == "waiting for user name") {
    playerUsername = input;
    currentGameMode = "waiting for player to choose game mode";
    myOutputValue = `Username ${input} has been registered. <br> <br> Please enter "normal" to enter normal game mode <br> OR <br> "reverse" to enter reverse game mode <br> OR <br> "mukjjippa" to enter Muk-jji-ppa game mode <br> OR <br> "comvscom" to enter the Com vs Com game mode <br> OR <br> "word" to enter secret word game mode. <br> <br> OR <br> <br> If you want to register a different username, please enter "return".`;
  }
  //Register second input as game mode. Change mode of game to SPS or reverse.
  //Within choose game mode, give player the option of registering a different username.
  else if (currentGameMode == "waiting for player to choose game mode") {
    myOutputValue = `Please enter a valid game mode (i.e. normal/reverse/mukjjippa/comvscom/word), or enter "return" to register a different username.`;

    //If player chooses to register different username, return game mode to waiting for user name.
    if (input == "return") {
      currentGameMode = "waiting for user name";
      myOutputValue = `Please enter your username to register again.`;
    }

    if (input == "normal") {
      currentGameMode = "SPS game";
      myOutputValue = `Normal game mode activated. <br> Please enter your guess of scissors/paper/stone to start the game. <br><br> OR <br><br> If you want to return to the previous menu, please enter "return".`;
    }
    if (input == "reverse") {
      currentGameMode = "Reverse SPS game";
      myOutputValue = `Reverse game mode activated. <br> Please enter your guess of scissors/paper/stone to start the game. <br><br> OR <br><br> If you want to return to the previous menu, please enter "return".`;
    }
    if (input == "word") {
      currentGameMode = "Word game";
      myOutputValue = `Secret word game mode activated. <br> Please enter your guess to start the game. <br><br> OR <br><br> If you want to return to the previous menu, please enter "return".`;
    }
    if (input == "mukjjippa") {
      currentGameMode = "Korean SPS game";
      myOutputValue = `Muk-jji-ppa game mode activated. <br> Please enter your guess of scissors/paper/stone to start the game. <br><br> OR <br><br> If you want to return to the previous menu, please enter "return".`;
    }
    if (input == "comvscom") {
      currentGameMode = "Com VS Com";
      myOutputValue = `Com vs Com game mode activated. <br> Please click "submit" to start the game. <br><br> OR <br><br> If you want to return to the previous menu, please enter "return".`;
    }
  }
  // running SPS function after mode of game is changed to SPS.
  else if (currentGameMode == "SPS game") {
    myOutputValue = playSPSGame(playerUsername, input);
  }
  // running ReverseSPS function after mode of game is changed to Reverse SPS.
  else if (currentGameMode == "Reverse SPS game") {
    myOutputValue = playReverseSPSGame(playerUsername, input);
    //running Word Game function after mode of game is changed to Word game.
  } else if (currentGameMode == "Word game") {
    myOutputValue = playSecretWordGame(playerUsername, input);
    //running Mukjjippa Game function after mode of game is changed to korean sps game.
  } else if (currentGameMode == "Korean SPS game") {
    myOutputValue = playKoreanSPSGame(playerUsername, input);
  } else if (currentGameMode == "Com VS Com") {
    myOutputValue = playComGame(playerUsername, input);
  }

  return myOutputValue;
};
