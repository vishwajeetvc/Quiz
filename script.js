import {questions} from './question.js'

const optionsCheckbox = document.querySelectorAll('input[type="radio"]');
const optionsSpan = document.querySelectorAll('.option');
const questionBox = document.querySelector('.questionBox');

const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');


let sqn = 0;
const omr = {};

loadQuestion(0);

[nextBtn, prevBtn].forEach(button => {
  button.addEventListener('click', (event)=>{
    clearCheckBox();
    if(event.target.className === 'nextBtn'){
      loadQuestion( sqn >=0 && sqn < questions.length-1 ? ++sqn : sqn );
      if(Object.keys(omr).includes(questions[sqn].id)){
        tick(omr[questions[sqn].id])
      }
    } else {
      loadQuestion( sqn >= 0 && sqn < questions.length ? --sqn : sqn+1 );

      if(Object.keys(omr).includes(questions[sqn].id)){
        tick(omr[questions[sqn].id])
      }

    }
  })
})

optionsCheckbox.forEach( (opt) => {
  opt.addEventListener('click', (event)=>{
    omr[questions[sqn].id] = event.target.value
    console.log(omr)
  })
})

function tick(opt){
  switch (opt) {
    case 'a' : {
      optionsCheckbox[0].checked = true;
      break;
    }
    case 'b' : {
      optionsCheckbox[1].checked = true;
      break;
    }
    case 'c' : {
      optionsCheckbox[2].checked = true;
      break;
    }
    case 'd' : {
      optionsCheckbox[3].checked = true;
      break;
    }
  }
}

function loadQuestion(no){
  questionBox.innerText = questions[no].question;
  for(let i = 0; i < 4; i++){
    optionsSpan[i].innerText = questions[no].options[i];
  }
}
function clearCheckBox(){
  optionsCheckbox.forEach( (opt) => {
    opt.checked = false;
  })
}




let obj = {q1: 'a', q2: 'c', q3: 'd', q4: 'b', q5: 'c' };

console.log(Object.keys(obj).includes('q1'))
