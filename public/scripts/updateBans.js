const vacBan = document.querySelector("#vac-ban");
const communityBan = document.querySelector("#community-ban");
const gameBan = document.querySelector("#game-ban");
const tradeBan = document.querySelector("#trade-ban");
const vacBanText = toString(vacBan.innerText);
const communityBanText = toString(communityBan.innerText);
const gameBanText = toString(gameBan.innerText);


if(banObj.vacBan === "BANNED"){
  sinceBanned(banObj,vacBan,"vac ban");
  addBannedClass(vacBan);
}else if(banObj.communityBan === "BANNED"){
  sinceBanned(banObj,communityBan,"community ban");
  addBannedClass(communityBan);
}else if(banObj.gameBan === "BANNED"){
  sinceBanned(banObj,gameBan,"game ban");
  addBannedClass(gameBan);
}else if(banObj.tradeBan === "BANNED"){
  addBannedClass(tradeBan);
}

function sinceBanned(banObj,banElement,tooltipText){
  const sinceBanned = document.createElement("span");
  sinceBanned.classList.add("since-ban");
  const days = banObj.DaysSinceLastBan;
  sinceBanned.innerHTML = 
  `${days} DAYS 
  <span class="info-icon" data-toggle="tooltip" data-placement="right" data-original-title="${days} days since last ${tooltipText}">
  <i class="fas fa-info-circle">
  </i>`;
  banElement.parentNode.appendChild(sinceBanned);
}

function addBannedClass(banElement){
  banElement.classList.add("banned");
}