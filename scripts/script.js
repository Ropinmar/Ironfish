const openInstructions = document.getElementById('instructions');
const instructionsContainerId = document.getElementById('instructions-containerId');
const closeInstructions = document.getElementById('close-instructions');

const openCredits = document.getElementById('credits');
const creditsContainerId = document.getElementById('credits-containerId');
const closeCredits = document.getElementById('close-credits');

openInstructions.addEventListener('click', ()=>{
    instructionsContainerId.classList.add('show');
    // alert('hola');
});

closeInstructions.addEventListener('click', ()=>{
    instructionsContainerId.classList.remove('show');
});



openCredits.addEventListener('click', ()=>{
    creditsContainerId.classList.add('show');
});

closeCredits.addEventListener('click', ()=>{
    creditsContainerId.classList.remove('show');
});