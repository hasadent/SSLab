// Filename: member.js
// Relative files: main.js
//
// Description: This javascript file is a part of SSLAB website. The member related 
//              objects are defined in this file
//
// Objects:      xmlGroupObj <- groupObj 
//               +-  xmlMemberObj <- memberObj
//                   +- xmlThesisObj <- thesisObj 
//                   +- xmlStatusObj <- statusObj
//
// Functions:    none
//
// XML structure: (* required element) 
// (ROOT)
// +- group
//    +- (attr) name
//    +- member 
//       +- (attr) degree
//       +- (attr) graduate
//       +- (attr) year
//       +- name 
//       +- thesis
//          +- name 
//          +- ref
//       +- status
//          +- (attr) updated
//          +- (value)
//
// Author: hasadent
// E-mail: hasadent@gmail.com
//

//// Objects declaration
function xmlGroupObj(element)
{
	var name = element.getAttribute("name");
	groupObj.call(this, name);

	var mems = element.getElementsByTagName("member");
	for (var i = 0; i < mems.length; i++)
	{
		var m = new xmlMemberObj(mems[i]);
		this.members.push(m);
	}
}

function xmlMemberObj(element)
{
	var year     = element.getAttribute("year");
	var graduate = element.getAttribute("graduate");
	var name     = GE(element, "name");
	memberObj.call(this,name, year, graduate);

	// THESIS
	var thesisEle = element.getElementsByTagName("thesis");
	if (thesisEle.length > 0)
	{
		this.thesis = new xmlThesisObj(thesisEle[0]);
	}

	// STATUS
	var statusEle = element.getElementsByTagName("status");
	if (statusEle.length > 0)
	{
		this.status = new xmlStatusObj(statusEle[0]);
	}
}

function xmlThesisObj(element)
{
	var name = GE(element, "name");
	var ref  = GE(element, "ref");
	thesisObj.call(this, name, ref);
}

function xmlStatusObj(element)
{
	var status  = element.childNodes[0].nodeValue;
	var updated = element.getAttribute("updated");
	statusObj.call(this, status, updated);
}

function groupObj(name)
{
  this.name = name;
  this.members = [];
  this.isPhd = (function () { return this.name == "phd"; });
  this.degree = this.name == "phd" ? "phd" : "master";
}

function memberObj(name, year, graduate)
{
	this.name = name;
	this.year = year;
	this.graduate = graduate > 4 ? 4 : graduate;
	this.thesis = undefined;
	this.status = undefined;
	this.createElements = (function (types) {
		var e1 = document.createElement(types[0]);
		var e2 = document.createElement(types[1]);
		e1.innerHTML = this.year;
		e2.innerHTML = this.name;
		return [e1, e2];
	});
}

function thesisObj(name, ref)
{
	this.name = name;
	this.ref  = ref;
	this.createElement = (function (type) {
		var e = document.createElement(type);
		var a = document.createElement("a");
		var t = document.createTextNode("論文: ");
		a.innerHTML = this.name;
		a.href = this.ref;
		e.appendChild(t);
		e.appendChild(a);
		return e;
	});
}

function statusObj(status, updated)
{
	this.status  = status;
	this.updated = updated;
	this.createElement = (function (type) {
		var e = document.createElement(type);
		e.innerHTML = "近況: " + this.status + " (更新時間: " + this.updated + ")";
		return e;
	});
}