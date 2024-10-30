const clickerEl = document.querySelector(".playarea__clicker");
const counterEl = document.querySelector(".counter__current");
const powerupsEl = document.querySelector(".powerups")

let counter = +localStorage.getItem("score");
// let counter = 2000
counterEl.innerHTML = counter;



const powerups =[
    {   
        title: "Уничтожить Microsoft",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 100,
        amount: 0,
        profit: 0,
        value: 1,
        coef: 1.1,
        onclick: true
    },
    {
        title: "Уничтожить JetBrains",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 200,
        amount: 0,
        profit: 0,
        value: 2,
        coef: 1.2
    },
    {
        title: "Избавиться от VsCode",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 300,
        amount: 0,
        profit: 0,
        value: 3,
        coef: 1.3
    },
    {
        title: "Избавиться от VisualStudio",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 400,
        amount: 0,
        profit: 0,
        value: 4,
        coef: 1.4,
        onclick: true
    },
    {
        title: "Захватить мир",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 500,
        amount: 0,
        profit: 0,
        value: 5,
        coef: 1.5
    },
    {
        title: "Дать в рыло Иваненкову",
        price: function () {
            return calcPrice.call(this)
        },
        initialPrice: 600,
        amount: 0,
        profit: 0,
        value: 6,
        coef: 1.6
    },
];

function calcPrice() {
    if(this.amount <= 0) {
        return this.initialPrice;
    } else if (this.amount >= 1) {
        return Math.round(
            this.initialPrice + (this.initialPrice / this.coef) * this.amount
        );
    }  
}

clickerEl.addEventListener("click", () => {
    counter += clickValue
    counterEl.innerHTML = counter
})

//савыч ты лоооооох хахахахаха блин кушай мою базу данных аксэс)

setInterval(() => {
    powerups.forEach(el => el.profit = el.amount * el.value)
    const profitPersec = powerups.reduce((acc, val) => val.onclick ? acc : acc + val.profit , 0)
    counter += profitPersec
    counterEl.innerHTML = counter
    localStorage.setItem("score", counter)
}, 1000)

const generatePowerUp = (powerup) => {
    return `<div class="powerup">
    <div class="powerup__title">${powerup.title}</div>
    <div class="powerup__price">${powerup.price()}</div>
    <div class="powerup__amount">${powerup.amount}</div>
    <div class="profit">
        <span class="profit__value">${powerup.profit}</span>
        <span class="profit__desc"> / s</span>
    </div>
 </div>`
};

const handleClick = (e) => {
    const clickedPowerup = e.target
    .closest(".powerup")
    .querySelector(".powerup__title").innerHTML;
const selectedPowerup = powerups.find(
    (powerup) => clickedPowerup === powerup.title
);
    console.log(selectedPowerup.price)
    buyPowerup(selectedPowerup)
};


const renderPowerups = () => {
    powerupsEl.innerHTML = powerups
    .map((powerup) => generatePowerUp(powerup))
    .join("");

    const powerupEls = Array.from(powerupsEl.children)
    powerupEls.forEach(element => {
    element.addEventListener("click", handleClick)
});
};

const buyPowerup = (powerup) => {
    if (counter >= powerup.price()) {
    counter -= powerup.price();
    powerup.amount ++;
    renderPowerups();
    counterEl.innerHTML = counter;
    }
    else {
        alert("Деняг нет")
    }
}

renderPowerups()


