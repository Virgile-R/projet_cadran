"use strict";

let dial = document.getElementById("dial");
const selectedCode = []
let secretCode = Math.floor(Math.random() * (999-100+1)+100).toString();

let tries = 0
const keypadScreen = document.querySelector('.calculator__screen')
const guessContainer = document.querySelector('.guess-container')
const guessArray = []
// Méthode 1 (on laisse le CSS gérer le positionnement de la touche 0)
for(let i = 0; i < 10; i++)
{
    let keyBoardKey = document.createElement("div");
    keyBoardKey.innerText = i;
    keyBoardKey.classList.add("keyBoardKey");  
    dial.appendChild(keyBoardKey);
    keyBoardKey.addEventListener('click', (e) => {
        e.target.classList.add('active')
        setTimeout(() => e.target.classList.remove('active'), 200)
        keypadScreen.value = keypadScreen.value + e.target.innerText
        selectedCode.push(e.target.innerText)
        if (selectedCode.length === 3){
            tries++
            if (checkCode()) {
                alert(`I AM SMART tries: ${tries} `)
                window.location.replace('/accueil.html')
                tries = 0
                secretCode = Math.floor(Math.random() * (999-100+1)+100).toString();
                localStorage.setItem('isWinner', JSON.stringify(true))
                clearKeyboard()
            } else {
                guessArray.push(selectedCode)
                if (guessArray.length >= 10) {
                    gameOver()
                } else {
                    createGuessHintCard(selectedCode)
                  
                    clearKeyboard()
                }
            }
        }
    })
}

const createGuessHintCard = (guess) => {

    for (let i = 0; i < guess.length; i++) {
        const letterTile = document.createElement('div')
        letterTile.innerText = guess[i]
        letterTile.classList.add('letter-tile')
        if (guess[i] === secretCode[i] && guess.indexOf(guess[i]) === secretCode.indexOf(secretCode[i])) {
                letterTile.style.backgroundColor = '#86DC3D'
                
            }
            else if (secretCode.includes(guess[i])) {
                letterTile.style.backgroundColor = '#E1FF00'
                
            }
            else if (!secretCode.includes(guess[i])) {
                letterTile.style.backgroundColor = '#DE3700'
            }

      
        guessContainer.appendChild(letterTile)
    }
} 

const checkCode = () => {
    const inputedCode = selectedCode.join('')
     if (inputedCode === secretCode) {
         return true
     }
     return false
}
const clearKeyboard = () => {
    selectedCode.length = 0
    keypadScreen.value = ""
}
const gameOver = () => {
    alert('Sorry, Try again ☹')
    guessArray.length = 0
    tries = 0
    guessContainer.replaceChildren()
    clearKeyboard()
}
window.addEventListener('load', () => {
    clearKeyboard()
    localStorage.setItem('isWinner', JSON.stringify(false))
})
