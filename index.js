let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset_btn");
let newGame = document.querySelector("#new-btn");
let msgcont = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX , playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// Named function to handle the box click
const handleBoxClick = (event) => {
    const box = event.target;

    if (turn0 == true) {
        //playerO
        box.innerText = "O";
        box.classList.add("o-player");
        turn0 = false;
    } else {
        //playerX
        box.innerText = "X";
        box.classList.add("x-player");
        turn0 = true;
    }

    box.classList.add("disabled"); // Use class to show it's clicked
    box.removeEventListener("click", handleBoxClick); // Correctly removes the event listener

    checkWinner();
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgcont.classList.remove("hide");
};

// Attach event listeners
boxes.forEach((box) => {
    box.addEventListener("click", handleBoxClick); // Attach the click event
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner", pos1Val);
                showWinner(pos1Val);
                disableAllBoxes(); // Disable all boxes after winner is found
                break;
            }
        }
    }
};

const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.classList.add("disabled");
        box.removeEventListener("click", handleBoxClick); // Correctly removes click events from all boxes
    });
};

const enableAllBoxes = () => {
    boxes.forEach((box) => {
        box.classList.remove("disabled");
        box.innerText = ""; // Clear the text inside the box
        box.addEventListener("click", handleBoxClick); // Re-enable click event for each box
    });
};

const resetGame = () => {
    turn0 = true; // Reset turn to initial value
    enableAllBoxes();
    msgcont.classList.add("hide"); // Hide the winner message
};

// Attach reset button and new game button events
newGame.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
