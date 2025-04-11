let listOfNumbersDrawn = [];
let limitNumber = 100;
let secretNumber = randomNumberGen();
let attempts = 1;
/**
 * @param {HTMLElement} className
 * @param {string} text
 */
function displayTextOnScreen(className, text) {
  let field = document.querySelector(className);
  field.textContent = text;
  if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.5;
    window.speechSynthesis.speak(utterance);
  } else {
    console.log('Web Speech API não suportada neste navegador.');
  }
}

function displayInitialMesage() {
  displayTextOnScreen('h1', 'Jogo do numero Secreto');
  displayTextOnScreen('p', 'escolha um numero entre 1 e 100');
}

displayInitialMesage();

function checkKick() {
  let guess = document.querySelector('input').value;
  let attemptWord = attempts > 1 ? 'tentativas' : 'tentativa';
  if (guess == secretNumber) {
    displayTextOnScreen('h1', 'Acertou!');
    displayTextOnScreen('p', `Você descubriu o numero secreto em ${attempts} ${attemptWord}`);
    document.querySelector('#reiniciar').removeAttribute('disabled');
  } else if (guess > secretNumber) {
    displayTextOnScreen('h1', 'Errou!');
    displayTextOnScreen('p', `O numero secreto é menor que ${guess}`);
  } else {
    displayTextOnScreen('h1', 'Errou!');
    displayTextOnScreen('p', `O numero secreto e maior que ${guess}`);
  }
  attempts++;
  clearField();
}

function randomNumberGen() {
  let chosenNumber = parseInt(Math.random() * limitNumber + 1);
  let numberOfElementsInTheList = listOfNumbersDrawn.length;

  if (numberOfElementsInTheList == limitNumber) {
    listOfNumbersDrawn = [];
  }

  if (listOfNumbersDrawn.includes(chosenNumber)) {
    return randomNumberGen();
  } else {
    listOfNumbersDrawn.push(chosenNumber);
    console.log(listOfNumbersDrawn);
    return chosenNumber;
  }
}

function clearField() {
  guess = document.querySelector('input');
  guess.value = '';
}

function restartGame() {
  secretNumber = randomNumberGen();
  // console.log(secretNumber);
  clearField();
  attempts = 1;
  displayInitialMesage();
  document.querySelector('#reiniciar').setAttribute('disabled', true);
}
