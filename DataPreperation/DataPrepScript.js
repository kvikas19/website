var p=0;
var d=document.getElementsByClassName('MsoPlainText')[11].innerText;
var stringArr = d.split(/(\s+)/);
var a=stringArr[1][0];
var count=0;
var flag=0;
var object=[];

while(p>=0){

	
	var q= document.getElementsByClassName('MsoPlainText')[p].innerText;
	
	if(q.indexOf('ACCOMMODATION CHARGES')>=0){
		p=-1;
		 break;
	}

	if(q.indexOf('DEPARTMENT OF')>-1){
		var dep= q.slice((q.indexOf('OF') +3),);		
	}else{
		if((q[0]!=" ")&&(dep != undefined)&&(q[0]!=a)){
			var stringArray = q.split(/(\s+)/);
			for(var t=0;t< stringArray.length-1;t++){
				if((stringArray[t][0]==" ")|| (stringArray[t][0]==a)){
					stringArray.splice(t,1);
					t=t-1;
				}
			}
			
			if((stringArray[0]!="CODE") && (stringArray[0][0])!="-" && (stringArray[0][0]!="=")&&(stringArray[0][0]!="/")){
				var code= stringArray[0];
				if (dep=="EMERGENCY"&&code=="E21A") { 
					var rate=stringArray[3];
					var des= stringArray.slice(1,3);
					var descrip=des.join(" "); 
					var description="\""+descrip+"\""; 	
					//console.log(count+dep+","+code+","+description+","+rate+",");
					var data={"DEPARTMENT":dep,"CODE":code,"DESCRIPTION":description,"RATE_FIELD":rate};
					count++;
					object.push(data);
					

					code=stringArray[4];
					var rate1=stringArray[8];
					var des1= stringArray.slice(5,8);
					var descrip1=des1.join(" "); 
					var description1="\""+descrip1+"\""; 	
					//console.log(dep+","+code+","+description1+","+rate1+",");
					var data={"DEPARTMENT":dep,"CODE":code,"DESCRIPTION":description1,"RATE_FIELD":rate1};
					count++;
					object.push(data);
					
				}else if (flag==1){
					var rate=stringArray[4];
					var des= stringArray.slice(1,4);
					var descrip=des.join(" ");
					var description="\""+descrip+"\""; 	
					//console.log(dep+","+code+","+description+","+rate+",");
					var data={"DEPARTMENT":dep,"CODE":code,"DESCRIPTION":description,"RATE_FIELD":rate};
					count++;
					object.push(data);
						

					code=stringArray[5];
					var rate1=stringArray[8];
					var des1= stringArray.slice(6,8);
					var descrip1=des1.join(" ");
					var description1="\""+descrip1+"\""; 	
					//console.log(dep+","+code+","+description1+","+rate1+",");
					var data={"DEPARTMENT":dep,"CODE":code,"DESCRIPTION":description1,"RATE_FIELD":rate1};
					count++;
					object.push(data);
					
					flag=0;

				}else{
					
					var rate=stringArray[stringArray.length -2];
					var des= stringArray.slice(1,stringArray.length-2);
					var descrip=des.join(" "); 
					var description="\""+descrip+"\"";
					// console.log(dep+","+code+","+description+","+rate+",");
					var data={"DEPARTMENT":dep,"CODE":code,"DESCRIPTION":description,"RATE_FIELD":rate};
					count++;
					object.push(data);
					if(dep=="SURGICAL GASTEROENTROLOGY"&& code=="SGE230"){
						flag=1;
					}
				}
			}
		}
	}
	p++;
}


console.log(count);

function DownloadJSON2CSV(objArray)
{
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
   
  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if(line != '') line += ','
      console.log(index);
      line += array[i][index];
    }
 
    str += line + '\r\n';
  }
 

  window.open('data:text/csv;charset=utf-8,' + escape(str));
    
}

DownloadJSON2CSV(object);