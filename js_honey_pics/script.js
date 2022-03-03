document.querySelector('button').addEventListener('click', hide)

function hide(){
    document.querySelector('#honey5').style.display = 'none'
    document.querySelector('#honey1').style.display = 'none'
    document.querySelector('#honey3').style.display = 'none'
    document.querySelector('#honey4').style.display = 'none'
    document.querySelector('#honey2').classList.add('chosen');
}