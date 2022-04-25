"use strict"

const playbox = document.querySelector('.container__playbox');
const clearButton = document.querySelector('.clear-button');
const blackButton = document.querySelector('.black-color');
const randomButton = document.querySelector('.random-color');
const gridSizeButton = document.querySelector('.grid-size-button');

let size = 16;
let color = 'black';

clearButton.addEventListener('click', clearThePlayfield);
blackButton.addEventListener('click', () => color = 'black');
randomButton.addEventListener('click', () => color = 'random');
gridSizeButton.addEventListener('click', setGridSize);

function generateTheGrid(number) {
    const divs = playbox.querySelectorAll('div');
    if (divs) {
        divs.forEach(div => playbox.removeChild(div));
    }
    for (let i = 1; i <= number**2; i++) {
        const div = document.createElement('div');
        div.setAttribute('style', "border: 1px solid rgba(0, 0, 0, 0.3);");
        div.addEventListener('mouseover', changeColor);
        playbox.appendChild(div);
    }
    playbox.setAttribute('style', `grid-template-columns: repeat(${number}, 1fr); grid-template-rows: repeat(${number}, 1fr);`);
}

function setColor() {
    if (color == 'black') {
        return 'rgb(0, 0, 0)';
    } else if (color == 'random') {
        const R = Math.floor(Math.random()*256 + 1);
        const G = Math.floor(Math.random()*256 + 1);
        const B = Math.floor(Math.random()*256 + 1);
        return `rgb(${R}, ${G}, ${B})`;   
    }
}

function clearThePlayfield(e) {
    const divs = playbox.querySelectorAll('div');

    if (divs) {
        divs.forEach(div => playbox.removeChild(div));
        generateTheGrid(size);
    }
}

function changeColor(e) {
    const currentDiv = e.target;
    currentDiv.setAttribute('style', `background-color: ${setColor()}; border: 1px solid rgba(0, 0, 0, 0.3);`);
}

function setGridSize() {
    size = prompt('Set the grid size (from 1 to 100): ');
    if (size >= 1 && size <= 100) {
        generateTheGrid(size);
    } else {
        alert('size must be from 1 to 100!');
        setGridSize();
    }
    
}

window.addEventListener('load', generateTheGrid(16), {once: true});