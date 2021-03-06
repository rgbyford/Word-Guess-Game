    let guesses = 0;
    let guessWord = new Array("booty", "treasure", "plunder", "doubloons", "scurvy", "wench");
    let partialGuess = [];
    let guessLetters = [];
    let correctGuesses = 0;
    let wordArray = [];
    let originalWord = [];
    let wins = 0;
    let newGame = true;

    /*  testing search.  All these work.
        var x = "b";
        var a = x.search (/[a-z]/i);
        var b = x.search (/[a-z]|[A-Z]/);
        var c = x.search (/[A-Z]|[a-z]/);

        var y = "B";
        var d = x.search (/[a-z]/i);
        var e = x.search (/[a-z]|[A-Z]/);
        var f = x.search (/[A-Z]|[a-z]/);
    */
    async function waitOneSecond() {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 750);
        });
        await promise;
    }

    async function keyPressed(event) {
        let removed = 0;

        event = event || window.event; //capture the event
        let x = event.key;

        if (event.keyCode == 8) { // backspace
            event.preventDefault(); // stop it from having an effect
            return;
        }
        if (x.length > 1) {
            return; // ignore shift, ctrl, etc.
        }

        if (newGame === true) {
            event.preventDefault(); // don't show the key
            newGameFn();
            newGame = false;
        } else if (guesses >= 8) {
            document.getElementById("warning").innerHTML = "Too many guesses";
            document.getElementById("again").innerHTML = "Press any key to play again";
            document.getElementById("guessesLeft").innerHTML = "Guesses left:  0";
            document.getElementById("PirateShip").style.display = "none";
            document.getElementById("PirateShipLose").style.display = "block";
            document.getElementById("unhappy").style.display = "none";
            newGame = true;
        } else {
            x = x.toLowerCase();
            if (x.search(/[a-z]/i) >= 0) { // is an alpha
                document.getElementById("warning").innerHTML = " ";
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
                if (correctGuesses === guessWord[wins].length) {
                    document.getElementById("song").play();
                    document.getElementById("gotIt").innerHTML = "You got it!";
                    document.getElementById("again").innerHTML = "Press any key to play again";
                    document.getElementById("escapeBoat").style.display = "block";
                    document.getElementById("unhappy").style.display = "none";
                    newGame = true;
                    wins++;
                }
            } else {
                document.getElementById("warning").innerHTML = "Only letters!";
                document.getElementById("angry").style.display = "block";
            }
            document.getElementById("guessLetters").innerHTML = partialGuess.join(' ');
            document.getElementById("wins").innerHTML = "Wins:  " + wins;
            document.getElementById("guessesLeft").innerHTML = "Guesses left:  " + (9 - guesses);
        }
        return;
    }

    function newGameFn() {
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
        document.getElementById("song").pause();
        document.getElementById("start").style.display = "none";
        document.getElementById("guessLetters").innerHTML = partialGuess.join(' ');
        document.getElementById("guesses").value = "";
        document.getElementById("again").innerHTML = "";
        document.getElementById("guessesLeft").innerHTML = "Guesses left:  " + (9 - guesses);
        document.getElementById("gotIt").innerHTML = "";
        document.getElementById("warning").innerHTML = "";
        document.getElementById("unhappy").style.left = "66vw";
        document.getElementById("unhappy").style.bottom = "58vh";
        document.getElementById("unhappy").style.display = "block";
        document.getElementById("escapeBoat").style.display = "none";
        document.getElementById("PirateShip").style.display = "block";
        return;
    }