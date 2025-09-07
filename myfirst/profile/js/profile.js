//after login logic start
window.onload = function() {
	var session = sessionStorage.getItem("user"); //get user email form login session
	if(session == null) {
		window.location.replace("../index.html");
	}
	else{
		//logout function
		var logout_txt = document.getElementById("logout_txt");
		document.getElementById("logout").onclick = function() {
			sessionStorage.clear();
			logout_txt.innerHTML = "Please wait..."
			logout_txt.style.color = "red";
			setTimeout(function(){window.location.replace("../index.html");},3000);	
		}

		//profile name logic start
		var user_email = sessionStorage.getItem("user");
		var json_text = localStorage.getItem(user_email);
		var text_data = JSON.parse(json_text);
		var name = atob(text_data.user_name);
		document.getElementById("profile_name").innerHTML = name;
		//profile name logic end

		//home profile picture sourse code
		var home_proflie = localStorage.getItem(user_email+"image");
		document.getElementById("user_dp").style.backgroundImage = "url("+home_proflie+")";
				

		//main profile page user name logic
		document.getElementById("user_profile_name").innerHTML = name;

		//if user allready loged in, logic 
		if(localStorage.getItem(user_email+"image") != null) {
			document.getElementById("first_login_containor").style.display = "none";
		}
		
		//profile image logic start 
		var picuploader = document.getElementById("upload_pic");
		
		picuploader.onchange = function() {
			var reader = new FileReader(); //activated the FileReader method
			reader.readAsDataURL(picuploader.files[0]); //find the data url 
			//fourcelly loaded the reader
			reader.onload = function() {
			var filename = reader.result; //find the file name 
			

			var image = document.getElementById("pro_pic"); // select the image div
			image.style.backgroundImage = "url("+filename+")"; //set the filename as background image of div
			image.style.backgroundSize = "cover";
			image.style.backgroundPosition = "center";
			document.getElementById("user_dummy").style.display = "none"; //hide the user dummy
					

			//enable the next button
			var next_btn = document.getElementById("next_btn");
			next_btn.style.display = "block";
			document.getElementById("upp_text").style.display = "none";

			next_btn.onclick = function() {
					var user_image = localStorage.setItem(user_email+"image",filename);
					document.getElementById("first_login_containor").style.display = "none";
					window.location = location.href;
				}
			}
		}
	}
}




