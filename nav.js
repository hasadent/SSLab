addLoadEvent(initNav);

var prof_bar = [
["首頁",      "index.html"],
["著作",      "publication.html"],
["專利",      "patent.html"],
["研究計畫",  "project.html"],
["授課資訊",  "course.html"]
];

var lab_bar = [
["實驗室首頁", "lab.html"],
["成員", "member.html"],
//["IP清單", "ip.html"],
];

var main_bar = [
["張榮貴老師", "index.html", prof_bar],
["系統軟體實驗室", "lab.html", lab_bar]
];

function initNav()
{
	var x = findPageIndex();
	//document.title = main_bar[x[0]][0] + " - " + document.title;
	createNav(x[0],x[1]);

	createSS();
}

function findPageIndex()
{
	var n = document.URL.lastIndexOf("/");
	var p = document.URL.substr(n+1);
	
	if (p.length == 0)
	{
		return [0,0];
	}
	
	for (var i = 0; i < main_bar.length; i++)
	{
		var bar2 = main_bar[i][2];
		for (var j = 0; j < bar2.length; j++)
		{
			if (p == bar2[j][1])
			{
				return [i,j];
			}
		}
	}
	
}

function createNav(index1, index2)
{
	var bar = main_bar;
	var ul = document.createElement("ul");
	ul.setAttribute("class", "nav");
	ul.setAttribute("className", "nav");

	for (var i = 0; i < bar.length; i++)
	{
		var li = document.createElement("li");
		li.setAttribute("class", "nav");
		li.setAttribute("className", "nav");
		
		var aa = document.createElement("a");
		aa.href = bar[i][1];
		aa.innerHTML = bar[i][0];
		aa.setAttribute("class", "nav nav-all");
		aa.setAttribute("className", "nav nav-all");

		if (index1 == i)
		{
			aa.setAttribute("class", "nav nav-self");
			aa.setAttribute("className", "nav nav-self");

			var strong = document.createElement("strong");
			strong.appendChild(aa);
			aa = strong;
			createNavSide(bar[i][2], index2);
		}

		li.appendChild(aa);
		ul.appendChild(li);
	}

	document.getElementById("nav").appendChild(ul);
}

function createNavSide(bar, index)
{
	var nav_side = document.getElementById("nav_side");
	
	for (var i = 0; i < bar.length; i++)
	{	
		var aa = document.createElement("a");
		aa.href = bar[i][1];
		aa.innerHTML = bar[i][0];
		aa.setAttribute("class", "nav_side");
		aa.setAttribute("className", "nav_side");

		//var ss = location.href.search("/" + bar[i][1]);
		if (index == i)
		{
			var strong = document.createElement("strong");
			strong.appendChild(aa);
			aa = strong;
		}
		
		nav_side.appendChild(aa);
		nav_side.appendChild(document.createElement("br"));
	}
}

function createSS()
{
	var fb_root_1 = document.createElement("div");
	fb_root_1.id = "fb-root";
	document.getElementById("main").appendChild(fb_root_1);

	var fb_like_1 = document.createElement("div");
	fb_like_1.setAttribute("class",     "fb-like");
	fb_like_1.setAttribute("data-href", "http://140.123.102.237:8088/sslab_v3/");
	fb_like_1.setAttribute("data-width", "47");
	fb_like_1.setAttribute("data-layout", "button");
	fb_like_1.setAttribute("data-action", "like");
	fb_like_1.setAttribute("data-show-faces", "false");
	fb_like_1.setAttribute("data-share", "false");
	fb_like_1.setAttribute("style", "position: absolute; left: 100px; top: 20px;");
	document.getElementById("top").appendChild(fb_like_1);

	var gp_w_1 = document.createElement("div");
	var gp_1 = document.createElement("div");
	gp_1.setAttribute("class", "g-plusone");
	gp_1.setAttribute("data-href", "http://140.123.102.237:8088/sslab_v3/");
	gp_1.setAttribute("data-annotation", "none");
	gp_1.setAttribute("data-size", "medium");
	gp_1.setAttribute("data-width", "38");
	gp_w_1.setAttribute("style", "position: absolute; left: 144px; top: 20px;");
	document.getElementById("top").appendChild(gp_w_1);
	gp_w_1.appendChild(gp_1);


	var fb_share_1 = document.createElement("div");
	fb_share_1.setAttribute("class",     "fb-share-button");
	fb_share_1.setAttribute("data-href", document.URL);
	fb_share_1.setAttribute("data-width", "300");
	document.getElementById("nav_side").appendChild(document.createElement("br"));
	document.getElementById("nav_side").appendChild(fb_share_1);	




	fb_init(document, 'script', 'facebook-jssdk');
	init_gp();
}


function fb_init(d, s, id) 
{
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "http://connect.facebook.net/zh_TW/sdk.js#xfbml=1&appId=491737920963216&version=v2.0";
	fjs.parentNode.insertBefore(js, fjs);
}

function init_gp() 
{
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
};