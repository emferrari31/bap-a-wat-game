document.addEventListener("DOMContentLoaded", function () {
    const holes = document.querySelectorAll(".hole");
    const startButton = document.getElementById("startButton");
    const endButton = document.getElementById("endButton");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");

    let timer;
    let score = 0;
    let countdown;
    let moleInterval;
    let gameOver = true; // Initially game is over


    // Get the modal
    const modal = document.getElementById("myModal");

// Get the button that opens the modal
    const btn = document.getElementById("howToPlay");

// Get the <span> element that closes the modal
    const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Mole comes out of a random hole
    function comeout() {
        holes.forEach(hole => {
            hole.classList.remove('mole');
            hole.removeEventListener('click', handleMoleClick);
        });

        let random = holes[Math.floor(Math.random() * holes.length)];
        random.classList.add('mole');
        random.addEventListener('click', handleMoleClick);
    }

    // Handle click on mole
    function handleMoleClick() {
        if (!gameOver) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
        this.classList.remove('mole');
    }

    // Start the game
    function startGame() {
        if (countdown) {
            clearInterval(countdown);  // Clear existing countdown if any
        }

        if (moleInterval) {
            clearInterval(moleInterval);  // Clear existing mole interval if any
        }

        // Reset game state
        timer = 30;  // Reset timer to 30 seconds
        gameOver = false;
        score = 0;
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time: ${timer}s`;

        // Disable start button and enable end button
        startButton.disabled = true;
        endButton.disabled = false;

        // Start the countdown timer
        countdown = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Time: ${timer}s`;

            if (timer <= 0) {
                clearInterval(countdown);  // Stop the countdown
                clearInterval(moleInterval);  // Stop the mole interval
                gameOver = true;  // Set the game to over
                alert(`Game Over!\nYour final score: ${score}`);
                startButton.disabled = false;  // Enable start button
                endButton.disabled = true;  // Disable end button
            }
        }, 1000);  // 1 second interval for the timer

        // Start the mole appearance interval
        moleInterval = setInterval(() => {
            if (!gameOver) {
                comeout();  // Show a mole at a random hole
            }
        }, 1000);  // 1 second interval for mole appearance
    }

    // End the game
    function endGame() {
        clearInterval(countdown);  // Stop the countdown interval
        clearInterval(moleInterval);  // Stop the mole appearance interval
        gameOver = true;
        alert(`Game Ended!\nYour final score: ${score}`);
        score = 0;
        timer = 30;  // Reset timer to 30 seconds
        scoreDisplay.textContent = `Score: ${score}`;
        timerDisplay.textContent = `Time: ${timer}s`;
        startButton.disabled = false;
        endButton.disabled = true;
    }

    // Event listeners for start and end buttons
    startButton.addEventListener("click", startGame);
    endButton.addEventListener("click", endGame);
});
