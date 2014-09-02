// Filename: paper.js
// Relative files: main.js
//
// Description: This javascript file is a part of SSLAB website. The paper related 
//              objects and output formats are defined in this file
//
// Objects:      xmlConferencePaperObj, 
//               xmlJournalPaperObj,
//               conferencePaperObj, 
//               journalPaperObj,
//               paperObj
//
// Functions:    formatIEEE2006jour,
//               formatIEEE2006conf
//
// XML structure: (* required element) 
// (ROOT)
// +- JP
//    +- TITLE (*)
//    +- AUTHOR (*)
//    +- JOURNAL (*)
//    +- VOLUME
//    +- NUMBER
//    +- PAGES
//    +- YEAR
//    +- MONTH
//    +- NOTE 
// +- CP / LCP 
//    +- TITLE (*)
//    +- AUTHOR (*)
//    +- BOOKTITLE (*)
//    +- LOCATION
//    +- YEAR
//    +- MONTH
//    +- DATE
//    +- NOTE
//
// Author: hasadent
// E-mail: hasadent@gmail.com
//

// XML conference paper object 
var confValue = ["TITLE", "AUTHOR", "BOOKTITLE", "LOCATION", "YEAR", "MONTH", "DATE"];

function xmlConferencePaperObj(xmlNode)
{
	var r = sGetElementArray(xmlNode, confValue);
	conferencePaperObj.call(this, r[0], r[1], r[2], r[3], r[4], r[5], r[6]); 
}

// XML journal paper object 
var jourValue = ["TITLE", "AUTHOR", "JOURNAL", "VOLUME", "NUMBER", "PAGES", "YEAR", "MONTH"];

function xmlJournalPaperObj(xmlNode)
{
	var r = sGetElementArray(xmlNode, jourValue);
	journalPaperObj.call(this, r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7]); 
}

// conference paper object 
function conferencePaperObj(title, author, booktitle, location, year, month, date)
{
	this.title     = title.length == 0     ? "##T?undefined" : title;
	this.author    = author.length == 0    ? "##A?undefined" : author;
	this.booktitle = booktitle.length == 0 ? "##B?undefined" : booktitle;
	this.location  = location.length == 0  ? "##L?undefined" : location;
	this.year      = year.length == 0      ? "##Y?undefined" : year;
	this.month     = month.length == 0     ? "##M?undefined" : month;
	this.date      = date.length == 0      ? "##D?undefined" : date;
	paperObj.call(this);
}

// journal paper object 
function journalPaperObj(title, author, journal, volume, issue, pages, year, month)
{
	this.title   = title.length == 0   ? "##T?undefined" : title;
	this.author  = author.length == 0  ? "##A?undefined" : author;
	this.journal = journal.length == 0 ? "##J?undefined" : journal;
	this.volume  = volume.length == 0  ? "##V?undefined" : volume;
	this.issue   = issue.length == 0   ? "##I?undefined" : issue;
	this.pages   = pages.length == 0   ? "##P?undefined" : pages;
	this.year    = year.length == 0    ? "##Y?undefined" : year;
	this.month   = month.length == 0   ? "##M?undefined" : month;
	paperObj.call(this);
}

function paperObj()
{
	this.setFormatFunction = function (func) { this.setFormatFunction = func; };
	this.toString  = function () { if (this.setFormatFunction == undefined) return ""; else return this.setFormatFunction(); };
}

// FORMAT functions
function formatIEEE2006jour()
{
	// define FORMAT 
	var out = "##A, \"##T,\" ##J, vol. ##V(##I), pp. ##P, ##M ##Y."

	// define MAPPING:
	var mapping = [
		["##A", this.author], ["##T", this.title], ["##J", this.journal], ["##V", this.volume], ["##I", this.issue], ["##P", this.pages], ["##Y", this.year], ["##M", this.month],
		["(##I?undefined)", ""], [", pp. ##P?undefined", ""], [", vol. ##V?undefined", ""], [" ##M?undefined", ""], [", ##Y?undefined", ""]
	]; 

	// processing
	for (var i in mapping)
		out = out.replace(mapping[i][0], mapping[i][1]);
	return out;
}

function formatIEEE2006conf()
{
	// define FORMAT 
	var out = "##A, \"##T,\" in ##C, ##L, ##M ##D, ##Y."

	// define MAPPING:
	var mapping = [
		["##A", this.author], ["##T", this.title], ["##C", this.booktitle], ["##L", this.location], ["##Y", this.year], ["##M", this.month], ["##D", this.date],
		[" ##D?undefined,", ""],  [" ##M?undefined", ""], [", ##Y?undefined", ""], [", ##L?undefined", ""]
	];

	// processing
	for (var i in mapping)
		out = out.replace(mapping[i][0], mapping[i][1]);
	return out;
}