/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const IMAGE_CHECKED = "images/checked.png";
const IMAGE_UNCHECKED = "images/unchecked.png";


function testCompleted(){ 
    
    if(divscelti[0] !== undefined && divscelti[1] !== undefined && divscelti[2] !== undefined){
        return true;
    }
    else{
        return false;
    }
}


function alreadySelectedone( div, alldiv ){
    for(const elemdiv of alldiv){
    if(div.dataset.questionId ===  elemdiv.dataset.questionId){
        if(elemdiv.classList.contains('selected')){
            return elemdiv;
        }
    }
    }
    return null;
}

function selectedd(div, alldiv){
    const check_image= div.querySelector('.choice-grid div .checkbox');
    check_image.src = IMAGE_CHECKED;
    
    div.classList.add('selected');

    if(div.classList.contains('opacity')){
        div.classList.remove('opacity');
    }

    for(const elemdiv of alldiv){
        
        if(elemdiv.dataset.choiceId !== div.dataset.choiceId && elemdiv.dataset.questionId === div.dataset.questionId){
                elemdiv.classList.add('opacity');
        }
    }
}

function result(){
    
    const util ={
        blep: 0,
        happy: 0,
        sleeping: 0,
        dopey: 0,
        burger: 0,
        cart: 0,
        nerd: 0,
        shy: 0,
        sleepy: 0
    };

    for(let i = 0; i < 3; i++){
        if(divscelti[i].dataset.choiceId === 'blep'){
            util.blep++;
        }
        if(divscelti[i].dataset.choiceId === 'happy'){
            util.happy++;
        }
        if(divscelti[i].dataset.choiceId === 'sleeping'){
            util.sleeping++;
        }
        if(divscelti[i].dataset.choiceId === 'dopey'){
            util.dopey++;
        }
        if(divscelti[i].dataset.choiceId === 'burger'){
            util.burger++;;
        }
        if(divscelti[i].dataset.choiceId === 'cart'){
            util.cart++;
        }
        if(divscelti[i].dataset.choiceId === 'nerd'){
            util.nerd++;
        }
        if(divscelti[i].dataset.choiceId === 'shy'){
            util.shy++;
        }
        if(divscelti[i].dataset.choiceId === 'sleepy'){
            util.sleepy++;
        }
    }

    var max = 0;
    var personality = null;
    for( let key in util){      
        if( util[key] > max){
            max = util[key];
            personality = key;
           
        }
    }

    if( max === 1){
        for(const elem of divscelti){
            if(elem.dataset.questionId === 'one'){
                personality = elem.dataset.choiceId;
            }
        }
    }
    

    const intestazione = document.querySelector('.results h1');
    const contenuto = document.querySelector('.results p');
    intestazione.textContent = RESULTS_MAP[personality].title;
    contenuto.textContent = RESULTS_MAP[personality].contents;

}

function onClickElem(event){
    const div = event.currentTarget; 
    const alldiv = document.querySelectorAll(' .choice-grid div');
    const elemdiv = alreadySelectedone(div, alldiv);
    if(elemdiv !== null && elemdiv.dataset.choiceId !== div.dataset.choiceId){

        const check_image = elemdiv.querySelector('.choice-grid div .checkbox');
        check_image.src = IMAGE_UNCHECKED;
        elemdiv.classList.remove('selected');
        selectedd(div, alldiv);
        if(div.dataset.questionId === 'one'){
        divscelti.splice( 0, 1, div);
        }
        if(div.dataset.questionId === 'two'){
            divscelti.splice( 1, 1, div);
        }
        if(div.dataset.questionId === 'three'){
            divscelti.splice( 2, 1, div);
        }
    }
    else{
        selectedd(div, alldiv);
        if(div.dataset.questionId === 'one'){
            divscelti.splice( 0, 1, div);
        }
        if(div.dataset.questionId === 'two'){ 
            divscelti.splice( 1, 1, div);
        }
        if(div.dataset.questionId === 'three'){
            divscelti.splice( 2, 1, div);
        }

    }

    if(testCompleted()){
        for(const elem of elementList){
            elem.removeEventListener('click', onClickElem);
        }

        result();
    }

}

function reset(){
    for(const elem of elementList){
        if(elem.classList.contains('selected')){
            elem.classList.remove('selected');
            const check_image = elem.querySelector('.choice-grid div .checkbox');
            check_image.src = IMAGE_UNCHECKED;
        }
        if(elem.classList.contains('opacity')){
            elem.classList.remove('opacity');
        }

        divscelti[0] = undefined;
        divscelti[1] = undefined;
        divscelti[2] = undefined;
    }

    const intestazione = document.querySelector('.results h1');
    const contenuto = document.querySelector('.results p');
    intestazione.textContent = '';
    contenuto.textContent = '';


    for( const elem of elementList){
        elem.addEventListener('click', onClickElem);
    }
}



const divscelti = [];
divscelti[0] = undefined;
divscelti[1] = undefined;
divscelti[2] = undefined;
let elementList = document.querySelectorAll(' .choice-grid div');
for( const elem of elementList){
    elem.addEventListener('click', onClickElem);
}

const button = document.querySelector('#reset-quiz');
button.addEventListener('click', reset);