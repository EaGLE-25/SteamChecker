const friendship = document.querySelector(".friendship .data");
const mobileFriendship = document.querySelector(".mobile-friendship .data");
if(user != " "){
  const friendsArr = user.friendsArr;
  if(friendsArr){
    const isfriend = (friendsArr.includes(dataObj.persondata.steamid)) ? "Your friend" : "Not your friend";
    console.log(isfriend);
    removeClass([friendship,mobileFriendship],"mute");
    innerhtml([friendship,mobileFriendship],isfriend);
  }else{
    removeClass([friendship,mobileFriendship],"mute");
    addClass([friendship,mobileFriendship],"private");
    innerhtml([friendship,mobileFriendship],"Your friends list is private");
  }
}

function addClass(elementsArr,className){
  elementsArr.forEach((element)=>{
    element.classList.add(className);
  })
}
function innerhtml(elementsArr,html){
  elementsArr.forEach((element)=>{
    element.innerHTML = html;
  })
}
function removeClass(elementsArr,className){
  elementsArr.forEach((element)=>{
    element.classList.remove(className);
  })
}