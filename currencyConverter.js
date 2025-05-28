const URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const msg = document.querySelector(".msg");
const btn = document.querySelector("form button");
const fromC = document.querySelector(".from select");
const toC = document.querySelector(".to select");

const dropdownS= document.querySelectorAll(".dropdown select");
for (let select of dropdownS){
    for (currcode in countryList){
        let option = document.createElement("option");
        option.innerText=currcode;
        option.value=currcode;
        select.append(option);
        if(select.name==="from" && currcode==="USD"){
            option.selected="selected";

        }else if(select.name==="to" && currcode==="BDT"){
            option.selected="selected";
        }
        

    }
    select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
    


}
const updateFlag=(element)=>{
  
    let newSrc = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
   
    img.src=newSrc;
   
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amnt = document.querySelector(".amount input");
    if(amnt.value==="" || amnt.value<1){
        // amnt.innerText="1";
        amnt.value="1";
    }
    console.log(fromC.value, toC.value);
    const change_url=`${URL}/${fromC.value.toLowerCase()}.json`;
    let response = await fetch(change_url);
    let data = await response.json();
    let x =fromC.value.toLowerCase();
    let y=toC.value.toLowerCase();
    let rate = data[x][y];
    msg.innerText=`${amnt.value} ${fromC.value} = ${amnt.value*rate} ${toC.value}`;
    
    

    
})