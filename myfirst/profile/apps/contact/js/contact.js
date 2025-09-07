// page open condition check
var session = sessionStorage.getItem("user"); //get user email form login session
if(session == null) {
	window.location.replace("../../profile.html");
}
else{
//find the user email
var user_email = sessionStorage.getItem("user");
//find the image address from localStorage
var image = localStorage.getItem(user_email+"image");
//seelect the profile image box
var con_profile_image = document.getElementById("con_profile_image");
//set image in background
con_profile_image.style.backgroundImage = "url("+image+")";

	var plus_icon = document.getElementById("plus_icon");
	var add_box = document.getElementById("add_new_contact_bg");
	var close = document.getElementById("close_btn");

	plus_icon.onclick = function() {
	add_box.style.display = "block";// appear the new contact box
	}

	close.onclick = function() {
		add_box.style.display = "none";// disappear the new contact box
		window.location = location.href;
	}

	//save user data in localStorage
	var save_btn = document.getElementById("save_btn");
	
	save_btn.onclick = function() {
		//select the input elements
		var contact_name = document.getElementById("name_input");
		var contact_number = document.getElementById("num_input");
		//create an object of user data
		var obj_data = {name:contact_name.value, number:contact_number.value};
		//convert the object in text data
		var text_data = JSON.stringify(obj_data);

		//store data in user's machine
		if(contact_name.value != "" && contact_number.value != ""){
			

			localStorage.setItem(user_email+"contact"+contact_name.value,text_data);

			save_btn.innerHTML = "Saved";
			save_btn.style.backgroundColor = "green";
			
			//when oninput in name input field 
			contact_name.oninput = function(){
				save_btn.innerHTML = "Save";
				save_btn.style.backgroundColor = "blueviolet";
			}
			//when oninput in number input field
			contact_number.oninput = function(){
				save_btn.innerHTML = "Save";
				save_btn.style.backgroundColor = "blueviolet";
			}
		}
		else{
			var warning = document.getElementById("empty_warning");
			warning.style.display = "block";//appear the empty warning 	
		}
		return false;	
	}

//finding contact data in loacalStorage 	
	function contacts() {
		var contact_keys = user_email+"contact";
		var i;
		for(i=0;i<localStorage.length;i++){
			keys = localStorage.key(i);
			//check, is it contact data stored in localStorage
			if(keys.match(contact_keys)){
				var json_txt = localStorage.getItem(keys);//detect all contact keys in json text data
				var obj = JSON.parse(json_txt);//changed the text data in object

				//create all requared html elements in java script

				var name_number_div = document.createElement("DIV");
				name_number_div.setAttribute("id","namenumber");
				var name_p = document.createElement("P");
				name_p.setAttribute("class","name_class");
				var name_i = document.createElement("I");
				name_i.setAttribute("class","fas fa-user");
				var line = document.createElement("HR");
				line.setAttribute("color","blueviolet");
				line.setAttribute("width","70%");
				line.setAttribute("size","4px");
				var number_p = document.createElement("P");
				number_p.setAttribute("class","number_class");
				var number_i = document.createElement("I");
				number_i.setAttribute("class","fas fa-mobile-alt");
				var tools = document.createElement("DIV");
				tools.setAttribute("id","tools");
				var edit_i = document.createElement("I");
				edit_i.setAttribute("class","fas fa-edit edit");
				var trash_i = document.createElement("I");
				trash_i.setAttribute("class","fas fa-trash del");

				//all element display location defination
				name_number_div.appendChild(name_p);
				name_p.appendChild(name_i);
				name_number_div.appendChild(line);
				name_number_div.appendChild(number_p);
				number_p.appendChild(number_i);
				name_number_div.appendChild(tools);
				tools.appendChild(edit_i);
				tools.appendChild(trash_i);

				//data source defination
				name_p.innerHTML += " "+obj.name; //name & number is predefined property when data saving 
				number_p.innerHTML += " "+obj.number;  

				var parent_box = document.getElementById("contact_list_box");
				parent_box.appendChild(name_number_div);
			}
		}
	}

	contacts(); //contacts funtion called & close

	//search functionalty start
	var search = document.getElementById("search");
	search.oninput = function()
	{
		var all_name = document.getElementsByClassName("name_class");
		var i;
		for(i=0;i<all_name.length;i++)
		{
			if(all_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase()))
			{
				all_name[i].parentElement.style.display = "block";
			}
			else
			{
				all_name[i].parentElement.style.display = "none";
			}
		}
	}
	//search functionalty end

	//delete function start
	function del()
	{
		var trashbin = document.getElementsByClassName("del");
		var i;
		for(i=0;i<trashbin.length;i++)
		{
			trashbin[i].onclick = function()
			{
				var parent = this.parentElement.parentElement;
				var p_ele = parent.getElementsByClassName("name_class")[0];
				var name = p_ele.innerHTML.replace('<i class="fas fa-user"></i>','');
				localStorage.removeItem(user_email+"contact"+name.trim());
				//animation effect on delete
				parent.className = "animate__animated animate__backOutLeft";
				this.style.color = "red";
				setTimeout(function(){parent.remove();},1000);
			}
		}
	}
	del(); //delete function end
	

	//edit function start
	function edit()
	{
		var edit = document.getElementsByClassName("edit");
		var i;
		for(i=0;i<edit.length;i++)
		{
			edit[i].onclick = function()
			{
				var parent = this.parentElement.parentElement;
				var name = parent.getElementsByClassName("name_class")[0].innerHTML.replace('<i class="fas fa-user"></i>',"").trim();
				var number = parent.getElementsByClassName("number_class")[0].innerHTML.replace('<i class="fas fa-mobile-alt"></i>',"").trim();
				var name_input = document.getElementById("name_input");
				var num_input = document.getElementById("num_input");
				var save_btn = document.getElementById("save_btn");
				name_input.value = name;
				num_input.value = number;
				save_btn.innerHTML = "Update";
				document.getElementById("allcontact_txt").innerHTML = "Edit Number !";
				document.getElementById("add_new_cnt_box").style.backgroundColor = "yellow";
				localStorage.removeItem(user_email+"contact"+name);
				//document.getElementById("close_btn").style.display = "none";
				document.getElementById("plus_icon").click();
			}
		}
	}
	edit();//edit function close
}



