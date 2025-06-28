import {questions} from './question.js'
import {digital} from './controllers.js'
import {loadQuestion} from './controllers.js'
import {clearCheckBox} from './controllers.js'
import {tick} from './controllers.js'
import {submit} from './controllers.js'

const optionsCheckbox = document.querySelectorAll('input[type="radio"]');
const nextBtn = document.querySelector('.nextBtn');
const prevBtn = document.querySelector('.prevBtn');
const attempts = document.querySelector('.attempts');
const timer = document.querySelector('.timer');
const submitBtn = document.querySelector('.submit');

let sqn = 0;
const omr = {};

let totalTime = 30; //sec

let key = setInterval(()=>{
  timer.innerText = digital(totalTime--) 
  if(totalTime < 0){
    clearInterval(key)
    submit(omr);
  }
},1000)


loadQuestion(0);
attempts.innerText = `${Object.keys(omr).length} / ${questions.length}`;
timer.innerText = digital(totalTime);

//if next of prev button clicked,
// 1. clear all CheckBox
// 2. load new question to html
// 3. if question is attempted tick the option.
[nextBtn, prevBtn].forEach(button => {
  button.addEventListener('click', (event)=>{
    clearCheckBox();
    if(event.target.className === 'nextBtn'){
      loadQuestion( sqn >=0 && sqn < questions.length-1 ? ++sqn : sqn );
    } else {
      loadQuestion( sqn > 0 && sqn < questions.length ? --sqn : sqn );
    }
    // if question is attempted, tick the option.
    if(Object.keys(omr).includes(questions[sqn].id)){
      tick(omr[questions[sqn].id])
    }

  })
})

// listen all checkbox and put the answer to omr like {'q1' : 'b', 'q2' : 'a'}
optionsCheckbox.forEach( (opt) => {
  opt.addEventListener('click', (event)=>{
    omr[questions[sqn].id] = event.target.value
    attempts.innerText = `${Object.keys(omr).length} / ${questions.length}`;
    console.log(omr)
  })
})

submitBtn.onclick = ()=>submit(omr);




