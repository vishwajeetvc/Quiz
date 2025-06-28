import {questions} from './question.js'

const optionsSpan = document.querySelectorAll('.option');
const questionBox = document.querySelector('.questionBox');
const optionsCheckbox = document.querySelectorAll('input[type="radio"]');

export function digital(sec){
  let m = String(Math.floor(sec/60));
  let s = String(Math.floor(sec%60));
  return `${m.length < 2 ? 0+m : m}:${s.length < 2 ? 0+s : s}`
}

export function loadQuestion(no){
  questionBox.innerText = questions[no].question;
  for(let i = 0; i < 4; i++){
    optionsSpan[i].innerText = questions[no].options[i];
  }
}

export function clearCheckBox(){
  optionsCheckbox.forEach( (opt) => {
    opt.checked = false;
  })
}
export function tick(opt){
  switch (opt) {
    case '0' : {
      optionsCheckbox[0].checked = true;
      break;
    }
    case '1' : {
      optionsCheckbox[1].checked = true;
      break;
    }
    case '2' : {
      optionsCheckbox[2].checked = true;
      break;
    }
    case '3' : {
      optionsCheckbox[3].checked = true;
      break;
    }
  }
}

export function submit(omr){
  const cont = document.querySelector('.cont');

  let score = 0;
  for(let [id, ans] of Object.entries(omr)){

    questions.forEach(qtn => {
      if(qtn.id == id){
        if(qtn.answer == qtn.options[+ans]){
          score++;
        }
      }
    })

  }
  cont.innerHTML = `
    <div class="scoreBox">
      <p>Your score is 
        <span id="scoreValue">${score}</span> / 
        <span id="totalQuestions">${questions.length}</span>
      </p>
    </div>`
}
