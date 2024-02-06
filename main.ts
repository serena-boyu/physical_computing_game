radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        gameStart = true
        music.play(music.tonePlayable(tone2, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
        pressPad = true
        timeTemp = input.runningTime()
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
        findWinner()
    }
    if (true) {
        music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
        basic.showIcon(IconNames.Silly)
    }
})
function getScore () {
    time = input.runningTime()
    score = time - timeTemp
    score = score / 1000
    basic.showString("" + (score))
    basic.pause(100)
}
function countdownWait () {
    basic.showLeds(`
        . . . . .
        . . . . .
        # . # . #
        . . . . .
        . . . . .
        `)
    basic.pause(randint(1000, 8000))
    music.play(music.tonePlayable(tone2, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
    pressPad = true
    timeTemp = input.runningTime()
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
}
function countdownRandom () {
    for (let index = 0; index < randint(1, 13); index++) {
        music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        basic.showString("?")
    }
    music.play(music.tonePlayable(tone2, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    pressPad = true
    timeTemp = input.runningTime()
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
}
function countdownEasy () {
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    basic.showNumber(5)
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    basic.showNumber(4)
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    basic.showNumber(3)
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    basic.showNumber(2)
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Whole)), music.PlaybackMode.InBackground)
    basic.showNumber(1)
    music.play(music.tonePlayable(tone2, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    pressPad = true
    timeTemp = input.runningTime()
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
}
input.onPinPressed(TouchPin.P2, function () {
    if (!(pressPad)) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
        basic.clearScreen()
        basic.showString("P2 LOST")
        gameStart = false
        control.reset()
    }
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(0)
})
input.onPinPressed(TouchPin.P1, function () {
    if (!(pressPad)) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Wawawawaa), music.PlaybackMode.UntilDone)
        basic.clearScreen()
        basic.showString("P1 LOST")
        gameStart = false
        control.reset()
    }
})
function countdownConfusing2 () {
    basic.clearScreen()
    count = randint(0, 9)
    for (let index = 0; index < count + 1; index++) {
        music.play(music.tonePlayable(tone1, numBeats._pickRandom()), music.PlaybackMode.UntilDone)
        basic.showNumber(count)
        count += -1
    }
    music.play(music.tonePlayable(tone2, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
    pressPad = true
    timeTemp = input.runningTime()
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
}
function findWinner () {
    while (gameStart) {
        if (input.pinIsPressed(TouchPin.P1) && pressPad) {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
            basic.clearScreen()
            basic.showString("P1")
            basic.clearScreen()
            getScore()
            basic.clearScreen()
            gameStart = false
            pressPad = false
        }
        if (input.pinIsPressed(TouchPin.P2) && pressPad) {
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
            basic.clearScreen()
            basic.showString("P2")
            basic.clearScreen()
            getScore()
            basic.clearScreen()
            gameStart = false
            pressPad = false
        }
    }
}
input.onGesture(Gesture.Shake, function () {
    basic.showIcon(IconNames.Sad)
    music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Dadadadum), music.PlaybackMode.UntilDone)
    basic.pause(500)
    basic.showIcon(IconNames.Happy)
})
function whichGameMode () {
    if (gameMode == 1) {
        countdownEasy()
    }
    if (gameMode == 2) {
        countdownRandom()
    }
    if (gameMode == 3) {
        if (Math.randomBoolean()) {
            countdownConfusing()
        } else {
            countdownConfusing2()
        }
    }
    if (gameMode == 4) {
        countdownWait()
    }
}
function countdownConfusing () {
    basic.clearScreen()
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
    basic.showNumber(9)
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
    basic.showNumber(8)
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
    basic.showNumber(7)
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
    basic.showNumber(6)
    music.play(music.tonePlayable(tone1, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
    basic.showNumber(5)
    music.play(music.tonePlayable(tone2, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
    pressPad = true
    timeTemp = input.runningTime()
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
}
let count = 0
let time = 0
let numBeats: number[] = []
let score = 0
let timeTemp = 0
let pressPad = false
let gameStart = false
let gameMode = 0
let tone2 = 0
let tone1 = 0
radio.setGroup(105)
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
tone1 = 262
tone2 = 523
gameMode = 1
gameStart = false
pressPad = false
timeTemp = 0
score = 0
numBeats = [
music.beat(BeatFraction.Eighth),
music.beat(BeatFraction.Quarter),
music.beat(BeatFraction.Half),
music.beat(BeatFraction.Whole),
music.beat(BeatFraction.Double),
music.beat(BeatFraction.Breve),
music.beat(BeatFraction.Whole)
]
basic.forever(function () {
    if (input.buttonIsPressed(Button.B)) {
        if (gameMode < 4) {
            gameMode += 1
        }
        basic.showNumber(gameMode)
    }
    if (input.buttonIsPressed(Button.A)) {
        if (gameMode >= 2) {
            gameMode += -1
        }
        basic.showNumber(gameMode)
    }
    if (input.logoIsPressed()) {
        basic.pause(3000)
        gameStart = true
        whichGameMode()
        findWinner()
        basic.showIcon(IconNames.Happy)
    }
})
