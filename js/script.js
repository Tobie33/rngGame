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
const $player = $("#player")
const $enemy = $("#enemy")
const $turnCounter = $("#turn-counter")
const $popUpBox = $("#pop-up")
const $retryButton = $("#retry-button")
const $popUpHeader = $("#pop-up-header")
const $popUpPassage = $("#pop-up-passage")
const $enemyMaxHP = $("#enemy-max-hp")

const playerMaxHealth = 100
const playerName = "Dismas"
const aiName = "Skeleton"
const minValForAIMove = 1
const maxValForAIMove = 3

let playersCurrentHealth = 100
let playerAttackVal = 1000
let playerDodge = 0
const playerRegenMinPossibleVal = 0
let playerRegenMaxPossibleVal = 20
let playerDodgeMinVal = 25
let playerDodgeMaxVal = 50

let enemyCurrentHealth = 100
let enemyMaxHealth = 100
let enemyAttackVal = 11
let enemyDodge = 0
const enemyRegenMinPossibleVal = 0
let enemyRegenMaxPossibleVal = 20

let level = 1
// turn 0 = player's turn, turn 1 = ai's turn
let turn = 0



const levelThreeStage = () => {
  level = 3
  $popUpBox.hide()
  playersCurrentHealth = 100
  playerDodge = 0
  playerDodgeMinVal = 50
  playerDodgeMaxVal = 75
  playerAttackVal = 200
  playerRegenMaxPossibleVal = 35
  $playerHealthDisplay.html(playersCurrentHealth)
  $playerHPBar.attr("style",`width: ${playersCurrentHealth}%`)
  $player.attr("src","images/player_idle.png")


  enemyCurrentHealth = 100
  enemyDodge = 0
  enemyAttackVal = 23
  enemyRegenMaxPossibleVal = 35
  enemyMaxHealth = 130
  $enemy.attr("src","images/enemy_idle.png")
  $enemyHealthDisplay.html(enemyCurrentHealth)
  $enemyHPBar.attr("style",`width: ${enemyCurrentHealth}%`)
  $enemyMaxHP.html(enemyMaxHealth)

  $playerCommentate.html("")
  $enemyCommentate.html("")
  $turnCounter.html("Final Level!")
  turn = 0
  playerTurn()
}

const levelTwoStage = () => {
  level = 2
  $popUpBox.hide()
  playersCurrentHealth = 100
  playerDodge = 0
  playerDodgeMaxVal = 75
  playerAttackVal = 150
  playerRegenMaxPossibleVal = 30
  $playerHealthDisplay.html(playersCurrentHealth)
  $playerHPBar.attr("style",`width: ${playersCurrentHealth}%`)
  $player.attr("src","images/player_idle.png")


  enemyCurrentHealth = 100
  enemyDodge = 0
  enemyAttackVal = 17
  enemyRegenMaxPossibleVal = 35
  enemyMaxHealth = 115
  $enemy.attr("src","images/enemy_idle.png")
  $enemyHealthDisplay.html(enemyCurrentHealth)
  $enemyHPBar.attr("style",`width: ${enemyCurrentHealth}%`)
  $enemyMaxHP.html(enemyMaxHealth)

  $playerCommentate.html("")
  $enemyCommentate.html("")
  $turnCounter.html("Level 2!")
  turn = 0
  playerTurn()
}

const levelUpgrade = () => {
  if(level === 1){
    levelTwoStage()
  } else if (level === 2)
    levelThreeStage()
}

const replayTrial = () => {
  level = 0
  $popUpBox.hide()
  playersCurrentHealth = 100
  playerDodge = 0
  playerDodgeMaxVal = 50
  playerAttackVal = 10
  playerRegenMaxPossibleVal = 20
  $playerHealthDisplay.html(playersCurrentHealth)
  $playerHPBar.attr("style",`width: ${playersCurrentHealth}%`)
  $player.attr("src","images/player_idle.png")



  enemyCurrentHealth = 100
  enemyDodge = 0
  enemyAttackVal = 11
  enemyRegenMaxPossibleVal = 20
  enemyMaxHealth = 100
  $enemy.attr("src","images/enemy_idle.png")
  $enemyHealthDisplay.html(enemyCurrentHealth)
  $enemyHPBar.attr("style",`width: ${enemyCurrentHealth}%`)
  $enemyMaxHP.html(enemyMaxHealth)

  $playerCommentate.html("")
  $enemyCommentate.html("")
  $turnCounter.html("Back again, huh?")
  turn = 0
  playerTurn()
}

const retryTrial = () => {
  $popUpBox.hide()
  playersCurrentHealth = 100
  playerDodge = 0
  $playerHealthDisplay.html(playersCurrentHealth)
  $playerHPBar.attr("style",`width: ${playersCurrentHealth}%`)
  $player.attr("src","images/player_idle.png")


  enemyCurrentHealth = 100
  enemyDodge = 0
  $enemy.attr("src","images/enemy_idle.png")
  $enemyHealthDisplay.html(enemyCurrentHealth)
  $enemyHPBar.attr("style",`width: ${enemyCurrentHealth}%`)

  $playerCommentate.html("")
  $enemyCommentate.html("")
  $turnCounter.html("Back again, huh?")
  turn = 0
  playerTurn()
}

const appearPopUpWinningScreen = () => {
  $popUpBox.show()
  $popUpBox.addClass("visibility")
  $popUpHeader.html(`You've won!`)
  $popUpHeader.css("height","25%")
  $popUpPassage.css("height","35%")
  $popUpPassage.css("padding-top","15px")
  if(level === 1 || level === 2){
    $retryButton.one("click",levelUpgrade)
    if (level === 1) {
      $popUpPassage.html(`Proceed? You will have an upgrade on your skills, but so will the enemy.`)
    } else if (level === 2){
    $popUpPassage.html(`Proceed? The enemy will be at their strongest at this level.`)
    }
  } else if(level === 3){
    $popUpPassage.html(`Congratulations! You have defeated the final boss. Wanna try again?`)
    $retryButton.one("click",replayTrial)
  }
}

const appearPopUpLosingScreen = () => {
  $popUpBox.show()
  $popUpBox.addClass("visibility")
  $popUpHeader.html(`You are Dead! :(`)
  $popUpPassage.html(`Retry?`)
  if(level === 1){
    $retryButton.one("click",retryTrial)
  } else if (level === 2) {
    $retryButton.one("click",levelTwoStage)
  } else {
    $retryButton.one("click",levelThreeStage)
  }
}

const checkDeath = () => {
  if(playersCurrentHealth === 0){
    turn = -1
    $turnCounter.html(`Wow, you suck.`)
    $player.attr("src","images/player_dead.png")
    $player.css("height","150px")
    $player.css("width","150px")
    appearPopUpLosingScreen()
  } else if (enemyCurrentHealth === 0){
    turn = -1
    $turnCounter.html(`Not bad.`)
    $enemy.attr("src","images/enemy_dead.png")
    $enemy.css("height","175px")
    $enemy.css("width","175px")
    appearPopUpWinningScreen()
  } else {
    checkTurn()
  }
}

const getRandomNumForDodge = () => {
  const value = Math.floor(Math.random() * 2)
  return value === 0 ? 25 : 50
}

const getRandomNum = (min,max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const swapBackToIdle = () =>{
  $player.attr("src","images/player_idle.png")
  $player.css("width","225px")
  $enemy.attr("src","images/enemy_idle.png")
  $enemy.css("width","225px")
}

const checkTurn = () => {
  if(turn === 0){
    turn = 1;
  } else {
    turn = 0
  }
  setTimeout(swapBackToIdle, 750)
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
  const additionalDodge = getRandomNumForDodge()
  playerDodge += additionalDodge
  if(playerDodge > 50){
    playerDodge = 50
  }
  $player.attr("src","images/player_dodge.png")
  $player.css("width","125px")
  $playerCommentate.html(`${playerName} is feeling dodgey! (${playerDodge}% to Dodge)`)
  checkTurn()
}

const dodgeyMoveForAI = () => {
  const additionalDodge = getRandomNumForDodge()
  enemyDodge += additionalDodge
  if(enemyDodge > 50){
    enemyDodge = 50
  }
  $enemy.attr("src","images/enemy_dodge.png")
  $enemy.css("width","175px")
  $enemyCommentate.html(`${aiName} is feeling dodgey! (${enemyDodge}% to Dodge)`)
  checkTurn()
}

const dodgeCalculate = dodgeVal => {
  const decisiveVal = Math.floor(Math.random() * (100 - 1 + 1) + 1)
  console.log(decisiveVal)
  if(decisiveVal < dodgeVal){
    return true
  } else {
    return false
  }

}

const regenHealthForPlayer = () => {
  const additionalHealth = getRandomNum(playerRegenMinPossibleVal,playerRegenMaxPossibleVal)
  playersCurrentHealth += additionalHealth
  if(playersCurrentHealth > 100){
    playersCurrentHealth = 100
  }
  $playerHealthDisplay.html(playersCurrentHealth)
  $playerHPBar.attr("style",`width: ${playersCurrentHealth}%`)
  $playerCommentate.html(`${playerName} is buffed! (Gains a ${additionalHealth} Heal!)`)
  checkTurn()
}

const regenHealthForAI = () => {
  const additionalHealth = getRandomNum(enemyRegenMinPossibleVal,enemyRegenMaxPossibleVal)
  enemyCurrentHealth += additionalHealth
  if(enemyCurrentHealth > 100){
    enemyCurrentHealth = 100
  }
  $enemyHealthDisplay.html(enemyCurrentHealth)
  $enemyHPBar.attr("style",`width: ${enemyCurrentHealth}%`)
  $enemyCommentate.html(`${aiName} is buffed! (Gains a ${additionalHealth} Heal!)`)
  checkTurn()
}

const attackMoveForAI = () => {
  const additionAttackVal = getRandomNumForAttack()
  let finalAttackVal =  enemyAttackVal + additionAttackVal
  $enemy.attr("src","images/enemy_attack.png")
  if(playerDodge > 0 && dodgeCalculate(playerDodge)){
    $playerCommentate.html(`Dodged!`)
    playerDodge = 0
  } else {
      playersCurrentHealth -= finalAttackVal
      $enemyCommentate.html(`${aiName} deals ${finalAttackVal} Damage!`)
      if(playersCurrentHealth <= 0 ){
        playersCurrentHealth = 0
      }
      $player.attr("src","images/player_dodge.png")
      $player.css("width","125px")
      $playerHealthDisplay.html(playersCurrentHealth)
      $playerHPBar.attr("style",`width: ${playersCurrentHealth}%`)
    }
  checkDeath()
}

const attackMoveForPlayer = () => {
  const additionAttackVal = getRandomNumForAttack()
    let finalAttackVal =  playerAttackVal + additionAttackVal
    $player.attr("src","images/player_attack.png")
    if(enemyDodge > 0 && dodgeCalculate(enemyDodge)){
      $enemyCommentate.html(`Dodged!`)
      enemyDodge = 0
    } else {
      enemyCurrentHealth -= finalAttackVal
      $playerCommentate.html(`${playerName} deals ${finalAttackVal} Damage!`)
      if (enemyCurrentHealth <= 0){
        enemyCurrentHealth = 0
      }
      $enemy.attr("src","images/enemy_dodge.png")
      $enemy.css("width","175px")
      $enemyHealthDisplay.html(enemyCurrentHealth)
      $enemyHPBar.attr("style",`width: ${enemyCurrentHealth}%`)
    }
    checkDeath()
}


const aiDoingAIStuff = () => {

  const decisiveStrike = getRandomNum(minValForAIMove,maxValForAIMove)

  if(decisiveStrike === 1){
    attackMoveForAI()
  } else if (decisiveStrike === 2){
    regenHealthForAI()
  } else {
    dodgeyMoveForAI()
  }
}

const playerTurn = () => {
  $attack.one("click",attackMoveForPlayer)
  $defense.one("click",regenHealthForPlayer)
  $dodge.one("click",dodgeMoveForPlayer)
}

const mainPageManeuver = () => {
    $instruction.hide()
    $instructionBox.on("click",appearInstruction)
    $close.on("click",closeInstruction)
}

const takeTurns = () => {
  $attack.off("click",attackMoveForPlayer)
  $defense.off("click",regenHealthForPlayer)
  $dodge.off("click",dodgeMoveForPlayer)
  if (turn === 0) {
    $turnCounter.html(`${playerName}'s turn!`)
    playerTurn()
  }
  if(turn === 1){
    $turnCounter.html(`${aiName} is thinking...`)
    setTimeout(aiDoingAIStuff, 1000)
  }
}

const startGame = () => {
  $playerAttackDescription.html(`Deal ${playerAttackVal - 5} - ${playerAttackVal + 5} Damage`)
  $playerDefenseDescription.html(`Gain a ${playerRegenMinPossibleVal} - ${playerRegenMaxPossibleVal} Heal`)
  $playerDodgeDescription.html(`Gain ${playerDodgeMinVal}% - ${playerDodgeMaxVal}% Dodge`)
  $popUpBox.hide()
  playerTurn()
}
const init  = () => {

  mainPageManeuver()
  startGame()
}

init()
