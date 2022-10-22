function buttonStartClicked() {
    window.location.href = "html/game.html";
}

var enemyHitpoint = 20
var playerHitpoint = 20
var turnCount = 0
var battleLog = []
var isPlayerTurn = true

function attackButtonClicked() {
    turnCount++
    if (isPlayerTurn) {
        document.getElementById("actionButton").innerHTML = "Serang"
        let damageByPlayer = calculateDamageDealtByPlayer()
        enemyHitpoint = enemyHitpoint - damageByPlayer
        var log = "Orang baik serang!"
        if (damageByPlayer > 0) {
            log = log + " Pukul " + damageByPlayer + " nyawa!"
        } else {
            log = log + " Eh tak kena!"
        }
        battleLog.push(log)
    } else {
        document.getElementById("actionButton").innerHTML = "Sedia"
        var log = "Orang jahat serang!"
        battleLog.push(log)
    }

    isPlayerTurn = !isPlayerTurn

    document.getElementById("jahat.hp").textContent = enemyHitpoint
    document.getElementById("baik.hp").textContent = playerHitpoint

    
    var logOutput = battleLog.reduce(reduceLogsToOutput)
    if (battleLog.length == 1) {
        logOutput = "<li>" + logOutput + "</li>"
    }
    logOutput = "<ul>" + logOutput + "</ul>"
    document.getElementById("battlelog").innerHTML = logOutput
}

function reduceLogsToOutput(total, value, index, array) {
    if (index == 1) {
        return "<li>" + total + "</li><li>" + value + "</li>";
    }
    return total + "<li>" + value + "</li>";
}

function calculateDamageDealtByPlayer() {
    let hitRoll = Math.floor(Math.random() * 10)
    if (hitRoll < 5) {
        return 0
    }
    let damageRoll = Math.floor(Math.random() * 4)
    return damageRoll
}