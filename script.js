const gridContainer = document.querySelector('.grid-container');
const gridLineToggle = document.querySelector('.grid-lines-toggle');

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

//SKETCH
function clickEvent() {
    const squares = document.querySelectorAll('.square');
    let colorCode = 1;
    squares.forEach((square) => {
        square.addEventListener('mousemove', (e)=> {
            if(e.buttons === 1) {
                //square.style.cssText = "background-color: #1;";
                if(colorCode <= 360) {
                    square.style.cssText = `background-color: hsl(${colorCode}, 100%, 50%)`;
                    colorCode++;
                } else {
                    colorCode = 20;
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


//TOGGLES

//PEN ERASER RAINBOW TOGGLE
controls.forEach(control => {
    control.classList.toggle('disable');
    control.addEventListener('click', () => {
        control.classList.toggle('active')
    })
})

gridLineToggle.addEventListener('click', () => {
    gridLineToggle.classList.toggle("disable");
    gridLines()
})





