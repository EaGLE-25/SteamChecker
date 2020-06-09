  const privacyState = document.querySelector("#privacy-state");

   window.addEventListener("DOMContentLoaded",(event)=>{
    if(visibilityState === 3){
      console.log(true);
        const newspan = document.createElement("span");
        privacyState.classList.add("public");
        newspan.innerText="Public"
        privacyState.appendChild(newspan);
    }
    else if(visibilityState === 2){
        const newspan = document.createElement("span");
        privacyState.classList.add("friends-only");
        newspan.innerText="Friends Only"
        privacyState.appendChild(newspan);
    }
    else if(visibilityState === 1){
      const newspan = document.createElement("span");
        privacyState.classList.add("private");
        newspan.innerText="Private"
        privacyState.appendChild(newspan);
    }
   })