console.log("hello")

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
let timeTag = document.querySelector(".time span b")
let mistakeTag = document.querySelector(".mistake span")
let wpmTag = document.querySelector(".wpm span")
let cpmTag = document.querySelector(".cpm span")
let tryAgainBtn = document.querySelector("button")

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0

function randomParagraph(){
    //getting random number and it'll always less than the para length
    let randIndex = Math.floor(Math.random() * paragraphs.length)
    typingText.innerHTML = ""
    // getting random item from the paragraphs arrays, splitting all character of it , adding each character inside span and then adding this span inside p
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`
        typingText.innerHTML += spanTag
    });
    typingText.querySelectorAll("span")[0].classList.add("active")
    document.addEventListener("keydown", () => inpField.focus())
    typingText.addEventListener("click", () => inpField.focus())
}
function initTyping(){
    const characters = typingText.querySelectorAll("span")
    let typedChar = inpField.value.split("")[charIndex]
   
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){ //once the timer start, it won't restartagain on every key clicked
            timer = setInterval(initTimer, 1000)
            isTyping = true
        }
        
        if(typedChar == null){
            charIndex-- // decrement charIndex
            // decrement mistakes only if the charInde span contains incorrect class
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--
            }
            characters[charIndex].classList.remove("correct", "incorrect")
        }else{
            if(characters[charIndex].innerText === typedChar){
                //if user typed character and shown character matched then add the correct class else else increament the mistakes and add the incorrect class
                characters[charIndex].classList.add("correct")
            }else{
                mistakes++
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++
        }
       
        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active")
    
        let wpm = Math.round((((charIndex -  mistakes) / 5) / (maxTime - timeLeft)) * 60)
        //if wpm value is 0 , empty, infinity then setting its value to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm
        mistakeTag.innerText = mistakes
        wpmTag.innerText = wpm
        cpmTag.innerText = charIndex - mistakes //cpm will not count mistakes
    }else{
        inpField.value = ""
        clearInterval(timer)
    }

}

function initTimer(){
    if(timeLeft > 0){
        timeLeft--
        timeTag.innerText = timeLeft
    }else{
        clearInterval(timer)
    }
}
function resetGame() {
    // calling loadPragraph function and resettinh each variables and elements value to default
    randomParagraph()
    inpField.value = ""
    clearInterval(timer)
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0
    timeTag.innerText = timeLeft
    mistakeTag.innerText = mistakes
    wpmTag.innerText = 0
    cpmTag.innerText = 0 
}

randomParagraph()
inpField.addEventListener("input", initTyping)
tryAgainBtn.addEventListener("click", resetGame)