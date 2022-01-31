const gridContainer = document.querySelector('.grid-container');
const gridLineToggle = document.querySelector('.grid-lines-toggle');
const penControl = document.querySelector('.pen');
const eraserControl = document.querySelector('.eraser');
const rainbowControl = document.querySelector('.rainbow');
const controls = document.querySelectorAll(".control")

setUpGrid();
gridLines();

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

}

function gridLines() {
    const squares = document.querySelectorAll('.square');
    const gridLineToggleClasses = gridLineToggle.classList;
    console.log(gridLineToggleClasses)
    if(gridLineToggle.classList[2] == "disable") {
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
console.log(penControl);

//CONTROLS - PEN - ERASER - RAINBOW
//ALL THREE CONTROLS ONLY WILL BE ENABLED OTHERS WILL BE DISABLED
let penColor = "#000000";
let rainbowActive = false
penControl.addEventListener('click', () => {
    penColor = "#000000"
    penControl.classList.remove('disable')
    eraserControl.classList.add('disable');
    rainbowControl.classList.add('disable');
    rainbowActive = false
})

eraserControl.addEventListener('click', () => {
    penColor = "#ffffff"
    penControl.classList.add('disable')
    eraserControl.classList.remove('disable');
    rainbowControl.classList.add('disable');
    rainbowActive = false
})


rainbowControl.addEventListener('click', () => {
    rainbowActive = true;
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
                    if(rainbowActive != true) {
                        square.style.cssText = `background-color: ${penColor}`;
                        
                        console.log(square.style.cssText)
                    } else {
                        if(colorCode <= 360) {
                            square.style.cssText = `background-color: hsl(${colorCode}, 100%, 50%)`;
                            colorCode++;
                        } else {
                            colorCode = 20;
                        }
                    }
            }
        })
    });
}


// function getActiveControl() {
//     controls.forEach(control => {
//         switch(control.classList[1]) {
//             case "rainbow": return "rainbow";
//             break;
//             case "eraser": return "eraser";
//             break;
//             case "pen": return "pen";
//             break;
//             case "rainbow": return "rainbow";
//             break;
//         }
//     });
// }



//RAINBOW


//slider function
const gridRange = document.querySelector('.grid-range');
gridRange.addEventListener("input", () => {
    setUpGrid(gridRange.value);
})




gridLineToggle.addEventListener('click', () => {
    gridLineToggle.classList.toggle("disable");
    gridLines()
})



