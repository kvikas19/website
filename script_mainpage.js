
	var object= JSON.parse(data);

function showImages(){

	var z=document.getElementById("table");
	var p=z.getElementsByTagName('img');

	for (var i = 0; i < object.length; i++) {
		p[i].src= object[i].url;
	}
}



function validateform(){  

	console.log("asgfxfsdsasf123asf");
	var name=document.myform.name.value;  
	
	var email=document.myform.email.value;
	console.log("asgfxfsdsas987fasf");
	
	var message=document.myform.message.value;


	var ck_email= /^([a-zA-Z0-9])+@([a-zA-Z0-9]+\.?)+\.[a-zA-Z]{2,4}$/;
	console.log("asgfxfsdsasfasf");
	if (name==null || name==""){  
		alert("Name can't be blank");  
		return false;  
	}else if(!ck_email.test(email)){  
		alert("Enter valid email");  
		return false;  
	}else if(message==null||message==""){
		alert("Message can't be empty please enter message");
		return false;
	}
	return false;

	document.myform.reset();
} 



