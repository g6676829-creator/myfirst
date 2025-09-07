//sign up functionalty open

document.getElementById("signup_form").onsubmit = function(){
	var name = btoa(document.getElementById("signup_name").value);
	var email = btoa(document.getElementById("signup_email").value);
	var number = btoa(document.getElementById("signup_number").value);
	var password = btoa(document.getElementById("signup_pass").value);

	var user_object_data = {
							user_name:name,
							user_email:email,
							user_number:number,
							user_pass:password
							}
	var user_text_data = JSON.stringify(user_object_data);

	if(name!=""&& email!=""&& number!=""&& password!=""){
		localStorage.setItem(email,user_text_data);//store the user data in user's machine 
		var signup_btn = document.getElementById("signup_btn");
		signup_btn.innerHTML = "<i class='fa-solid fa-check'></i> Sign up successfull";
		signup_btn.style.background = "green";

		//reset the sign up effect after 3s
		setTimeout(function(){
			signup_btn.innerHTML = "Sign up !";
			signup_btn.style.background = "linear-gradient(to right, #4A00E0, #8E2DE2)";
			document.getElementById("signup_form").reset();
			document.getElementById("login_text").onclick();
		},3000)

		return false;
	}

}

//sign up functionalty close



//signup validation functionalty open
var email_element = document.getElementById("signup_email");
var warning = document.getElementById("email_warn");
var signup_btn = document.getElementById("signup_btn");

email_element.onchange = function(){
	var value = btoa(email_element.value);
	//check user email already store or not 
	if(localStorage.getItem(value) != null){
		warning.style.display = "block";
		email_element.style.borderBottomColor = "red";
		signup_btn.disabled = true;
		signup_btn.style.background = "#ccc";

		email_element.onclick = function(){
			warning.style.display = "none";
			email_element.style.borderBottomColor = "#ccc";
			signup_btn.disabled = false;
			signup_btn.style.background = "linear-gradient(to right, #4A00E0, #8E2DE2)";
		}
	} 
}
//sign up validation functionalty close



//login validation functionalty open


var loginform = document.getElementById("login_form");

loginform.onsubmit = function() {
	var email = btoa(document.getElementById("login_email").value);
	var password = btoa(document.getElementById("login_pass").value);
	var email_warning = document.getElementById("login_warn");
	var pass_warning = document.getElementById("login_pass_warn");
	var email_element = document.getElementById("login_email");
	var pass_element = document.getElementById("login_pass");
	
	//login validation 
	if(localStorage.getItem(email) == null){
		email_warning.style.display = "block";
		email_element.style.borderBottomColor = "red";

		email_element.onclick = function(){
			email_warning.style.display = "none";
			email_element.style.borderBottomColor = "#ccc"; 
		} 

	}
	else{
		var text_data = localStorage.getItem(email);
		var obj_data = JSON.parse(text_data);//convert text data in object form
		var saved_email = obj_data.user_email;//user_email is predefined proprety during sign up
		var saved_password = obj_data.user_pass;

		if(email == saved_email){
			if(password == saved_password){
				sessionStorage.setItem("user",email); //save user email for login session
				window.location.replace("profile/profile.html");
			}
			else{
				pass_warning.style.display = "block"; //enable the wrong password warning
				pass_element.style.borderBottomColor = "red";//change the border color if wrong or unregistered email

				pass_element.onclick = function(){
					pass_warning.style.display = "none"; //revert above code when correction
					pass_element.style.borderBottomColor = "#ccc";
				}
			}
		}
	}
	return false;
}