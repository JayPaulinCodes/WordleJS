/*
 * IMPORTS
 */

const CHALK = require("chalk");
const PROMPT = require("prompt-sync")({ sigint: true });

/*
 * CLASSES
 */

class Screen {
    /**
     * 
     * @param {boolean} has_header - wether the screen shows the header or not
     * @param {string[]} lines - 10 lines to display 
     */
    constructor(has_header, lines) {
        this.has_header = has_header;
        this.lines = lines;

        this.action_key_text = CHALK.gray("    Press Enter To Continue");
        this.key_action_callback = () => {};

        if (has_header) {
            while (this.lines.length > 10) { this.lines.pop(); }
            while (this.lines.length < 10) { this.lines.push(""); }
        } else {
            while (this.lines.length > 14) { this.lines.pop(); }
            while (this.lines.length < 14) { this.lines.push(""); }
        }
    }

    activate() {
        console.clear();
        if (this.has_header) console.log(HEADER);
        console.log(this.lines.join("\n") + "\n");
        var selection = PROMPT(this.action_key_text);
        if (this.key_action_callback != null) this.key_action_callback(selection); 
    }

    get action_key_text() { return this._action_key_text; }

    set action_key_text(new_action_key_text) { this._action_key_text = new_action_key_text; }

    get key_action_callback() { return this._key_action_callback; }

    set key_action_callback(new_key_action_callback) { if (new_key_action_callback != null) this._key_action_callback = new_key_action_callback; else return; }
}

class AltScreen {
    /**
     * 
     * @param {string[]} lines - 10 lines to display 
     */
    constructor(lines) {
        this.lines = lines;

        this.action_key_text = CHALK.gray("    Press Enter To Continue");
        this.key_action_callback = () => {};
    }

    activate() {
        console.clear();
        console.log(HEADER);
        console.log(this.lines.join("\n") + "\n");
        var selection = PROMPT(this.action_key_text);
        if (this.key_action_callback != null) this.key_action_callback(selection); 
    }

    get lines() { return this._lines; }

    set lines(new_lines) { this._lines = new_lines; }

    get action_key_text() { return this._action_key_text; }

    set action_key_text(new_action_key_text) { this._action_key_text = new_action_key_text; }

    get key_action_callback() { return this._key_action_callback; }

    set key_action_callback(new_key_action_callback) { if (new_key_action_callback != null) this._key_action_callback = new_key_action_callback; else return; }
}


/*
 * CONSTANTS
 */

const { STANDARD_BANK, FULL_BANK } = require("./wordlists.json");
const HEADER = CHALK.magentaBright("     ┐ ┬        │╷╭─╮  ┬┌─┤\n     │││┌─┐├─┐┌─┤│├─╯┌ │└─┐\n     └┴┘└─┘╵  └─┘╵╰─╴└─┘├─┘\n");
const WIN_MESSAGES = [
    "          Well done!",
    "        Congratulations!",
    "         Winner Winner\n      Chicken Dinner"
];
const LOSS_MESSAGES = [
    "     Better Luck Next Time"
];

/*
 * SCREENS & MENUS
 */

const AUTHOR_NOTE_SCREEN = new Screen(true, [
    " Thank you for playing WordleJS",
    " WordleJS was simply a personal",
    " project I had made to improve",
    " my understanding of JavaScript",
    " and NodeJS, but I figured some",
    "  people would like to play it",
    "      so I released it!",
    "",
    "    Coded By: Jacob Paulin",
    "      Inspired By Wordle"
]);

const DISCLAIMER_SCREEN = new Screen(true, [
    `       ${CHALK.bgYellow.black("[!]")} ${CHALK.yellow("DISCLAIMER")} ${CHALK.bgYellow.black("[!]")}`,
    CHALK.rgb(255, 69, 0)("    I AM NOT AFFILIATED WITH "),
    CHALK.rgb(255, 69, 0)(" WORDLE OR THE NEW YORK TIMES."),
    CHALK.rgb(255, 69, 0)("  I DO NOT CLAIM OWNERSHIP OF "),
    CHALK.rgb(255, 69, 0)("    THE CONCEPT OR THE GAME."),
    CHALK.rgb(255, 69, 0)("   THIS IS SIMPLY A RECREATION"),
    CHALK.rgb(255, 69, 0)("   AND IS NOT INTENDED TO BE"),
    CHALK.rgb(255, 69, 0)("   INTERPERTED ANY OTHER WAY."),
    CHALK.rgb(255, 255, 255)(" LINK TO PLAY THE OFFICIAL GAME"),
    CHALK.rgb(255, 255, 255)("  www.nytimes.com/games/wordle")
]);

const MAIN_MENU_SCREEN = new Screen(true, [
    CHALK.rgb(0, 109, 170)("           MAIN MENU"),
    "",
    CHALK.rgb(3, 83, 164)("   [0] ------ Close The Game"),
    CHALK.rgb(3, 83, 164)("   [1] --------- How To Play"),
    CHALK.rgb(3, 83, 164)("   [2] ---------- Word Banks"),
    CHALK.rgb(3, 83, 164)("   [3] -------- Start A Game"),
]);

const HOW_TO_PLAY_SCREEN = new Screen(false, [
    CHALK.white.bold("           Your Goal:"),
    CHALK.white.bold("   Guess The Word In 6 Guesses"),
    "",
    `              ${CHALK.white.bgHex("#538D4E").bold(" D ")}`,
    "   A Green Letter Means It's In ",
    "  The Word & In The Right Spot",
    "",
    `              ${CHALK.white.bgHex("#B59F3B").bold(" A ")}`,
    "  A Yellow Letter Means It's In",
    " The Word But In The Wrong Spot",
    "",
    `              ${CHALK.white.bgHex("#3A3A3C").bold(" D ")}`,
    "    A Gray Letter Means It's",
    "        Not In The Word"
]);

const WORD_BANKS_SCREEN = new Screen(false, [
    "      WordleJS Contains 2",
    "      Different Word Banks",
    "",
    `      ${CHALK.hex("#29AB87").bold("STANDARD WORD BANK")}`,
    " The Standard Word Bank Is The",
    "  Easier Word Bank. It Contains",
    " Standard Issue Wordle Words And",
    "   Has A Total Of 2,315 Words.",
    `        ${CHALK.hex("#E34234").bold("FULL WORD BANK")}`,
    " The Standard Word Bank Is The",
    "  Harder Word Bank. It Contains",
    " Every 5 Letter Word Recognized",
    "  By Wordle And Has A Total Of",
    "          12,972 Words."
]);

const GAME_PREP_SCREEN = new Screen(true, [
    "       Select A Word Bank",
    "",
    "     Reference The Word Bank",
    "       Menu For More Info",
    "",
    "   [1] ------- Standard Bank",
    "   [2] ----------- Full Bank",
]);


/*
 * LINKING SCREENS & MENUS
 */

AUTHOR_NOTE_SCREEN.key_action_callback = (selection) => { return DISCLAIMER_SCREEN.activate(); };
DISCLAIMER_SCREEN.key_action_callback = (selection) => { return MAIN_MENU_SCREEN.activate(); };
MAIN_MENU_SCREEN.action_key_text = CHALK.gray("   Please Choose An Option: ");
MAIN_MENU_SCREEN.key_action_callback = mainMenuLogic;
HOW_TO_PLAY_SCREEN.action_key_text = CHALK.gray("    Press Enter To Go Back");
HOW_TO_PLAY_SCREEN.key_action_callback = (selection) => { return MAIN_MENU_SCREEN.activate(); };
WORD_BANKS_SCREEN.action_key_text = CHALK.gray("    Press Enter To Go Back");
WORD_BANKS_SCREEN.key_action_callback = (selection) => { return MAIN_MENU_SCREEN.activate(); };
GAME_PREP_SCREEN.action_key_text = CHALK.gray("   Please Choose An Option: ");
GAME_PREP_SCREEN.key_action_callback = gamePrepMenuLogic;


function selectWordFromBank(word_bank) { return word_bank[Math.floor(Math.random()*word_bank.length)]; }

function getLettersFromWord(word) { return word.split(""); }

function doesWordContainLetter(word, letter) { return (getLettersFromWord(word).includes(letter.toLowerCase())) ? true : false; }

function doesWordContainLetterAtIndex(word, letter, position) { return (getLettersFromWord(word)[position - 1] == letter.toLowerCase()) ? true : false; }

function isWordInWordBank(word) { return (FULL_BANK.includes(word.toLowerCase())) ? true : false; }

function isWordInGuessHistory(GUESS_HISTORY, word) { return (GUESS_HISTORY.length == 0 || !GUESS_HISTORY.includes(word.toLowerCase())) ? false : true; }

function generateColourString(board_row) {
    var coloured_string_array = [];

    board_row.forEach(slot => {
        switch (slot.colour) {
            case "B":
                coloured_string_array.push( (slot.letter == null) ? CHALK.white.bgHex("#3A3A3C").bold("   ") : CHALK.white.bgHex("#3A3A3C").bold(" %s ".replace("%s", slot.letter.toUpperCase())) );
                break;
            case "G":
                coloured_string_array.push( (slot.letter == null) ? CHALK.white.bgHex("#538D4E").bold("   ") : CHALK.white.bgHex("#538D4E").bold(" %s ".replace("%s", slot.letter.toUpperCase())) );
                break;
            case "Y":
                coloured_string_array.push( (slot.letter == null) ? CHALK.white.bgHex("#B59F3B").bold("   ") : CHALK.white.bgHex("#B59F3B").bold(" %s ".replace("%s", slot.letter.toUpperCase())) );
                break;
            case "D":
                coloured_string_array.push( (slot.letter == null) ? CHALK.white.bgHex("#121213").bold("   ") : CHALK.white.bgHex("#121213").bold(" %s ".replace("%s", slot.letter.toUpperCase())) );
                break;
            default:
                break;
        }
    });

    return coloured_string_array.join("");
}

function printBoard(board) {
    const LINES = []

    for (const r in board) {
        if (Object.hasOwnProperty.call(board, r)) {
            const row = board[r];
            
            LINES.push("        " + generateColourString(row));
        }
    }

    console.clear();
    console.log(HEADER);
    console.log(LINES.join("\n"));
}

function getGuess(BOARD, GUESS_HISTORY) {
    var is_word_valid = false;
    var word = null;

    do {
        console.log("         Enter a word:")
        var guess = PROMPT("             ").toLowerCase();


        // is the word 5 letters?
        if (guess.length != 5 || guess.match(" ")) {
            console.clear();
            printBoard(BOARD);
            console.log(CHALK.red("         You must guess\n        a 5 letter word!"));
            is_word_valid = false;
        } else {
            // is the word valid and in the word bank?
            if (!isWordInWordBank(guess)) {
                console.clear();
                printBoard(BOARD);
                console.log(CHALK.red("       The word ") + CHALK.white(guess) + CHALK.red(" is\n        not a real word!"));
                is_word_valid = false;
            } else {
                // has the word been guessed already?
                if (isWordInGuessHistory(GUESS_HISTORY, guess)) {
                    console.clear();
                    printBoard(BOARD);
                    console.log(CHALK.red("        The word ") + CHALK.white(guess) + CHALK.red("\n          has already\n         been guessed!"));
                    is_word_valid = false;
                } else {
                    is_word_valid = true;
                    word = guess;
                }
            }
        }
        
    } while (!is_word_valid);

    return word;
}

function runGame(word_bank) {
    const WORD_BANK = (word_bank == 1) ? STANDARD_BANK : (word_bank == 2) ? FULL_BANK : null;
    const SELECTED_WORD = selectWordFromBank(WORD_BANK);
    const BOARD = {
        row_1: [
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null }
        ],
        row_2: [
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null }
        ],
        row_3: [
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null }
        ],
        row_4: [
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null }
        ],
        row_5: [
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null }
        ],
        row_6: [
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null },
            { colour: "D", letter: null }
        ]
        
    };
    const GUESS_HISTORY = [];
    const GAME_STATE = {
        running: true,
        outcome: null // outcome 1 = win, 2 = loss
    };

    printBoard(BOARD);

    while (GAME_STATE["running"]) {
        // console.log(SELECTED_WORD, GAME_STATE["running"], GAME_STATE["outcome"])
        var guess = getGuess(BOARD, GUESS_HISTORY)
        var guess_letters = getLettersFromWord(guess);
        GUESS_HISTORY.push(guess);

        // Set the setters on the board
        for (let i = 0; i < BOARD[`row_${GUESS_HISTORY.length}`].length; i++) {
            const ROW_ENTRY = BOARD[`row_${GUESS_HISTORY.length}`][i];
            const GUESS_LETTER = guess_letters[i];

            ROW_ENTRY["letter"] = GUESS_LETTER;
        }

        // Figure out if each letter is G Y or B
        for (let i = 0; i < BOARD[`row_${GUESS_HISTORY.length}`].length; i++) {
            const ROW_ENTRY = BOARD[`row_${GUESS_HISTORY.length}`][i];
            const LETTER = ROW_ENTRY["letter"];
            const POSITION = i + 1;

            if (doesWordContainLetterAtIndex(SELECTED_WORD, LETTER, POSITION)) ROW_ENTRY["colour"] = "G";
            else if (doesWordContainLetter(SELECTED_WORD, LETTER)) ROW_ENTRY["colour"] = "Y";
            else ROW_ENTRY["colour"] = "B";
        }

        printBoard(BOARD);

        if (guess == SELECTED_WORD) { GAME_STATE["running"] = false; GAME_STATE["outcome"] = 1; }
        else if (guess != SELECTED_WORD && GUESS_HISTORY.length == 6) { GAME_STATE["running"] = false; GAME_STATE["outcome"] = 2; }

    } 

    if (!GAME_STATE["running"]) {
        switch (GAME_STATE["outcome"]) {
            case 1:
                printBoard(BOARD);
                console.log(`${WIN_MESSAGES[Math.floor(Math.random()*WIN_MESSAGES.length)]}`)
                PROMPT(CHALK.gray("    Press Enter To Continue"));
                MAIN_MENU_SCREEN.activate();
                break;
            case 2:
                printBoard(BOARD);
                console.log(`${LOSS_MESSAGES[Math.floor(Math.random()*LOSS_MESSAGES.length)]}`)
                PROMPT(CHALK.gray("    Press Enter To Continue"));
                MAIN_MENU_SCREEN.activate();
                break;
        
            default:
                break;
        }
    }

}

function mainMenuLogic(selection) {
    // console.log((selection == ""))
    switch (selection) {
        case "0": break;
        case "1": HOW_TO_PLAY_SCREEN.activate(); break;
        case "2": WORD_BANKS_SCREEN.activate(); break;
        case "3": GAME_PREP_SCREEN.activate(); break;
        default: MAIN_MENU_SCREEN.activate(); break;
    }
}

function gamePrepMenuLogic(selection) {
    // console.log((selection == ""))
    switch (selection) {
        case "1": runGame(1); break;
        case "2": runGame(2); break;
        default: GAME_PREP_SCREEN.activate(); break;
    }
}

/**
 * STARTING THE SCRIPT
 */

AUTHOR_NOTE_SCREEN.activate(); // Very fancy I know