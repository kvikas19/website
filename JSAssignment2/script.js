var tables= JSON.parse(tableData);
var items= JSON.parse(itemData);


function showPage(){
	

	for (var i = 0; i < tables.length ; i++) {
		var div=document.createElement('div');
		div.id= i;//tables[i].id;
		div.className="table";
		div.innerText= "Table No. "+ tables[i].id ;
		div.addEventListener("dragover",allowDrop);
		div.addEventListener("drop",drop);
		div.addEventListener("click",function(){showBill(this);});


		var div1= document.createElement('div');
		div1.id='T'+(i+1);
		console.log(div1.id);
		div1.className="cost";
		//div1.addEventListener("drop",drop1);
		div1.innerText="Rs. "+tables[i].cost +" | Total items: "+tables[i].items;
		div.appendChild(div1);


		document.getElementById('tableBox').appendChild(div);
	}

	for (var i = 0; i < items.length; i++) {
		var div2= document.createElement('div');

		div2.id=items[i].id;
		console.log(div2.id);
		div2.className="items";
		div2.innerText=items[i].name;
		div2.setAttribute("draggable",true);
		div2.addEventListener("dragover",allowDrop);
		div2.addEventListener("dragstart",drag);

		var div3= document.createElement('div');
		div3.className="cost";
		div3.innerText="Rs. "+items[i].cost;
		div2.appendChild(div3);

		document.getElementById('itemBox').appendChild(div2);

	}

}

function drag(event) {
   event.dataTransfer.setData("text", event.target.id);
}


function drop(event) {
	
    event.preventDefault();
    console.log("befoesdfsdgre");
    var data = event.dataTransfer.getData("text");
    console.log(data);
    console.log(event.target.id);
    for (var i = 0; i < items.length; i++) {
    
    	if(items[i].id==data){
    		tables[event.target.id].cost += items[i].cost;
    		tables[event.target.id].items += 1;
    		break;	
    	}
	}	

    console.log(tables[event.target.id].cost);
    console.log(tables[event.target.id].items);
    tables[event.target.id].itemIds.push(data);
    console.log(tables[event.target.id].itemIds);
    document.getElementById('T'+ (parseInt(event.target.id)+1)).innerText="Rs. "+tables[event.target.id].cost +" | Total items: "+tables[event.target.id].items;
    //event.target.innerText= "Table No. "+ tables[event.target.id].id + "\n" + "Rs. "+tables[event.target.id].cost +" | Total items: "+tables[event.target.id].items;

}


function showBill(table){

	document.getElementById(table.id).style.backgroundColor="#ffc04a";
	document.getElementById('T'+(parseInt(table.id) +1)).style.backgroundColor="#ffc04a";

	var z=document.getElementById('modal');
	z.style.display="block";

	var topDiv = document.getElementById('top');
	var p = document.createElement('p');
	p.id="bill";
	p.innerHTML="Table No. "+(parseInt(table.id)+1)+ " | Order Details";
    topDiv.appendChild(p);

    var c= document.createElement('button');
    c.type="button";
    c.id="close";
    c.innerText="x";
    c.addEventListener('click',function(){hideBill();});

    document.getElementById('top').appendChild(c);

    var botDiv= document.getElementById('bottom');


    tables[table.id].itemIds.sort();
    console.log("!!!!!!!!!!!!!!!!!1");
    var arr=tables[table.id].itemIds;
    console.log("esfdsfed");
    console.log(arr);


    var array = []; 
    var count = []; 
    var prev;

    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            array.push(arr[i]);
            count.push(1);
        } else {
            count[count.length-1]++;
        }
        prev = arr[i];
    }

 
    console.log("###########");
    console.log(array);
    console.log(count);

    

    billTable();



	function billTable(){    

		var myArr=["S.No.","Item","Price"," Quantity "," "];
	    var tab=document.createElement('table');
	    tab.id='tab';

	    for(var j=0;j<array.length+1;j++){
	    	var row= document.createElement('tr');
	    	row.className="rowBill";
	    	for(var k=0;k<5;k++){
	    		var td= document.createElement('td');
	    		if(j==0){
	    			td.className="head";
	    			td.innerText=myArr[k];
	    		}else{
						var img=document.createElement('img');
						img.id=j;
	     				img.className="img";
	     				img.src="https://cdn0.iconfinder.com/data/icons/rcorners/512/Trash-512.png";
	    				img.addEventListener('click',function(){document.getElementById('bottom').removeChild(tab);removeRow(this);})

	    				var inp=document.createElement('input');
	    				inp.id=j;
	    				inp.type="number";
	    				inp.className="inp";
	    				inp.addEventListener('change',function(){reviseTotal(this)});
	    				inp.addEventListener('keyup',function(){reviseTotal(this)});
	    				inp.value=count[j-1];
	    				
	    			switch (k) {
	    				case 0: td.innerText=j;
	    						td.className="sno";
	    					break;
	    				case 1: td.innerText=getItem(j);
	    					break;
	    				case 2: td.innerText=getPrice(j);
	    						td.className="pr";
	    					break;
	    				case 3: td.appendChild(inp);  						
	    					break;
	    				case 4:td.appendChild(img);
	    					break;
	    			}
	    		}
	    		row.appendChild(td);
	    	}

	    	tab.appendChild(row);
	    }

	    document.getElementById('bottom').appendChild(tab);

		// for( var q=0;q<array.length;q++){
		// document.getElementsByClassName('inp')[q].value= count[q];
		// }

		var sumPrice= billCost();


		var row= document.createElement('tr');
		row.className="rowBill";
		row.id="lastRow";
		var td=document.createElement('td');
		td.colSpan="3";
		td.className="finalCost";
		td.innerText="Total: Rs."+sumPrice;
		row.appendChild(td);
		tab.appendChild(row);

		var rowB= document.createElement('tr');
		rowB.className="rowBill";
		//rowB.id="lastRow";
		var td=document.createElement('td');
		td.colSpan="5";
		td.className="finalCost";
		var par=document.createElement('p');
		par.innerHTML="Close Session (Generate Bill)";
		par.id='genBill';
		par.addEventListener('click',generateBill);
		td.appendChild(par);
		rowB.appendChild(td);
		tab.appendChild(rowB);

	}


	function generateBill(){
		// alert('ersf');

		var myArr=["S.No.","Item","Price"," Quantity ","Amount "];
		document.getElementById('inner').style.display="none";
		document.getElementById('innerBill').style.display="block";

		var topDiv = document.getElementById('topBill');
		var p = document.createElement('p');
		p.id="billFinal";
		p.innerHTML="Table No. "+(parseInt(table.id)+1)+ " | Order Bill";
    	topDiv.appendChild(p);

    	var c= document.createElement('button');
    	c.type="button";
    	c.id="closeBill";
    	c.innerText="x";
    	c.addEventListener('click',function(){hide();});
    	topDiv.appendChild(c);

		var tab=document.createElement('table');
	    tab.id='tab';

	    for(var j=0;j<array.length+1;j++){
	    	var row= document.createElement('tr');
	    	row.className="rowBill";
	    	for(var k=0;k<5;k++){
	    		var td= document.createElement('td');
	    		if(j==0){
	    			td.className="head";
	    			td.innerText=myArr[k];
	    			
	    		}else{	    				
	    			switch (k) {
	    				case 0: td.innerText=j;
	    						td.className="sno";
	    					break;
	    				case 1: td.innerText=getItem(j);
	    					break;
	    				case 2: td.innerText=getPrice(j);
	    						td.className="pr";
	    					break;
	    				case 3: td.innerText=document.getElementsByClassName('inp')[j-1].value;  						
	    					break;
	    				case 4:td.innerText=(getPrice(j)*document.getElementsByClassName('inp')[j-1].value);
	    					break;
	    			}
	    		}
	    		row.appendChild(td);
	    	}

	    	tab.appendChild(row);
	    }

	    document.getElementById('bottomBill').appendChild(tab);

		// for( var q=0;q<array.length;q++){
		// document.getElementsByClassName('inp')[q].value= count[q];
		// }

		var sumPrice= billCost();


		var row= document.createElement('tr');
		row.className="rowBill";
		row.id="lastRowBill";
		var td=document.createElement('td');
		td.id="lastRowBill";
		td.colSpan="5";
		td.className="finalCost";
		td.innerText="Total: Rs."+sumPrice;
		row.appendChild(td);
		tab.appendChild(row);


		var rowB= document.createElement('tr');
		rowB.className="rowBill";
		//rowB.id="lastRow";
		var td=document.createElement('td');
		td.colSpan="5";
		td.className="finalCost";
		td.innerHTML='<img id="print" src="https://openclipart.org/image/2400px/svg_to_png/24825/Anonymous-Printer-icon.png" /> Print bill';
		rowB.appendChild(td);
		tab.appendChild(rowB);
	}


	function billCost(){
		var sumPrice=0;
		for( var r=0;r<array.length;r++){
			if(document.getElementsByClassName('inp')[r].value<0){
			document.getElementsByClassName('inp')[r].value=0;
			}
		sumPrice +=(getPrice(r+1)*document.getElementsByClassName('inp')[r].value);
		console.log(sumPrice);
		}
		return sumPrice;
	}


	function removeRow(img){
		// alert(img.id);
		var key=array[(parseInt(img.id)-1)];
		array.splice((parseInt(img.id)-1),1);
		count.splice((parseInt(img.id)-1),1);

		console.log("pppppppppppppppppppp");
		console.log(array[(parseInt(img.id)-1)]);
		console.log(tables[table.id].itemIds);

		for(var p=0;p < tables[table.id].itemIds.length;p++){
			if(key==tables[table.id].itemIds[p]){
				tables[table.id].itemIds.splice(p,1);
				p=p-1;
			}
		}

		console.log("qqqqqqqqqqqqq");
		console.log(tables[table.id].itemIds);


		billTable();
		var sumPrice= billCost();
		tables[table.id].cost= sumPrice;
 		var count1=0;
 		for (var i = 0; i < array.length; i++) {
 			count1 +=parseInt(document.getElementsByClassName('inp')[i].value);
 		}
 		tables[table.id].items= count1;
 		console.log(count1);
 		document.getElementById('T'+ (parseInt(table.id)+1)).innerText="Rs. "+tables[table.id].cost +" | Total items: "+tables[table.id].items;
	}

	function reviseTotal(input){
		var key=array[(parseInt(input.id)-1)];
		console.log("esrdfxewtsdgewtsd");
		tab.removeChild(document.getElementById('tab').lastChild);
		tab.removeChild(document.getElementById('lastRow'));
		
		var row= document.createElement('tr');
		row.className="rowBill";
		var sumPrice= billCost();
		row.id='lastRow';
 		var td=document.createElement('td');
 		td.colSpan="3";
 		td.className="finalCost";
 		td.innerText="Total: Rs."+sumPrice;
 		row.appendChild(td);
 		tab.appendChild(row);

 		var rowB= document.createElement('tr');
		rowB.className="rowBill";
		//rowB.id="lastRow";
		var td=document.createElement('td');
		td.colSpan="5";
		td.className="finalCost";
		var par=document.createElement('p');
		par.innerHTML="Close Session (Generate Bill)";
		par.id='genBill';
		par.addEventListener('click',generateBill);
		td.appendChild(par);
		rowB.appendChild(td);
		tab.appendChild(rowB);

 		tables[table.id].cost= sumPrice;
 		var count=0;
 		for (var i = 0; i < array.length; i++) {
 			count +=parseInt(document.getElementsByClassName('inp')[i].value);
 		}
 		tables[table.id].items= count;
 		console.log(count);
 		document.getElementById('T'+ (parseInt(table.id)+1)).innerText="Rs. "+tables[table.id].cost +" | Total items: "+tables[table.id].items;
    
	}


	function getItem(row){
		for(var i=0;i< 18;i++){
			if(array[row-1]==items[i].id){
				return items[i].name;
			}
		}
	}

	function getPrice(row){
		for(var i=0;i< 18;i++){
			if(array[row-1]==items[i].id){
				return items[i].cost;
			}
		}
	}


	function hideBill(){

		tables[table.id].itemIds=[];

		for(var t=0;t< document.getElementsByClassName('inp').length;t++){
			var  val=document.getElementsByClassName('inp')[t].value;
			for(var q=0;q<val;q++){
				tables[table.id].itemIds.push(array[t]);
			}
		}

		var z = document.getElementById("modal");
		z.style.display="none";

			for (var i = 0; i < 8; i++) {
				document.getElementsByClassName('table')[i].style.backgroundColor= "#f7f6f6";
				document.getElementsByClassName('cost')[i].style.backgroundColor="white";	
			}
		document.getElementById('top').removeChild(document.getElementById('bill'));
		document.getElementById('top').removeChild(document.getElementById('close'));
		document.getElementById('bottom').removeChild(document.getElementById('tab'));
	}


	function hide(){

		tables[table.id].itemIds=[];
		tables[table.id].items=0;
		tables[table.id].cost=0;
		document.getElementById('T'+ (parseInt(table.id)+1)).innerText="Rs. "+tables[table.id].cost +" | Total items: "+tables[table.id].items;
    
		var z = document.getElementById("modal");
		z.style.display="none";
		for (var i = 0; i < 8; i++) {
				document.getElementsByClassName('table')[i].style.backgroundColor= "#f7f6f6";
				document.getElementsByClassName('cost')[i].style.backgroundColor="white";	
		}
		document.getElementById('inner').style.display="block";
		document.getElementById('innerBill').style.display="none";
		document.getElementById('top').removeChild(document.getElementById('bill'));
		document.getElementById('top').removeChild(document.getElementById('close'));
		document.getElementById('bottom').removeChild(document.getElementById('tab'));
		document.getElementById('topBill').removeChild(document.getElementById('billFinal'));
		document.getElementById('topBill').removeChild(document.getElementById('closeBill'));
		document.getElementById('bottomBill').removeChild(document.getElementById('tab'));
	}
}


function searchTable(){
	var t= document.getElementById("searchOne");
	var val=t.value.toUpperCase();
	for(var i=0;i<8;i++){
		if(document.getElementsByClassName('table')[i].innerText.toUpperCase().indexOf(val) > -1){
			document.getElementsByClassName('table')[i].style.display="block";
		}else {
			document.getElementsByClassName('table')[i].style.display="none";
		}
	}
}

function searchFood(){
	var t= document.getElementById("searchTwo");
	var val=t.value.toUpperCase();
	for(var i=0;i<18;i++){
		if(document.getElementsByClassName('items')[i].innerText.toUpperCase().indexOf(val) > -1){
			document.getElementsByClassName('items')[i].style.display="block";
		}else if (items[i].type.toUpperCase().indexOf(val)==0){
			document.getElementsByClassName('items')[i].style.display="block";
		} else{
			document.getElementsByClassName('items')[i].style.display="none";
		}
	}
}



function allowDrop(event) {
    event.preventDefault();
}