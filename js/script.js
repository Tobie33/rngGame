const $instructionBox = $("#instruction-box")
const $instruction = $("#instruction")
const $close = $("#close-button")
const $attack = $("#attack")
const $defense = $("#defense")
const $dodge = $("#dodge")
const $playerCommentate = $("#player-movement")
const $enemyCommentate = $("#ai-movement")
const $playerAttackDescription = $("#player-attack-description")
const $playerDefenseDescription = $("#player-defense-description")
const $playerDodgeDescription = $("#player-dodge-description")

const playerMaxHealth = 100
const playerName = "Dismas"
const aiName = "Drunktard"
const genericMinVal = 1
const genericMaxVal = 6

let playersCurrentHealth = 100
let playerAttackVal = 10
let playerDefenseVal = 0
let playerDodge = 0
let playerDefenseMinPossibleVal = 1
let playerDefenseMaxPossibleVal = 5
let playerDodgeMinVal = 25
let playerDodgeMaxVal = 50

let enemyCurrentHealth = 100
let enemyMaxHealth = 100
let enemyAttackVal = 5
let enemyDefenseVal = 0
let enemyDodge = 0
let enemyDefenseMinPossibleVal = 0
let enemyDefenseMaxPossibleVal = 5

let Level = 0
// turn 0 = player's turn, turn 1 = ai's turn
let turn = 0

$playerAttackDescription.html(`Deal ${playerAttackVal - 5} - ${playerAttackVal + 5} Damage`)
$playerDefenseDescription.html(`Get a ${playerDefenseMinPossibleVal} - ${playerDefenseMaxPossibleVal} Shield`)
$playerDodgeDescription.html(`Gain ${playerDodgeMinVal}% - ${playerDodgeMaxVal}% Dodge`)

const getRandomNumForDodge = () => {
  return Math.floor(Math.random() * 2)
}

const getRandomNum = (min,max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const checkTurn = () => {
  turn = turn === 0 ? 1 : 0
  console.log(turn)
}

const getRandomNumForAttack = () => {
  let randomVal = Math.floor(Math.random() * 6)
  let posOrNeg = Math.floor(Math.random() * 2)
  return randomVal === 0 ? randomVal : posOrNeg === 0 ? randomVal : randomVal *  -1
}

const appearInstruction = () => {
  $instruction.show()
  $instruction.addClass("visibility")
}

const closeInstruction = () => {
  $instruction.hide()
}

const dodgeyMove = () => {
  const additionalDodgeVal = getRandomNumForDodge()
  if(turn === 0){
    additionalDodgeVal === 0 ? playerDodge += 25 : playerDodge += 50
    if(playerDodge > 50){
      playerDodge = 50
    }
    $playerCommentate.html(`${playerName} is feeling dodgey! (${playerDodge}% to Dodge)`)
  } else {
    additionalDodgeVal === 0 ? enemyDodge += 25 : enemyDodge += 50
    if(enemyDodge > 50){
      enemyDodge = 50
    }
    $enemyCommentate.html(`${aiName} is feeling dodgey! (${enemyDodge}% to Dodge)`)
  }
  checkTurn()
}

const dodgeCalculate = dodgeVal => {
  const decisiveVal = Math.floor(Math.random() * (100 - 1 + 1) + 1)
  if(decisiveVal < dodgeVal){
    return true
  } else {
    return false
  }

}

const defenseMove = () => {
  if(turn === 0){
    let additionalDefenseVal = getRandomNum(playerDefenseMinPossibleVal,playerDefenseMaxPossibleVal)
    playerDefenseVal += additionalDefenseVal
    if(playerDefenseVal > playerDefenseMaxPossibleVal){
      playerDefenseVal = playerDefenseMaxPossibleVal
    }
    $playerCommentate.html(`${playerName} is buffed! (Gets a ${playerDefenseVal} Shield!)`)
  } else {
    let additionalDefenseVal = getRandomNum(enemyDefenseMinPossibleVal,enemyDefenseMaxPossibleVal)
    enemyDefenseVal += additionalDefenseVal
    if(enemyDefenseVal > enemyDefenseMaxPossibleVal){
      enemyDefenseVal = enemyDefenseMaxPossibleVal
    }
    $enemyCommentate.html(`${aiName} is buffed! (Gets a ${enemyDefenseVal} Shield!)`)
  }
  checkTurn()
}

const attackMove = (currentTurnAttackVal, opponentDodge, opponentDefense, name,currentTurnCommentate, opponentTurnCommentate) => {
    const additionAttackVal = getRandomNumForAttack()
    let modifiedVal =  currentTurnAttackVal + additionAttackVal
    if(opponentDodge === 0){
      if (opponentDefense === 0){
        enemyCurrentHealth -= modifiedVal
        currentTurnCommentate.html(`${name} deals ${modifiedVal} Damage!`)
      } else if (opponentDefense > 0){
        modifiedVal -= opponentDefense
        opponentDefense *= 0
        if(modifiedVal <= 0){
          opponentTurnCommentate.html(`Blocked!`)
        } else {
          enemyCurrentHealth -= modifiedVal
          currentTurnCommentate.html(`${name} deals ${modifiedVal} Damage!`)
      }
    }
  } else if((dodgeCalculate(opponentDodge))){
      opponentTurnCommentate.html(`Dodged!`)
      opponentDodge *= 0
  }
  checkTurn()
}

const aiDoingAIStuff = () => {
  const decisiveStrike = getRandomNum(genericMinVal,genericMaxVal)
  decisiveStrike <= 4 ? (initiateAttack) : decisiveStrike === 5 ? (defenseMove) : (dodgeyMove)
}

const initiateAttack = () => {
  if(turn === 0){
    attackMove(playerAttackVal,enemyDodge,enemyDefenseVal,playerName,$playerCommentate,$enemyCommentate)
  } else {
    attackMove(enemyAttackVal,playerDodge,playerDefenseVal,aiName,$enemyCommentate,$playerCommentate)
  }
}

const playerTurn = () => {
  $attack.on("click",(initiateAttack))
  $defense.on("click",(defenseMove))
  $dodge.on("click",(dodgeyMove))
}

const takeTurns = () => {
  turn === 0 ? playerTurn() : aiDoingAIStuff()
}

const mainPageManeuver = () => {
    $instruction.hide()
    $instructionBox.on("click",appearInstruction)
    $close.on("click",closeInstruction)
}


const init  = () => {
  mainPageManeuver()
  takeTurns()
}

init()
