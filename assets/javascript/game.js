    // put all the stuff on the screen

    let guesses = 0;
    let guessWord = new Array("doggy", "leopard", "tiger", "elephant", "monkey", "cat");
    let partialGuess = [];
    let guessLetters = [];
    let correctGuesses = 0;
    let wordArray = [];
    let originalWord = [];
    let wins = 0;
    let newGame = true;

    //    console.log(partialGuess);
    
    
    function keyPressed(event) {
        let removed = 0;

        event = event || window.event; //capture the event, and ensure we have an event
        //        var key = event.key || event.which || event.keyCode; //find the key that was pressed
        let x = event.key;
        if (newGame === true) {
            partialGuess = [];
            for (let i = 0; i < guessWord[wins].length; i++) {
                partialGuess[i] = '_';
            }
            if (wins >= guessWord.length) {
                wins = 0;
            }
            wordArray = guessWord[wins].split('');
            originalWord = guessWord[wins].split('');
            correctGuesses = 0;
            guessLetters = [];
            guesses = 0;
            document.getElementById("start").innerHTML = partialGuess.join(' ');
            document.getElementById("guesses").value = "";
            document.getElementById("again").innerHTML = "";
            document.getElementById("guessesLeft").innerHTML = "Guesses left:  " + (9 - guesses);
            document.getElementById("gotIt").innerHTML = "";
            newGame = false;
            return;
        }

        if (guesses++ >= 9) {
            console.log("Too many guesses!");
            //            display sad emoji;
            //            quit;
        }

        if ((x >= "A" && x <= "Z") || (x >= "a" && x <= "z")) {
            document.getElementById("warning").innerHTML = " ";
            console.log("You pressed an alpha");
            //            if (guessLetters.indexOf(x) >= 0) {
            //                console.log("Already guessed!");
            //            } else {
            guessLetters.push(x);
            let charIndex = wordArray.indexOf(x);
            if (charIndex >= 0) {
                let track = 0;
                wordArray.splice(charIndex, 1);
                track = originalWord.indexOf(x);
                originalWord[track] = '_';
                partialGuess[track] = x;
                removed++;
                correctGuesses++;
            }
            console.log(partialGuess);
            if (correctGuesses === guessWord[wins].length) {
                document.getElementById("gotIt").innerHTML = "You got it!";
                //                document.writeln(guessWord);
                //                document.writeln("Got it!");
                document.getElementById("guesses").value = "";
                document.getElementById("again").innerHTML = "Press any key to play again";
                newGame = true;
                wins++;
            }
        } else {
            document.getElementById("warning").innerHTML = "Only letters!";
            console.log("Only alphas!")
            //        display yucky emoji;
            //        continue;
        }
        document.getElementById("start").innerHTML = partialGuess.join(' ');
        document.getElementById("wins").innerHTML = "Wins:  " + wins;
        document.getElementById("guessesLeft").innerHTML = "Guesses left:  " + (9 - guesses);

        return;
    }

    //        else {
    //            if (it's in the word) {
    //                put it in the partial word (at the same place)
    //                put up a smiley face
    //                put it in the array of guesses (avoiding duplicates)
    //            }
    //            else {
    //                put up a sad facep
    //                put it in the array of guesses (avoiding duplicates)

    //            }
    //        }
    //    }
    //}
    //}