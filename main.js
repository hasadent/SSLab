addLoadEvent(makeExternalLinkOpenInNewWindow);

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} 
	else {
		window.onload = function() { if (oldonload) { oldonload(); } func(); }
	}
}


//// to open external link in a new tab/window
function makeExternalLinkOpenInNewWindow()
{
	var n = document.getElementsByTagName("a");
	for (var i in n){
		if (n[i].className == "external")
		{
			n[i].onclick = function (){ window.open(this.href); return false; };
		}
	}
}

function openXML(xmlFile)
{
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.open("GET",xmlFile,false);
	xmlhttp.send();
	return xmlhttp.responseXML;
}

// get nodeValue of the first element with tag y from x
function GE(x, y)
{
	var n = x.getElementsByTagName(y);
	if (n.length != 0 && n[0].hasChildNodes())
		return (n[0].childNodes[0].nodeValue);
	return "";
}

function sGetElementArray(node, elementNameList)
{
	var n = [];
	for (var i in elementNameList)
		n.push(GE(node, elementNameList[i]));
	return n;
}

function tableCreateFirstRow(table, textAndStyle, styleSetter)
{
	var tr = document.createElement("tr");
	for (var i in textAndStyle)
	{
		var th =  document.createElement("th");
		th.innerHTML       = textAndStyle[i][0];
		styleSetter(th, textAndStyle[i][1]);
		tr.appendChild(th);
	}
	table.appendChild(tr);
}

//// cookie functions
function setCookie(c_name,value,exdays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}

function htmlDisplayControlCollectionObj()
{
	this.elements = [];
	this.add = function (element) { this.elements.push(element); };
	this.clear = function () { this.elements = []; };
	this.checkAndSetDisplay = function (checkFunc, valueTF) { 
		if (valueTF == undefined)
			valueTF = ["", "none"];
		for (var i in this.elements) 
			this.elements[i].style.display = checkFunc(this.elements[i]) ? valueTF[0] : valueTF[1];
	};
}

