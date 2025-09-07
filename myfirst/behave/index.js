//login & signup functionalty
document.getElementById("login_text").onclick = function() {
	var lopage = document.getElementById("login_page");
	var signpage = document.getElementById("signup_page");
	lopage.style.display = "block";
	signpage.style.display = "none";
}



document.getElementById("signup_text").onclick = function() {
	var lopage = document.getElementById("login_page");
	var signpage = document.getElementById("signup_page");
	lopage.style.display = "none";
	signpage.style.display = "block";
}


