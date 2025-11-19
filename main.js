const $btn = document.getElementById('btn-kick');
const $btnU = document.getElementById('btn-ultimate');
const $logs = document.getElementById('logs')

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    defaultEnergy: 10,
    energy: 0,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    elEnergy: document.getElementById('energy-character'),
}

const enemy = {
    name: "Charmander",
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

$btn.addEventListener('click', function() {
    changeHP.call(character, random(20));
    changeEnergy.call(character, random(4));
    changeHP.call(enemy, random(20));
});

$btnU.addEventListener('click', function() {
    changeHP.call(enemy, random(40) + 20);
    character.energy = 0;
    renderEnergy.call(character);
    $btnU.disabled = true;
});

function init() {
    console.log('Start Game!');
    renderHP.call(character);
    renderEnergy.call(character);
    renderHP.call(enemy);
    $btnU.disabled = true;
}

function renderHP() {
    renderHPLife.call(this);
    renderProgressbarHP.call(this);
}

function renderHPLife() {
    const {elHP, damageHP, defaultHP } = this
    elHP.innerText = damageHP + ' / ' + defaultHP;
}

function renderProgressbarHP() {
    const {elProgressbar, damageHP} = this
    elProgressbar.style.width = damageHP + '%';
    if (damageHP > 65) {
        elProgressbar.style.background = 'light-green';
    } else if (damageHP > 35) {
        elProgressbar.style.background = 'yellow';
    } else {
        elProgressbar.style.background = 'red';
    }
}

function renderEnergy() {
    const {elEnergy, energy, defaultEnergy} = this
    elEnergy.innerText = energy + ' / ' + defaultEnergy;
}

function changeHP(count) {
    const { name, defaultHP } = this
    if (this.damageHP < count) {
        this.damageHP = 0;
        alert('Бедный ' + name + ' проиграйл бой!');
        $btn.disabled = true;
        $btnU.disabled = true;
    } else if (count > 20) { //Це логіка для супер атаки, оскільки звичайна атака завжди <= 20, а супер атака навпаки
        this.damageHP -= count;

        if ($logs.children.length >= 6) {
            $logs.removeChild($logs.lastChild);
        }

        console.log(`${character.name} затосував СУПЕР атаку! ${count},  ${this.damageHP}/${defaultHP}`);
        const $p = document.createElement('p');
        $p.innerText = `${character.name} затосував СУПЕР атаку! ${count},  ${this.damageHP}/${defaultHP}`;
        $logs.insertBefore($p, $logs.children[0]);
    } else {
        this.damageHP -= count;
        const log = this === enemy ? generateLog(this, character, count) : generateLog(this, enemy, count);
        console.log(log);

        if ($logs.children.length >= 6) {
            $logs.removeChild($logs.lastChild);
        }
        const $p = document.createElement('p');
        $p.innerText = `${log}`;
        $logs.insertBefore($p, $logs.children[0]);
    }

    renderHP.call(this);
}

function changeEnergy(count) {
    const { defaultEnergy } = this;
    if (this.energy < defaultEnergy) {
        this.energy += count;
        if (this.energy >= defaultEnergy) {
            this.energy = defaultEnergy;
            $btnU.disabled = false;
        }
    }
    renderEnergy.call(this);
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

function generateLog(firstPerson, secondPerson, count) {
    const {name, damageHP, defaultHP} = firstPerson;
    const {name: Sname} = secondPerson;
    const logs = [
        `${name} вспомнил что-то важное, но неожиданно ${Sname}, не помня себя от испуга, ударил в предплечье врага. ${count},  ${damageHP}/${defaultHP}`,
        `${name} поперхнулся, и за это ${Sname} с испугу приложил прямой удар коленом в лоб врага. ${count},  ${damageHP}/${defaultHP}`,
        `${name} забылся, но в это время наглый ${Sname}, приняв волевое решение, неслышно подойдя сзади, ударил. ${count},  ${damageHP}/${defaultHP}`,
        `${name} пришел в себя, но неожиданно ${Sname} случайно нанес мощнейший удар. ${count},  ${damageHP}/${defaultHP}`,
        `${name} поперхнулся, но в это время ${Sname} нехотя раздробил кулаком \<вырезанно цензурой\> противника. ${count},  ${damageHP}/${defaultHP}`,
        `${name} удивился, а ${Sname} пошатнувшись влепил подлый удар. ${count},  ${damageHP}/${defaultHP}`,
        `${name} высморкался, но неожиданно ${Sname} провел дробящий удар. ${count},  ${damageHP}/${defaultHP}`,
        `${name} пошатнулся, и внезапно наглый ${Sname} беспричинно ударил в ногу противника. ${count},  ${damageHP}/${defaultHP}`,
        `${name} расстроился, как вдруг, неожиданно ${Sname} случайно влепил стопой в живот соперника. ${count},  ${damageHP}/${defaultHP}`,
        `${name} пытался что-то сказать, но вдруг, неожиданно ${Sname} со скуки, разбил бровь сопернику. ${count},  ${damageHP}/${defaultHP}`
    ];

    return logs[random(logs.length) - 1];
}

function clickCounts(button, limit, text) {
    let count = 0;

    return function() {
        count++;
        if (count == limit) {
            console.log("Ліміт перевищено");
            button.disabled = true;
            button.innerText = `${text}\n0/${limit}`
            return;
        }
        const curent = limit - count;
        button.innerText = `${text}\n${curent}/${limit}`
        console.log(`Залишилось ${curent}/${limit} кліків`);
    }
}

const KickCount = clickCounts($btn, 7, "Thunder Jolt");
const UltimateCount = clickCounts($btnU, 2, "Ultimate");

$btn.addEventListener('click', KickCount);
$btnU.addEventListener('click', UltimateCount);

init();