//Ready
$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	if(localStorageAvailable()){
		if(localStorage.DoNotShowMessageAgain && localStorage.DoNotShowMessageAgain === "true"){
			$(".send-message").html(`
			<a href="steam://friends/message/${dataObj.persondata.steamid}" rel="no-follow">
			<button class="send-message-btn">
			<i class="far fa-comment-dots mr-1" style="font-size:15.5px;"></i>
			SEND A MESSAGE
		  </button>
			</a>
			`)
		}
	}
}) 
// Event Listeners

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
if(localStorageAvailable() && localStorage.DoNotShowMessageAgain != "true"){
	$(".send-message-btn").click(function(){
		$("#send-message-modal").modal("show");
	})
}

// dont show again checkbox 
$(".dont-show-again-checkbox").change(function(event){
	if($(this).is(":checked")){
		$(".send-message").html(`
		<a href="steam://friends/message/${dataObj.persondata.steamid}" rel="no-follow">
		<button class="send-message-btn">
		<i class="far fa-comment-dots mr-1" style="font-size:15.5px;"></i>
		SEND A MESSAGE
		</button>
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
$(document).click(function(event){
	const objEvent = $(event.target);
	if(objEvent.hasClass("view-more-btn")){
		return;
	}else{
		const dropDown = $(".view-more-links");
		if(dropDown.is(":visible")){
			dropDown.hide();
		}
	}
})

// steam id info button
$(".input-info").click(function(event){
	$("#input-types-supported-modal").modal("show");
})



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