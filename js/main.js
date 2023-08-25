




function start_app(){

const resuls_div= document.querySelector('#results')
const form = document.querySelector('#form')
const cripto_div = document.querySelector('#cripto')
const currency_div = document.querySelector('#currency')

cripto_div.addEventListener('change', getting_values)
currency_div.addEventListener('change', getting_values)
form.addEventListener('submit', submitting)

const values_selected={
    cripto: "",
    currency: ""
}

adding_options()


const checking_option = cripto => new Promise(resolve =>{
    resolve(cripto)
})

function adding_options(){

const URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`

fetch(URL)
    .then(response=> response.json())
    .then(resuls =>  showing_options(resuls.Data))
    .then(cripto => checking_option(cripto))

}


function showing_options(cripto_info){

    cripto_info.forEach(cripto => {
        const {FullName, Name} = cripto.CoinInfo

        const option = document.createElement('option')
        option.value= Name
        option.textContent= FullName

        cripto_div.appendChild(option)

    });

}


function getting_values(e){

    values_selected[e.target.name]= e.target.value

}


function submitting(e){
e.preventDefault()

const {cripto, currency} =values_selected

if(cripto=== '' || currency=== ''){
    alert("Empty inputs..")
    return
}

getting_results(cripto, currency)

}

function getting_results(cripto, currency){

const URL= `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${currency}`
spinner()
fetch(URL)
    .then(response => response.json())
    .then(prices=>showing_results(prices.DISPLAY[cripto][currency]) )
}


function showing_results(price){
  
    clean_html(resuls_div)
    
 

const {PRICE,HIGHDAY,LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = price


const price_element= document.createElement('p')
price_element.classList.add('fw-bold', 'text-white', 'fs-4')
price_element.innerHTML=`
Price: <span class="">${PRICE}</span>
`
const lowDay_element= document.createElement('p')
lowDay_element.classList.add('fw-bold', 'fs-4')
lowDay_element.innerHTML=`
Low Price: <span class="">${LOWDAY}</span>
`

const highDay_element= document.createElement('p')
highDay_element.classList.add('fw-bold', 'fs-4')
highDay_element.innerHTML=`
High Price: <span class="">${HIGHDAY}</span>
`
const lastUpt_element= document.createElement('p')
lastUpt_element.classList.add('fw-bold', 'text-white', 'fs-4' )
lastUpt_element.innerHTML=`
Last Update: <span class="">${LASTUPDATE}</span>
`

const lastHours_element= document.createElement('p')
lastHours_element.classList.add('fw-bold', 'fs-4')
lastHours_element.innerHTML=`
Last 24 Hours Variation: <span class="">${CHANGEPCT24HOUR}</span>
`

resuls_div.appendChild(price_element)
resuls_div.appendChild(lowDay_element)
resuls_div.appendChild(highDay_element)
resuls_div.appendChild(lastHours_element)
resuls_div.appendChild(lastUpt_element)

}


function spinner(){

    clean_html(resuls_div)
    const spinner_div= document.createElement('div')
    spinner_div.classList.add('spinner')
    const divSpinner_one= document.createElement('div')
    divSpinner_one.classList.add('dot1')

    const divSpinner_two= document.createElement('div')
    divSpinner_two.classList.add('dot2')

    spinner_div.appendChild(divSpinner_one)
    spinner_div.appendChild(divSpinner_two)

    resuls_div.appendChild(spinner_div)

    // setTimeout(() => {
    //     spinner_div.remove()
    // }, 6000);

}

function clean_html(value){
    while(value.firstChild){
      value.removeChild(value.firstChild)
    }
  }


function alert(message){

    Toastify({
        text:`${message} ` ,
        className: "info",
        duration: 3000, 
        style: {
          background: "#9d263a",
        }
      }).showToast()

}



}



window.addEventListener('DOMContentLoaded', start_app)