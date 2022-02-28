function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if(!audio) return; //stops function from running
    audio.currentTime = 0; //lets you play the key over and over quickly
    audio.play();
    key.classList.add('playing'); //adds decorative properties when key is pushed    
};

function removeTransition(e) {
    if(e.propertyName !== 'transform') return; // skip if not a transform 
    this.classList.remove('playing'); //when transition ends, remove the decorative properties
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition)); //listening to when the transition ends on all keys

window.addEventListener('keydown', playSound);