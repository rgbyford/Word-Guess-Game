    // put all the stuff on the screen

    let guesses = 0;
    let guessWord = "dogdd";
    let partialGuess = [];
    let guessLetters = [];
    let correctGuesses = 0;

    document.getElementById("demo").addEventListener("keypress", keyPressed);
    console.log("Press a key");
    for (let i = 0; i < guessWord.length; i++) {
        partialGuess[i] = '_';
    }
    console.log(partialGuess);

    function keyPressed(event) {
        event = event || window.event; //capture the event, and ensure we have an event
        var key = event.key || event.which || event.keyCode; //find the key that was pressed
        //        console.log("key pressed!");
        var x = event.key;

        if (guesses++ >= 9) {
            console.log("Too many guesses!");
            //            display sad emoji;
            //            quit;
        }

        if ((x >= "A" && x <= "Z") || (x >= "a" && x <= "z")) {
            console.log("You pressed an alpha");
            //        if (it's in the array of guesses) {
            //            print "Already guessed!";
            //            display yucky emoji
            //        }
            //            if (guessLetters.includes (x)) {
            //                console.log("Already guessed");
            //            } else {
            guessLetters.push(x);
            let iCharPos = 0;
            let iLast = 0;
            while (iCharPos != -1) {
                console.log (guessWord.slice(iLast));
                iCharPos = guessWord.slice(iLast).indexOf(x);
                if (iCharPos >= 0) {
                    partialGuess[iLast + iCharPos] = x;
                    correctGuesses++;
                    iLast += iCharPos + 1;
                    if (iLast >= guessWord.length) {
                        break;          // guessed the last letter
                    }
                }
            }
            //                console.log (guessWord.split(x).length - 1);

            //                if (guessWord.includes(x)) {
            //correctGuesses++;
            //                    partialGuess[guessWord.indexOf(x)] = x;
            console.log(partialGuess);
            //                }
            if (correctGuesses === guessWord.length) {
                document.writeln(guessWord);
                document.writeln("Got it!");
            }
        }
        else {
            console.log("Only alphas!")
            //        display yucky emoji;
            //        continue;
        }
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