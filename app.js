const BASE_URL = 
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";
const dropdowns  = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
    console.log(select)
    for(code in countryList){
        // console.log(countryList[code]);
        let newOption = document.createElement("option");
        newOption.innerText = code;
        // newOption.value = countryList[code];
        newOption.value = code;
        if(select.name =="from" && code == "USD"){
            newOption.selected = "selected";
        } else if(select.name =="to" && code == "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal == "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    console.log(fromCurr.value,toCurr.value);
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    
    let finalAmt = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

const updateFlag = async(element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = await `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", ()=>{
    updateExchangeRate();
});
