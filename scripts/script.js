const openInstructions = document.getElementById('instructions');
const instructionsContainerId = document.getElementById('instructions-containerId');
const closeInstructions = document.getElementById('close-instructions');

const openCredits = document.getElementById('credits');
const creditsContainerId = document.getElementById('credits-containerId');
const closeCredits = document.getElementById('close-credits');

const openAudio = document.getElementById("audio");
const audioContainerId = document.getElementById("audio-containerId");
const closeAudio = document.getElementById("close-audio")



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


openAudio.addEventListener('click', () => {
    audioContainerId.classList.add('show');
});
closeAudio.addEventListener('click', () => {
    audioContainerId.classList.remove('show');
})