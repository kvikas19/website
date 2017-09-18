

var object=JSON.parse(data);

var myDiv= document.getElementById("form");

var mod = document.getElementById('modal');

window.onclick = function(event) {
	console.log("prasoon");
    if (event.target == mod) {
	mod.style.display="none";
	var p = document.getElementById("submitDiv");

	if(document.getElementById("submit")){
		p.removeChild(document.getElementById("submit"));
	}else{
		p.removeChild(document.getElementById("modify"));	
	}
    }
}

function showImages(){
	for(var i=0;i<object.length;i++){
	console.log(object.length+"|"+i);
		

	var div = document.createElement('div');
    var button = document.createElement('button');
    var image = document.createElement('img');
    var modify=document.createElement('button');
    div.id=i+1;
    var link;
    div.className = 'row';
    console.log(object.length);
    link=object[i].url;
    var id=object[i].id;
	image.src=link;
	image.alt=object[i].name;
    console.log(image.src);
    console.log(id);
    div.appendChild(image);
    button.id=id;
    button.className="removeImg";
    button.type="button";
    button.innerText="x";
    button.addEventListener("click" ,function(){removeImage(this)});

    div.appendChild(button);

    modify.id= id;
    modify.className="modifyImg";
    modify.type="button";
    modify.innerText="modify";
    modify.addEventListener("click" ,function(){modifyImage(this)});

    div.appendChild(modify);

    document.getElementById('content').appendChild(div);
    }
}

function showForm(){
	// if (myDiv.style.visibility === "hidden") {
 //        show();
 //    }
 document.myform.reset();
 var z=document.getElementById("modal");
 z.style.display="block";
 // // show();
 var submit=document.createElement("button");
 submit.id="submit";
 submit.type='button';
 submit.innerText="Submit";
 submit.addEventListener("click",function(){if(validateform()){addImage(); hideForm();}});
 document.getElementById("submitDiv").appendChild(submit);
}

function hideForm(){
	var z = document.getElementById("modal");
	z.style.display="none";
	var p = document.getElementById("submitDiv");

	if(document.getElementById("submit")){
		p.removeChild(document.getElementById("submit"));
	}else{
		p.removeChild(document.getElementById("modify"));	
	}
}


function addImage() {
	console.log("d");
	var id;
	var url=document.myform.url.value;
	var name=document.myform.name.value;
	var info=document.myform.info.value;
	var date=document.myform.date.value;
	
	console.log(url);
	// alert("sdgds");
	// var url=prompt("url??????");
	if(object.length==0){
		id=1;
	}else{
		id=object[object.length-1].id +1;
	}

	var data={"id":id,"name":name,"info":info,"date":date,"url": url};
	object.push(data);
	var div = document.createElement('div');
    var button = document.createElement('button');
    var image = document.createElement('img');
    var modify = document.createElement('button');
    var link;
    div.className = 'row';
    console.log(object.length);
    link=url;
    div.id=id;
   

    image.src=link;
    image.alt=name;
    console.log(image.src);
    div.appendChild(image);
    button.id=id;
    button.className="removeImg"
    button.type="button";
    button.innerText="x";
    button.addEventListener("click" ,function(){removeImage(this)});
    // input.addEventListener("click" ,removeImage(this));

    div.appendChild(button);
    modify.id=id;
    modify.className="modifyImg";
    modify.type="button";
    modify.innerText="modify";
    modify.addEventListener("click" ,function(){modifyImage(this)});

    div.appendChild(modify);


     document.getElementById('content').appendChild(div);

}

function modifyImage(input){
	var z=document.getElementById("modal");
 z.style.display="block";
 // // show();
 var modify=document.createElement("button");
 modify.id="modify";
 modify.type='button';
 modify.innerText="Modify";
 modify.addEventListener("click",function(){if(validateform()){changeImage(input.id);hideForm();}});
 document.getElementById("submitDiv").appendChild(modify);
 console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
 console.log(input.id);
 for( var i=0; i<object.length;i++){
 	if (input.id==object[i].id){
 		document.myform.name.value= object[i].name;
 		document.myform.info.value= object[i].info;
 		document.myform.date.value= object[i].date;
 		document.myform.url.value= object[i].url;
 	}
 }

}

function changeImage(id) {
	console.log(id+"rahul");

	var url=document.myform.url.value;
	var name=document.myform.name.value;
	var info=document.myform.info.value;
	var date=document.myform.date.value;
	for(var j=0;j<object.length;j++){
		if (id==object[j].id) {
			object[j].name=name;
			object[j].info=info;
			object[j].date=date;
			object[j].url=url;
		}		
	}
	var z=document.getElementById('content');
	var y=z.getElementsByTagName('div');
	console.log("########################################");
	console.log(y.length);
	console.log(y[y.length-1].id);
	for( var p= 0;p<y.length;p++){
		if(id==(y[p].id)){
			var image=y[p].getElementsByTagName('img')[0];
			break;
		}	
	}
	//var image=y[id-1].getElementsByTagName('img')[0];
	image.src=url;
	console.log(object);
}



function removeImage(input) {
	var par = document.getElementById('content');
	// var ele = document.getElementsByClassName("row");
	// console.log(ele);
	console.log(input.id);
	par.removeChild(input.parentNode);

	for(var j = 0; j < object.length; j++) {
		if(object[j].id == input.id) {
			object.splice(j, 1);
			console.log(input.id);
			console.log(object);
			
			break;
		}
	}
}



function validateform(){  

	var url=document.myform.url.value;
	var name=document.myform.name.value;
	var info=document.myform.info.value;
	var date=document.myform.date.value;

	var ck_url= /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z(-?)]+\.+[0-9a-zA-Z]/;
	console.log("asgfxfsdsasfasf");
	if (name==null || name==""){  
		alert("Name can't be blank");  
		return false;  
	}else if(!ck_url.test(url)){  
		alert("Enter valid url");  
		return false;  
	}else if(info==null||info==""){
		alert("info can't be empty please enter information regarding image");
		return false;
	}else if(checkDate()){
 		alert("Enter Valid date (upto present day)");
		return false;
	}else 
	return true;
}

function checkDate(){
 var date=document.myform.date.value;
 var ck_date=/^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/[0-9]{1,4}$/;
 var d= date.split('/');
 if(d.length!=3){
 	return true;
 }
 var dd= d[0];
 var mm= d[1];
 var yy=d[2];
 console.log(dd + " "+mm+" "+yy);
 var today = new Date();
 var dd1 = today.getDate();
 var mm1 = today.getMonth()+1;
 var yy1 = today.getFullYear();

 console.log(dd1+ " "+mm1+" "+yy1);
 if(!ck_date.test(date)){
 	console.log("11111");
 	return true;
 }else if(yy1<yy){
 	console.log("22222");
 	return true;
 }else if(yy1==yy){
 	if(mm1<mm){
 		console.log("33333");
 		return true;
 	}else if(mm1==mm){
 		if(dd1<dd){
 			console.log("44444");
 			return true;
 		}
 	}
 }
 return false;
}
