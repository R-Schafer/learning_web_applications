let state = 0;

const number = document.getElementById("number")
render()

document.getElementById("up").addEventListener('click', add)
document.getElementById("down").addEventListener('click', subtract)

function add(e){
    state += 1
    render()
}

function subtract(e){
    state -= 1
    render()
}

function render() {
    number.innerText = state;
}