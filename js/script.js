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
const $playerHealthDisplay = $("#player-current-health")
const $enemyHealthDisplay = $("#enemy-current-health")
const $playerHPBar = $("#player-hpbar")
const $enemyHPBar = $("#enemy-hpbar")

const playerMaxHealth = 100
const playerName = "Dismas"
const aiName = "Drunktard"
const minValForAIMove = 1
const maxValForAIMove = 3

let playersCurrentHealth = 100
const playerAttackVal = 10
let playerDefenseVal = 0
let playerDodge = 0
const playerDefenseMinPossibleVal = 1
const playerDefenseMaxPossibleVal = 5
const playerDodgeMinVal = 25
const playerDodgeMaxVal = 50

let enemyCurrentHealth = 100
const enemyMaxHealth = 100
const enemyAttackVal = 8
let enemyDefenseVal = 0
let enemyDodge = 0
const enemyDefenseMinPossibleVal = 1
const enemyDefenseMaxPossibleVal = 5

let Level = 0
// turn 0 = player's turn, turn 1 = ai's turn
let turn = 0

$playerAttackDescription.html(`Deal ${playerAttackVal - 5} - ${playerAttackVal + 5} Damage`)
$playerDefenseDescription.html(`Get a ${playerDefenseMinPossibleVal} - ${playerDefenseMaxPossibleVal} Shield`)
$playerDodgeDescription.html(`Gain ${playerDodgeMinVal}% - ${playerDodgeMaxVal}% Dodge`)

const getRandomNumForDodge = () => {
  const value = Math.floor(Math.random() * 2)
  return value === 0 ? 25 : 50
}

const getRandomNum = (min,max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const checkTurn = () => {
  turn = turn === 0 ? 1 : 0
  takeTurns()
}

const getRandomNumForAttack = () => {
  const randomVal = Math.floor(Math.random() * 6)
  const posOrNeg = Math.floor(Math.random() * 2)
  if(randomVal === 0){
    return randomVal
  } else {
    return randomVal * -1
  }
}

const appearInstruction = () => {
  $instruction.show()
  $instruction.addClass("visibility")
}

const closeInstruction = () => {
  $instruction.hide()
}

const dodgeMoveForPlayer = () => {
  playerDodge = getRandomNumForDodge()
  if(playerDodge > 50){
    playerDodge = 50
  }
  $playerCommentate.html(`${playerName} is feeling dodgey! (${playerDodge}% to Dodge)`)
  checkTurn()
}

const dodgeyMoveForAI = () => {
  enemyDodge = getRandomNumForDodge()
  if(enemyDodge > 50){
    enemyDodge = 50
  }
  $enemyCommentate.html(`${aiName} is feeling dodgey! (${enemyDodge}% to Dodge)`)
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

const defenseMoveForPlayer = () => {
    const finalDefenseVal = getRandomNum(playerDefenseMinPossibleVal,playerDefenseMaxPossibleVal)
    playerDefenseVal += finalDefenseVal
    if(playerDefenseVal > playerDefenseMaxPossibleVal){
      playerDefenseVal = playerDefenseMaxPossibleVal
    }
    $playerCommentate.html(`${playerName} is buffed! (Gets a ${playerDefenseVal} Shield!)`)
    checkTurn()
}

const defenseMoveForAI = () => {
    const finalDefenseVal = getRandomNum(enemyDefenseMinPossibleVal,enemyDefenseMaxPossibleVal)
    enemyDefenseVal += finalDefenseVal
    if(enemyDefenseVal > enemyDefenseMaxPossibleVal){
      enemyDefenseVal = enemyDefenseMaxPossibleVal
    }
    $enemyCommentate.html(`${aiName} is buffed! (Gets a ${enemyDefenseVal} Shield!)`)
    checkTurn()
}


const attackMoveForAI = () => {
  const additionAttackVal = getRandomNumForAttack()
    let modifiedVal =  enemyAttackVal + additionAttackVal
    if(playerDodge > 0 && dodgeCalculate(playerDodge)){
      $playerCommentate.html(`Dodged!`)
      playerDodge = 0
    } else if (playerDefenseVal > 0){
      modifiedVal -= playerDefenseVal
      playerDefenseVal = 0
        if(modifiedVal <= 0){
          $playerCommentate.html(`Blocked!`)
        } else {
          playersCurrentHealth -= modifiedVal
          $enemyCommentate.html(`${aiName} deals ${modifiedVal} Damage!`)
          $playerHealthDisplay.html(playersCurrentHealth)
          $playerHPBar.attr("style",`width: ${playersCurrentHealth}%`)
        }
      } else {
        playersCurrentHealth -= modifiedVal
        $enemyCommentate.html(`${aiName} deals ${modifiedVal} Damage!`)
        $playerHealthDisplay.html(playersCurrentHealth)
        $playerHPBar.attr("style",`width: ${playersCurrentHealth}%`)
      }
  checkTurn()
}

const attackMoveForPlayer = () => {
  const additionAttackVal = getRandomNumForAttack()
    let modifiedVal =  playerAttackVal + additionAttackVal
    if(enemyDodge > 0 && dodgeCalculate(enemyDodge)){
      $enemyCommentate.html(`Dodged!`)
      enemyDodge = 0
    } else if (enemyDefenseVal > 0){
      modifiedVal -= enemyDefenseVal
      enemyDefenseVal = 0
        if(modifiedVal <= 0){
          $enemyCommentate.html(`Blocked!`)
        } else {
          enemyCurrentHealth -= modifiedVal
          $playerCommentate.html(`${playerName} deals ${modifiedVal} Damage!`)
          $enemyHealthDisplay.html(enemyCurrentHealth)
          $enemyHPBar.attr("style",`width: ${enemyCurrentHealth}%`)
        }
      } else {
        enemyCurrentHealth -= modifiedVal
        $playerCommentate.html(`${playerName} deals ${modifiedVal} Damage!`)
        $enemyHealthDisplay.html(enemyCurrentHealth)
        $enemyHPBar.attr("style",`width: ${enemyCurrentHealth}%`)
      }
  checkTurn()
}


const aiDoingAIStuff = () => {
  const decisiveStrike = getRandomNum(minValForAIMove,maxValForAIMove)

  if(decisiveStrike === 1){
    attackMoveForAI()
  } else if (decisiveStrike === 2){
    defenseMoveForAI()
  } else {
    dodgeyMoveForAI()
  }
}

const playerTurn = () => {
  $attack.on("click",attackMoveForPlayer)
  $defense.on("click",defenseMoveForPlayer)
  $dodge.on("click",dodgeMoveForPlayer)
}

const mainPageManeuver = () => {
    $instruction.hide()
    $instructionBox.on("click",appearInstruction)
    $close.on("click",closeInstruction)
}

const takeTurns = () => {
  turn === 0 ? playerTurn() : aiDoingAIStuff()
}

const init  = () => {
  mainPageManeuver()
  playerTurn()
}

init()
