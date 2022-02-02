const gridContainer = document.querySelector('.grid-container');
const gridLineToggle = document.querySelector('.grid-lines-toggle');
const penControl = document.querySelector('.pen');
const eraserControl = document.querySelector('.eraser');
const rainbowControl = document.querySelector('.rainbow');
const controls = document.querySelectorAll(".control");
const backgroundChanger = document.querySelector('.background-changer');

const gridLineSwitch = document.querySelector('input[type=checkbox]');


setUpGrid();
gridLines();
setUpBackgroundColor();
function setUpGrid(size = 25) {
    //REFRESH
    gridContainer.innerHTML = "";
    gridContainer.style.cssText = `grid-template-columns: repeat(${size}, 1fr); grid-template-rows: repeat(${size}, 1fr);`;
    const rangeNum = document.querySelector('.grid-range-num');
    for(let x = 0; x < size; x++) {
        for(let y = 0; y < size; y++) {
            const div = document.createElement('div');
            div.classList.add("square");
            gridContainer.appendChild(div)
        }
    }
    rangeNum.innerHTML = `${size} <i class="fas fa-times"></i> ${size}`;
    clickEvent();
    gridLines();
    setUpBackgroundColor();

}



function gridLines() {
    console.log(document.querySelector("input[type=checkbox]").checked)
    const squares = document.querySelectorAll('.square');
    if(gridLineSwitch.checked == false) {
        console.log("disable")
        squares.forEach(element => {
            element.classList.add('grid-lines-disable');
            element.classList.remove("grid-lines-active")
        });
    } else {
        console.log("active")
        squares.forEach(element => {
            element.classList.remove('grid-lines-disable');
            element.classList.add('grid-lines-active')
        });
        
    }
}

gridLineSwitch.addEventListener('change', gridLines)




function setUpBackgroundColor() {
    gridContainer.style.backgroundColor = backgroundChanger.value;
}
backgroundChanger.addEventListener('input', setUpBackgroundColor)

//CONTROLS - PEN - ERASER - RAINBOW
//ALL THREE CONTROLS ONLY WILL BE ENABLED OTHERS WILL BE DISABLED
let penColor = "#000000";
let rainbowActive = false;
let eraserActive = false;
penControl.addEventListener('click', () => {
    penColor = "#000000";
    eraserActive = false;
    penControl.classList.remove('disable')
    eraserControl.classList.add('disable');
    rainbowControl.classList.add('disable');
    rainbowActive = false
})

eraserControl.addEventListener('click', () => {
    eraserActive = true;
    penControl.classList.add('disable')
    eraserControl.classList.remove('disable');
    rainbowControl.classList.add('disable');
    rainbowActive = false
})


rainbowControl.addEventListener('click', () => {
    rainbowActive = true;
    eraserActive = false;
    penControl.classList.add('disable')
    eraserControl.classList.add('disable');
    rainbowControl.classList.remove('disable');
});

//RAINBOW PEN FUNCTION


//SKETCH
function clickEvent() {
    const squares = document.querySelectorAll('.square');
    let colorCode = 1;
    squares.forEach((square) => {
        square.addEventListener('mousemove', (e)=> {
            if(e.buttons === 1) {
                if(eraserActive == true){
                    square.style.backgroundColor = ""
                } else if(rainbowActive == true) {
                    if(colorCode <= 360) {
                        square.style.cssText = `background-color: hsl(${colorCode}, 100%, 50%)`;
                        colorCode++;
                    } else {
                        colorCode = 20;
                    }
                } else {
                    square.style.cssText = `background-color: ${penColor}`
                }
            }
        })
    });
}




//slider function
const gridRange = document.querySelector('.grid-range');
gridRange.addEventListener("input", () => {
    setUpGrid(gridRange.value);
})

