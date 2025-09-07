//page opening condition check
var session = sessionStorage.getItem("user");
if(session == null)
{
	window.location.replace("../../profile.html");
}
else{
	// drop down funtion
function form_open()
{
	var drop = document.getElementById("drop_icon");
	var drop2 = document.getElementById("drop_icon2");
	var form = document.getElementById("frm");

	drop.onclick = function () 
	{
		form.style.display = "block";
		this.style.display = "none";
		drop2.style.display = "block";
	}

	drop2.onclick = function()
	{
		form.style.display = "none";
		this.style.display = "none";
		drop.style.display = "block";
		window.location = location.href;
	}
}

form_open()


//search functions
var search_btn = document.getElementById("search");
search_btn.onclick = function()
{
	var search_box = document.getElementById("search_box");
	if(this.className == "fa-solid fa-magnifying-glass")
	{
		search_box.style.display = "block";
		this.className = "fa-solid fa-x";
	}
	else if(this.className == "fa-solid fa-x")
	{
		search_box.style.display = "none";
		this.className = "fa-solid fa-magnifying-glass";
	}
}



//video play function
var video = document.getElementById("vdo");
play_caret = document.getElementById("play_caret");
play_caret.onclick = function()
{
	if(this.className == "fa-duotone fa-solid fa-play")
	{
		video.play();
		this.className = "fa-duotone fa-solid fa-pause";
	}
	else if(this.className == "fa-duotone fa-solid fa-pause")
	{
		video.pause();
		this.className = "fa-duotone fa-solid fa-play";
	}

}



//total duration and carrent duration function
function duraton()
{
	video.ontimeupdate = function()
	{
		var t_duration = this.duration;
		var c_time = this.currentTime;
		var time = document.getElementById("timing");
		var t_minute = parseInt(t_duration/60);
		var t_sec = t_duration - t_minute*60;
		var c_minute = parseInt(c_time/60);
		var c_sec = c_time - c_minute*60;
		time.innerHTML = c_minute+":"+parseInt(c_sec)+" / "+t_minute+":"+parseInt(t_sec);
		var percent = c_time/t_duration*100;
		var progress = document.getElementById("progress_bar");
		progress.style.width = percent+"%";
		//update play button when video is complete
		if(c_time == t_duration)
		{
			play_caret.className = "fa-duotone fa-solid fa-play";
		}
	}	
}
duraton();



//save video url & title in user's machine
var currentUser = sessionStorage.getItem("user");
var form = document.getElementById("frm");
var title = document.getElementById("title");
var url = document.getElementById("url");

form.onsubmit = function()
{
	var objData = {name:title.value,link:url.value}
	var txtData = JSON.stringify(objData);
	
	if(title.value != "" && url.value != "")
	{
		localStorage.setItem(currentUser+"video_"+title.value,txtData);
		var subBtn = document.getElementById("add_btn");
		subBtn.innerHTML = "saved "+'<i class = "fas fa-check"></i>';
		subBtn.style.background = "green";
		//clear all effect after 2 sec...
		setTimeout(function(){
			subBtn.innerHTML = "Save";
			subBtn.style.background = "linear-gradient(to right, #4A00E0, #8E2DE2)";
			title.value = "";
			url.value = "";
			return false;
		},2000);
	}
	else{
		alert("please enter title name or url !");
	}
	return false;
}



//find all data from localStorage 
function loadVideo()
{
	var i;
	for(i=0;i<localStorage.length;i++)
	{
		var allKey = localStorage.key(i);
		if(allKey.match(currentUser+"video_"))
		{
			var txtData = localStorage.getItem(allKey);
			var objData = JSON.parse(txtData);
			//create all requared elements in java script
			var box = document.createElement("DIV");
			box.setAttribute("id","listedVideoBox");
			var nameP = document.createElement("P");
			nameP.setAttribute("id","videoName");
			nameP.className = "titleName";
			nameP.innerHTML = objData.name;
			var plyBtn = document.createElement("BUTTON");
			plyBtn.setAttribute("id","playBtn");
			plyBtn.setAttribute("type","button");
			plyBtn.setAttribute("url",objData.link);
			plyBtn.className = "playlistPlayBtn";
			plyBtn.innerHTML = "Play";
			var delBtn = document.createElement("BUTTON");
			delBtn.setAttribute("type","button");
			delBtn.setAttribute("id","deleteBtn");
			delBtn.className = "delete";
			delBtn.innerHTML = "Delete";
			//decide the location of every elements
			box.appendChild(nameP);
			box.appendChild(plyBtn);
			box.appendChild(delBtn);
			document.getElementById("videosListingBox").appendChild(box);
		}
	}
}
loadVideo();//close


//video play from playlist function

function clear()
{
	var plyBtn = document.getElementsByClassName("playlistPlayBtn");
	for(var i=0;i<plyBtn.length;i++)
	{
		plyBtn[i].innerHTML = "Play";
	}
} 

function playlistPlay()
{
	var plyBtn = document.getElementsByClassName("playlistPlayBtn");
	var i;
	for(i=0;i<plyBtn.length;i++)
	{
		plyBtn[i].onclick = function()
		{
			clear()
			var videoUrl = this.getAttribute("url");
			var srcTag = document.getElementById("videoSource");
			srcTag.setAttribute("src",videoUrl);
			video.load();
			video.play();
			play_caret.className = "fa-duotone fa-solid fa-pause";
			this.innerHTML = "Playing...";
		}
	}
}
playlistPlay();//close


//next button functionalty
function next()
{
	var nextBtn = document.getElementById("nextBtn");
	nextBtn.onclick = function()
	{
		var plyBtn = document.getElementsByClassName("playlistPlayBtn");
		//auto select all play buttons
		for(var i=0;i<plyBtn.length;i++)
		{
			if(plyBtn[i].innerHTML == "Playing...")
			{
				var nextEle = plyBtn[i].parentElement.nextSibling;
				var nextPlyBtn = nextEle.getElementsByClassName("playlistPlayBtn")[0];
				nextPlyBtn.click();
				return false;
			}
		}
	}
}
next();//closed


//back button functionalty
function back()
{
	var backBtn = document.getElementById("backBtn");
	backBtn.onclick = function()
	{
		var plyBtn = document.getElementsByClassName("playlistPlayBtn");
		//auto select all play buttons
		for(var i=0;i<plyBtn.length;i++)
		{
			if(plyBtn[i].innerHTML == "Playing...")
			{
				var preEle = plyBtn[i].parentElement.previousSibling;
				var backPlyBtn = preEle.getElementsByClassName("playlistPlayBtn")[0];
				backPlyBtn.click();
				return false;
			}
		}
	}
}
back();//closed


//delete funtionalty
function del()
{
	var delBtn = document.getElementsByClassName("delete");
	//auto select all delBtn
	for(var i=0;i<delBtn.length;i++)
	{
		delBtn[i].onclick = function()
		{
			var box = this.parentElement;
			var name = box.getElementsByTagName("P")[0].innerHTML;
			localStorage.removeItem(currentUser+"video_"+name);
			box.style.background = "#ff474d";
			box.className = "animate__animated animate__backOutLeft";
			setTimeout(function(){box.remove();},1000);
		}
	}
}
del();//closed


//search funtionalty
function searchResult()
{
	var searchEle = document.getElementById("search_box");
	searchEle.oninput = function()
	{
		var name = document.getElementsByClassName("titleName");

		for(var i=0;i<name.length;i++)
		{
			if(name[i].innerHTML.toUpperCase().match(searchEle.value.toUpperCase()))
			{
				name[i].parentElement.style.display = "block";
			}
			else{
				name[i].parentElement.style.display = "none";
			}
		}
	}
}	
searchResult();//

//volume function
function volume()
{
	var vControl = document.getElementById("volumeControl");
	var vIcon = document.getElementById("vIcon");
	vIcon.onclick = function()
	{
		if(vControl.style.display == "none")
		{
			vControl.style.display = "block";
			//slider logic
			vControl.oninput = function()
			{
				video.volume = this.value;
			}
		}
		else{
			vControl.style.display = "none";
		}
	}
}
volume();//closed


//video forward & backward function
var progressBox = document.getElementById("progress_bg");
progressBox.onclick = function(event)

{
	var percent = event.offsetX/this.offsetWidth;
	video.currentTime = percent*video.duration;
}


//video full screen function
var expandIcon = document.getElementById("expand");
expandIcon.onclick = function()
{
	video.requestFullscreen();
}

//setting function
var settingIcon = document.getElementById("setting");
settingIcon.onclick = function()
{
	var spControl = document.getElementById("speedControl");
	if(spControl.style.display == "none")
	{
		spControl.style.display = "block";
		spControl.oninput = function()
		{
			video.playbackRate = this.value;
		}
	}
	else{
		spControl.style.display = "none";
	}
}


}