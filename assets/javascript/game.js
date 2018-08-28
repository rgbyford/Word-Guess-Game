    let guesses = 0;
    let guessWord = new Array("booty", "treasure", "plunder", "doubloons", "scurvy", "wench");
    let partialGuess = [];
    let guessLetters = [];
    let correctGuesses = 0;
    let wordArray = [];
    let originalWord = [];
    let wins = 0;
    let newGame = true;
    let first = true;

    async function waitOneSecond() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 1000);
        });
        await promise;
    }

    async function keyPressed(event) {
        let removed = 0;
        event = event || window.event; //capture the event
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
            document.getElementById("song").play();
            document.getElementById("start").innerHTML = partialGuess.join(' ');
            document.getElementById("guesses").value = "";
            document.getElementById("again").innerHTML = "";
            document.getElementById("guessesLeft").innerHTML = "Guesses left:  " + (9 - guesses);
            document.getElementById("gotIt").innerHTML = "";
            document.getElementById("warning").innerHTML = "";
            document.getElementById("unhappy").style.left = "66vw";
            document.getElementById("unhappy").style.bottom = "58vh";
            document.getElementById("unhappy").style.display = "block";
            document.getElementById("PirateShip").style.display = "block";
            newGame = false;
            return;
        }

        if (guesses >= 8) {
            console.log("Too many guesses!");
            document.getElementById("warning").innerHTML = "Too many guesses";
            document.getElementById("again").innerHTML = "Press any key to play again";
            document.getElementById("guessesLeft").innerHTML = "Guesses left:  0";
            document.getElementById("PirateShip").style.display = "none";
            document.getElementById("PirateShipLose").style.display = "block";
            document.getElementById("unhappy").style.display = "none";
            newGame = true;
            return;
        }

        if ((x >= "A" && x <= "Z") || (x >= "a" && x <= "z")) {
            document.getElementById("warning").innerHTML = " ";
            console.log("You pressed an alpha");
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
            } else { // bad guess
                guesses++;
                var audioClip = new Audio("assets/audio/WalkThePlank.mp3");
                audioClip.play();
                await waitOneSecond();
                var xPos = 66 - 2.3 * guesses;
                var yPos = 58 - 2.3 * guesses;
                document.getElementById("unhappy").style.left = xPos + "vw";
                document.getElementById("unhappy").style.bottom = yPos + "vh";
            }
            console.log(partialGuess);
            if (correctGuesses === guessWord[wins].length) {
                document.getElementById("gotIt").innerHTML = "You got it!";
                document.getElementById("guesses").value = "";
                document.getElementById("again").innerHTML = "Press any key to play again";
                document.getElementById("escapeBoat").style.display = "block";
                document.getElementById("unhappy").style.display = "none";

                newGame = true;
                guesses = 0;
                wins++;
            }
        } else {
            document.getElementById("warning").innerHTML = "Only letters!";
            document.getElementById("angry").style.display = "block";
            console.log("Only alphas!")
        }

        document.getElementById("start").innerHTML = partialGuess.join(' ');
        document.getElementById("wins").innerHTML = "Wins:  " + wins;
        document.getElementById("guessesLeft").innerHTML = "Guesses left:  " + (9 - guesses);

        return;
    }