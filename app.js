const url ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns= document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button");
const currFrom=document.querySelector(".country1 select");
const currto=document.querySelector(".country2 select");
const converted=document.querySelector(".converted");

   for(select of dropdowns){
       for(code in countryList){
           let el =document.createElement("option");
           el.innerText=code;
           el.value=code;
           if(select.name==="from"&& code==="USD"){
            el.selected="selected";
           }else if(select.name==="to"&& code==="PKR"){
            el.selected="selected";
           }
           select.append(el);   
       }
       select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
   });

 }
    const changeFlag=(element)=>{
         let currCode=element.value;
         let country=countryList[currCode];
        let img =   element.parentElement.querySelector("img");
        img.src=`https://flagsapi.com/${country}/shiny/64.png`;
    }
    btn.addEventListener("click", async(evt)=>{
        evt.preventDefault();
        let amount =document.querySelector("#in");
        let lowerfrom=currFrom.value.toLowerCase();
        let lowerto=currto.value.toLowerCase();
        let newUrl=`${url}/${lowerfrom}/${lowerto}.json`;
        console.log("fetching data...");
        let newAmount=await fetch(newUrl);
        let obj=await newAmount.json();
        console.log("fetched");
        let updatedAmount=obj[lowerto];
        updatedAmount*=amount.value;
        converted.innerText=`${amount.value} ${currFrom.value}  =  ${updatedAmount.toFixed(2)} ${currto.value}`;
    })
    
    