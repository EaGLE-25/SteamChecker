
//Ready
$(function (){
	$('[data-toggle="tooltip"]').tooltip();
	if(localStorageAvailable()){
		if(localStorage.DoNotShowMessageAgain === "true"){
			$(".send-message").html(`
			 <a href="steam://friends/message/${dataObj.persondata.steamid}" rel="nofollow"> 
        <li class="more-link send-message-btn">
         Send a Message
        </li>
       </a>
			`);
 	}
	}
	checkWidth();
}) 
// Event Listeners

$(window).resize(function(){
	checkWidth();
});

// copy to clipboard button
$(".copy").click(function(event){
  const data = event.target.parentElement.closest(".data-label").childNodes[1];
	const copyBtn = $(this).parents(".data-label").children(".copy");
  copyToClipboard(data);
  $(this).attr('data-original-title', 'Copied!').tooltip('show');
	$(this).delay(800).attr("data-original-title","Copy to Clipboard");
	copyBtn.addClass("copy-animation");
	setTimeout(function(){
		copyBtn.removeClass("copy-animation");
		$(this).tooltip("hide");
	},150)
	// let x = event.clientX - event.target.offsetLeft;
	// let y = event.clientY - event.target.offsetTop;
	// const element = $(this);
	// rippleEffect(element,x,y);
})

// My profile view-more button
$(".view-more").click(function(event){
	$(this).siblings(".view-more-links").toggle();
	event.stopPropagation();
})


// dont show again local storage 
if(localStorage.DoNotShowMessageAgain != "true"){
	$(".send-message-btn").click(function(){
		$("#send-message-modal").modal("show");
	})
}

// dont show again checkbox 
$(".dont-show-again-checkbox").change(function(event){
	if($(this).is(":checked")){
		$(".send-message").html(`
		<a href="steam://friends/message/${dataObj.persondata.steamid}" rel="nofollow">
		<li class="more-link send-message-btn">
			Send a Message
		</li>
	  </a>
		`)
		if(localStorageAvailable()){
			localStorage.DoNotShowMessageAgain = "true";
		}
	}
})



// hiding message modal after send message ok 
$(".send-message-ok").click(function(){
	$('#send-message-modal').modal('hide');
})

// showing added friend and closing after a second 
$(".add-friend").click(function(){
	$("#add-friend-modal").modal("show");
	setTimeout(function(){
		$('#add-friend-modal').modal('hide');
	},1000)
})

// mobile steam quick links view more 
$(".steam-links-view-more").click(function(event){
	if(event.target.parentElement.classList.contains("open")){
		$(this).html(`<i class="fas fa-chevron-right ml-2 view-more-btn"></i>`);
		$(this).removeClass("open");
		$(this).siblings(".steam-quick-links-nav").slideUp();
		event.stopPropagation();
	}else{
		$(this).addClass("open");
		$(this).html(`<i class="fas fa-chevron-down ml-2 view-more-btn"></i>`);
		$(this).siblings(".steam-quick-links-nav").slideDown();
		event.stopPropagation();
	}
})


// adding shadow to parent (".controls") when input field is focused
$(".url-input").focus(function(event){
	$(this).parents(".controls").css("box-shadow","0px 4px 4px rgba(0, 0, 0, 0.25)")
})
$(".url-input").focusout(function(event){
	$(this).parents(".controls").css("box-shadow","none");
})

// check field for any characters.If present show the clear-input button
$(".url-input").on("keydown input cut",function(event){
	const inputField = $(this);
	setTimeout(function(){
		if(inputField.val() != ""){
		 $(".clear-input").css("visibility","visible");
		}else{
		 $(".clear-input").css("visibility","hidden");
		}
	},100)
})

// clears the input on click 
$(".clear-input").click(function(event){
	$(this).siblings(".url-input").val("");
	$(this).siblings(".url-input").focus();
	$(this).css("visibility","hidden");
})


// close the my profile view more dropdown when clicked else where on the document
const dropDown = $(".view-more-links");
const moreDropDown = $(".more-links");
$(document).click(function(event){
		dropDown.hide();
		if(!$(event.target).hasClass("more-btn")){
			moreDropDown.slideUp();
		}
	  if(!$(event.target).hasClass("mobile-navbar-toggler") && !$(event.target).hasClass("nav-searchbar-toggler")){
			$(".mobile-nav").removeClass("mobile-nav-active");
			$(".mobile-navbar-toggler").removeClass("toggle");
		}

})

$(".nav-item").click(function(e){
	$(this).siblings(".active").removeClass("active");
	$(this).addClass("active");
})


dropDown.click(function(e){
   e.stopPropagation();
})
$(".mobile-nav").click(function(e){
	e.stopPropagation();
})

// steam id info button
$(".input-info").click(function(event){
	$("#input-types-supported-modal").modal("show");
})

// mobile nav slide in 
$(".mobile-navbar-toggler").click(function(event){
	$(".mobile-nav").toggleClass("mobile-nav-active");
	$(this).toggleClass("toggle");
})

// add active color to nav-togglers
$(".navbar-toggler").click(function(event){
	$(this).toggleClass("navbar-toggler-active");
})



$(".mobile-navlinks .nav-link").click(function(event){
	$(this).siblings(".nav-link-active").removeClass("nav-link-active");
	$(this).addClass("nav-link-active");
	if($(this).hasClass("nav-steam-quick-links")){
		$(this).children().children(".steam-quicklinks-viewmore").toggleClass("active");
		$(this).children(".mobile-steamquick-links-container").slideToggle();
	}
})

$(".steam-quicklinks-viewmore").click(function(event){
	$(this).toggleClass("active");
	$(this).parent().siblings().slideToggle();
	event.stopPropagation();
	if(!$(this).hasClass("active")){
		$(".profile-overview").addClass("nav-link-active");
		$(this).parents(".nav-steam-quick-links").removeClass("nav-link-active");
		event.stopPropagation();
	}
})

$(".faceit-show").click(function(event){
	if($(this).hasClass("showmore-faceit-skills")){
		$(this).siblings(".faceit-skills-fullist").slideToggle();
	}else if($(this).has("showless-faceit-skills")){
		$(this).parent(".faceit-skills-fullist").slideToggle();
	}
})

$(".friends-wrapper").on("mouseover",".friend-avatar",function(event){
	if($(".friends-hoverable").hasClass("active")){
		$(".friends-hoverable").removeClass("active");
	}
	$(this).parents("tr").prev().addClass("active");
})



$(document).mouseover(function(e){
	const activeFriends = $(".friends-hoverable.active");
	const condition = ($(e.target).parent().hasClass("dont-close-friends-hoverable") || $(e.target).hasClass("dont-close-friends-hoverable"));
	if($(e.target).hasClass("name-link")){
		if($(".friends-hoverable").hasClass("active")){
			$(".friends-hoverable").removeClass("active");
		}
	}
	if(!condition){
		if($(".friends-hoverable").hasClass("active")){
			$(".friends-hoverable").removeClass("active");
		}
	}
});


function copyToClipboard(data) {
	console.log(data);
	const el = document.createElement('textarea');
	el.value = data.getAttribute("data-full-url");
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}

function localStorageAvailable(){
	if(typeof(Storage) !== "undefined"){
		return true
	}else{
		return false;
	}
}

function checkWidth(){
	const width = document.body.clientWidth;
	if(width < 991){
		$(".main-nav").addClass("sticky-top");
	}else{
		$(".main-nav").removeClass("sticky-top");
	}
}

$(".more-btn").click(function(e){
	$(this).siblings(".more-links").slideToggle();
})

$(".more-link").click(function(e){
	e.stopPropagation();
})

$(".friends-wrapper").on("click",".mobile-search-toggle",function(e){
	$(".friends-mobile-search-wrapper").slideToggle();
	if($(this).hasClass("active")){
		$(this).removeClass("active");
		$(this).html(`<i class="fas fa-search"></i>`);
	}else{
	$(this).addClass("active");
	$(this).html(`<i class="fas fa-times"></i>`);
	}
})

const mobileScrollAndClose = [$(".mobile-navlinks .profile-nav-item"),$(".mobile-navlinks .friends-nav-item"),$(".mobile-navlinks .games-nav-item")];
mobileScrollAndClose.forEach(function(element){
	element.click(function(e){
		$(".mobile-nav").removeClass("mobile-nav-active");
		$(".main-nav .navbar-toggler").removeClass("toggle");
	})
})

// function rippleEffect(element,x,y){
// 	let ripples = document.createElement("span");
// 	ripples.style.left = x + "px";
// 	ripples.style.top = y + "px";
// 	ripples.classList.add("ripple");
// 	element.append(ripples);
// 	setTimeout(()=>{
//     ripples.remove();
// 	},1000);
// }
