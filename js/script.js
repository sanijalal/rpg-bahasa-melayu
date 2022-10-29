function buttonStartClicked() {
    window.location.href = "html/game.html";
}

class Enemy {
    constructor(name, hitpoint) {
      this.name = name
      this.hitpoint = hitpoint
    }
}

class Player {
    constructor(hitpoint) {
        this.hitpoint = hitpoint
      }
}

var playerHitpoint = 20
var turnCount = 0
var battleLog = []
var isPlayerTurn = true
var enemies = []
var heroes = []
var attackIndex = 0
var player

function attackButtonClicked() {
    turnCount++
    if (isPlayerTurn) {
        document.getElementById("actionButton").innerHTML = "Sedia"
        let damageByPlayer = calculateDamageDealtByPlayer()
        var log = "Orang baik serang!"
        if (damageByPlayer > 0) {
            log = log + " Pukul " + damageByPlayer + " nyawa!"
        } else {
            log = log + " Eh tak kena!"
        }

        var enemy = enemies[attackIndex]
        enemy.hitpoint = enemy.hitpoint - damageByPlayer

        console.log(log)
        battleLog.push(log)
    } else {
        document.getElementById("actionButton").innerHTML = "Serang"
        var log = "Orang jahat serang!"
        battleLog.push(log)
        console.log(log)
    }

    isPlayerTurn = !isPlayerTurn

    var logOutput = battleLog.reduce(reduceLogsToOutput)
    if (battleLog.length == 1) {
        logOutput = "<li>" + logOutput + "</li>"
    }
    logOutput = "<ul>" + logOutput + "</ul>"
    document.getElementById("battlelog").innerHTML = logOutput

    updateState()
}

function reduceLogsToOutput(total, value, index, array) {
    if (index == 1) {
        return "<li>" + total + "</li><li>" + value + "</li>";
    }
    return total + "<li>" + value + "</li>";
}

function calculateDamageDealtByPlayer() {
    let hitRoll = Math.floor(Math.random() * 10)
    console.log("Hit Roll: " + hitRoll)
    if (hitRoll < 5) {
        return 0
    }
    let damageRoll = Math.floor(Math.random() * 4)
    console.log("Damage Roll: " + damageRoll)
    return damageRoll
}

function createEnemyHtml(enemy, order) {
    const htmlContent = "<div id=\"enemy." + order + "\">" + enemy.name + " " + enemy.hitpoint + " nyawa <button>Pilih</button>" + "</div>"
    return htmlContent
}

function createBaikHtml(watak) {
    const htmlContent = "<div id=\"baik\">Nyawa orang baik: " + watak.hitpoint + " nyawa" + "</div>"
    return htmlContent
}

function updateState() {
    var enemyHtml = ""
    enemies.forEach( (value, index, array) => {
        enemyHtml += createEnemyHtml(value, index)
    })
    document.getElementById("senarai.jahat").innerHTML = enemyHtml
    
    const htmlBaik = createBaikHtml(player)
    document.getElementById("senarai.baik").innerHTML = htmlBaik
}

function pageLoaded() {
    enemies.push(new Enemy("Jahat 1", 20))
    enemies.push(new Enemy("Abu", 22))
    enemies.push(new Enemy("Gorgon", 14))

    var enemyHtml = ""
    enemies.forEach( (value, index, array) => {
        enemyHtml += createEnemyHtml(value, index)
    })
    document.getElementById("senarai.jahat").innerHTML = enemyHtml

    player = new Player(20)
    const htmlBaik = createBaikHtml(player)

    document.getElementById("senarai.baik").innerHTML = htmlBaik

    document.addEventListener('keydown', function(event) {
        console.log("Key pressed " + event.key)
    })
}