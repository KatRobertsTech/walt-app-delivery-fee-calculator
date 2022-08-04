const cartValueEl = document.querySelector('#cart-value-el');
const distanceEl = document.querySelector('#distance-el');
const itemsNumEl = document.querySelector('#items-num-el');
const dateEl = document.querySelector('#date-el');
const timeEl = document.querySelector('#time-el');
const calculateEl = document.querySelector('#calculate-el');
const priceEl = document.querySelector('#price-el');
let time;
let timeValue;
let surcharge = 0;
let cartValue;
let peak = false;
let distance;
let itemsNum;
let total;



// Added click event listener on the link to listen for cliks
calculateEl.addEventListener('click', (e) => {
    e.preventDefault();
    //evaluated field values on click
    cartValue = Number(cartValueEl.value);
    distance = Number(distanceEl.value);
    itemsNum = Number(itemsNumEl.value);
    time = timeEl.value;
    evaluateTime();
    console.log(`cart value is: ${cartValue}`);
    console.log(`delivery distance is: ${distance}`);
    console.log(`number of items is: ${itemsNum}`);
    console.log('__________________________');

    if (cartValue >= 100) {
        console.log('Free delivery');
        total = 0;
    } else {
        total = cartValue + surchargeCalculation();
        console.log(`total is ${total}`);
    }

    priceEl.innerHTML = `€${total}`;


})

//this function finds out day of the week from the dateEl.value
const dayOfTheWeek = () => {
    let day = new Date(dateEl.value).getDay();
    // console.log(day);
    // console.log(dateEl.value);
    switch (day) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day= "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day: "Saturday";                        
    }
    // console.log(day);
    return day;
}

// This function transfers array of strings from the time
// into array of numbers, which I then transfer into a minute value
// which I compare with 15:00 - 19:00 (which is 900 min - 1140 min) 
// to find out if it's peak time
const evaluateTime = () => {
    dayOfTheWeek();
    
    let timeArrayStr = time.split (":");
    // console.log(timeArrayStr);
    const timeArrayNum = timeArrayStr.map(str => {
        return Number(str);
    })
    // console.log(timeArrayNum);
    timeValue = timeArrayNum[0] * 60 + timeArrayNum[1];
    // console.log(timeValue);

    if (dayOfTheWeek() === 'Friday') {
        console.log('this is Friday');
        if ((timeValue >= 900) && (timeValue <= 1140)) {
            console.log('peak time price');
            peak = true;
            return true;
        }
    }

}


const surchargeCalculation = () => {
    // surcharge for metres
    let metres = distance * 1000;
    surcharge += 2;
    console.log(`distance in metres is: ${metres}`);
    if (metres > 1000) {
        metres -= 1000;
        while (metres >= 500) {
            surcharge += 1;
            metres -= 500;
            if (metres > 0) {
                surcharge += 1;
            }
        }
    }
    console.log(`surcharge for distance is ${surcharge}`);

    // no. of items surcharge
    if (itemsNum > 4) {
        itemsNum -= 4;
        surcharge += 0.5;
        itemsNum -= 1;
        while (itemsNum > 0) {
            surcharge += 0.5;
            itemsNum -= 1;
        }
        console.log(`surcharge is ${surcharge}`);
    }


    // cart value surcharge
    if (cartValue < 10) {
        surcharge = surcharge + (10 - cartValue);
        console.log(`surcharge is ${surcharge}`);
    }

    // evaluate wether time is peak and multiply final delivery fee by 1.1 if it is 
    if (peak === true) {
        surcharge *= 1.1;
        console.log(`surcharge is ${surcharge}`);
    }


    // maximum delivery fee can be 15
    if (surcharge > 15) {
        surcharge = 15;
        console.log(`surcharge is ${surcharge}`);
    }
    return surcharge;
}
