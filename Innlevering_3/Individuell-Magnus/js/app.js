$( window ).ready(function(){

	//Deklarer variabler
	var snippetsearch = {}, result = {}, mainContent, switchBtn = [], demoContent;
	var snippetList = [];

	$.ajax({
		url : 'snippets/',
		success : function(data){
			//console.log(data);
			$(data).find("a:contains(.html)").each(function(){
		    	var fileName = $(this).attr("href");
		    	$.get('snippets/'+fileName, function(data) {
		    		var filesFirstLine = data.substr(0, data.indexOf("\n")).split(";");
					var snippetTitle = filesFirstLine[0]; 
						//console.log("title: " + snippetTitle);
					var snippetMeta = filesFirstLine[1]; 
						//console.log("meta: " + snippetMeta);
					var snippetLink = 'snippets/'+fileName; 
						//console.log("link: " + snippetLink);
					var snippet = {
					   "title" : snippetTitle,
					   "meta" : snippetMeta,
					   "link" : snippetLink
					};

					console.log("push " + snippet.title + " to snippetList");
					snippetList.push(snippet);
					//console.log(snippetList);

					if(unescape(location.hash.slice(1)) == snippet.title) {
						console.log("found " + snippet.title);

						saveSnippet(snippet);
						$('#snippetTitle').html(snippet.title);
						var metaOutput = "<h3>Tags:</h3>";
						var metaList = snippet.meta.split(",");
						$.each(metaList, function(m, meta){
							metaOutput += "<li class='metaItem'>"+meta+"</li>";
						})
						$('#tags ul').html(metaOutput);
						$('#tags ul li').click(function() {
							snippetsearch.input.val($(this).text());
							showsnippets($(this).text());
							//result.ul.show();
						});
					}
				});
		    });
		}
	});

	var init = function() {
		settObjekter();
		settEventer();
		settStr();

		if(window.location.hash) {
		  	// Fragment exists
		  	console.log(unescape("Display " + location.hash.slice(1)) + " snippet");

		  	$.each(snippetList, function(index, item){
				console.log("test");
			});

		} else {
		  	// Fragment doesn't exist
		}
	}

	var settObjekter = function() {
		mainContent = $("#code");
		demoContent = $("#demo");

		snippetsearch.input = $("#snippetsearchinput");

		result.ul = $("#result ul");
		result.list = [];
		result.flag = false;
		result.li = $(".snippetItem");
		result.currInput = "";
		result.prevInput = "";
		result.selected = 0;

		switchBtn.btn = $("#switchBtn");
		switchBtn.status = true;
		switchBtn.btn.html("<p>Se demo</p>");
		demoContent.hide();
	}

	var settEventer = function() {
		snippetsearch.input.bind("keyup", function() {
			//console.log("Keyup!"); 
			if($(this).val() != "") {
				result.currInput = $(this).val();
				if(result.prevInput != result.currInput) {
					showsnippets(result.currInput);
				}
				if(result.prevInput != result.currInput) {
					result.ul.show();
				}
				result.prevInput = result.currInput;

				
				//console.log(result.list);
			} else {
				resetResults();
			}
		});
		switchBtn.btn.click(function(){
			if(switchBtn.status) {
				demoContent.show();
				switchBtn.btn.html("<p>Se koden</p>");
			} else {
				switchBtn.btn.html("<p>Se demo</p>");
				demoContent.hide();
			}
			switchBtn.status = !switchBtn.status;
		});
	}

	
	$(document).keydown(function(event) {
		var code = (event.keyCode ? event.keyCode : event.which);
		if($('#search #result ul li').length >= 0) {
			if(code == 40) {
				if(result.selected < $('#search #result ul li').length) {
					result.selected++;
					selectSnippetResult(result.selected);
					console.log(result.selected);
					console.log("Down key i pressed");
					result.ul.show();
				}
			}else if(code == 38) {
				if(result.selected > 1) {
					result.selected--;
					selectSnippetResult(result.selected);
					console.log(result.selected);
					console.log("Up key i pressed");
					result.ul.show();
				}
			} else if(code == 13) {
				console.log("result list: " + result.selected);
				var snippetId = $(".snippetItem:nth-child("+result.selected+")").text();
				console.log("snippet id: " + snippetId);
				window.location.hash = encodeURIComponent(snippetId);
				result.ul.hide();
			}
		} else {
			result.selected = 0;
		}
	});

	$(window).on('hashchange',function(){
		//showsnippets(unescape(location.hash.slice(1)));
		console.log("hash changed to " + unescape(location.hash.slice(1)));
		result.selected = 0;
		$("#search #result ul li").css("background-color", "#2ecc71");
		$.each(snippetList, function(index, item){
			if(item.title == unescape(location.hash.slice(1))) {
				console.log("lets check out " + item.title);

				saveSnippet(item);
				$('#snippetTitle').html(item.title);
				var metaOutput = "<h3>Tags:</h3>";
				var metaList = item.meta.split(",");
				$.each(metaList, function(m, meta){
					metaOutput += "<li class='metaItem'>"+meta+"</li>";
				})
				$('#tags ul').html(metaOutput);
				$('#tags ul li').click(function() {
					snippetsearch.input.val($(this).text());
					showsnippets($(this).text());
					result.ul.show();
				});
			}
		});
	});

	var selectSnippetResult = function(snippetResultId) {
		$("#search #result ul li").css("background-color", "");
		$("#search #result ul li:nth-of-type("+snippetResultId+")").css("background-color", "#16a085");
	}
	

	var settStr = function() {
		mainContent.css({"min-height": window.innerHeight - 470});
	}


	/* 
		Gets input from user, 
		compares it to snippetList.
		Shows it
	*/
	var showsnippets = function(value) {
		console.log("starting show snippets function");
		var input = value.replace(/ /g, '');
		console.log("input is " + input);
		result.flag = false;
		$.each(snippetList, function(index, item){
			var matched = false;
			$.each(item.meta.split(","), function(i, m){
				var tag = "";
				$.each(m.split(""), function(k, c){
					tag += c;
					if(input.toLowerCase() === tag.toLowerCase()) {
						matched = true;
						result.flag = true;
						addToListIfNotPresent(index);
					}
				});
				if (!matched)
					removeIndexFromList(index);
			});
		});
		if(!result.flag) {
			resetResults();
		} else {
			$('.snippetItem').click(function(event) {
				//console.log('target: ' + event.target);
				var id = event.target.id;
				var sliced = id.slice(9,id.length + 1);
				var index = parseInt(sliced);
				var element = snippetList[index];
				result.ul.hide();
				$("#search #result ul li").css("background-color", "#2ecc71");
				result.selected = 0;
				//console.log("DEBUG: " + element);

				saveSnippet(element);
				$('#snippetTitle').html(snippetList[index].title);
				var metaOutput = "<h3>Tags:</h3>";
				var metaList = snippetList[index].meta.split(",");
				$.each(metaList, function(m, meta){
					metaOutput += "<li class='metaItem'>"+meta+"</li>";
				})
				$('#tags ul').html(metaOutput);
				$('#tags ul li').click(function() {
					snippetsearch.input.val($(this).text());
					showsnippets($(this).text());
					result.ul.show();
				});
			});
		}
	}

	var saveSnippet = function(element) {
		$.ajax({
            url : element.link,
            success : function (data) {
            	console.log(data.substr(0, data.indexOf("\n")).length);
            	var numberOfMetaChars = data.substr(0, data.indexOf("\n")).length +1;
            	//.substr(data.substr(0, data.indexOf("\n")).length)
            	$('#snippet-container').html(data.substr(numberOfMetaChars));
            	$('#renderedOutput').html(data.substr(numberOfMetaChars));
            	//removeFirstLineOf();
            }
        });
        
        $('#snippet-container').click(function(){
        	$("#snippet-container").selectText();
        	$("#status").animate({"margin-top": 0}, 1000);
        });
        /*
        setTimeout(function() {
        	$("#status").animate({"margin-top": "-100%"}, 1000);
        }, 1000);
		*/
	}

	jQuery.fn.selectText = function(){
	   var doc = document;
	   var element = this[0];
	   //console.log(this, element);
	   if (doc.body.createTextRange) {
	       var range = document.body.createTextRange();
	       range.moveToElementText(element);
	       range.select();
	   } else if (window.getSelection) {
	       var selection = window.getSelection();        
	       var range = document.createRange();
	       range.selectNodeContents(element);
	       selection.removeAllRanges();
	       selection.addRange(range);
	   }
	};

	var renderList = function() {
		var output = "";
		clearOutput();
		$.each(result.list, function(i, item){
			output += "<li class='snippetItem' id='snippetId"+item.index+"'>" + item.title + "</li><br />"; // snippetId
		});	
			
		result.ul.html(output);
	}

	var resetResults = function() {
		clearOutput();
		result.list = [];
	}

	var clearOutput = function() {
		result.ul.html("");
	}

	var removeIndexFromList = function(index) {
		$.each(result.list, function(i, item) {
			if (item.index === index) {
				result.list.splice(i, 1);
				//console.log("removed " + item.title);
				$('#snippetId' + item.index).remove();
				return false;
			}
		});
	}

	var addToListIfNotPresent = function(index) {
		if(result.list.length > 0) {
			var containsIndex = false;
			$.each(result.list, function(i, item){
				if (item.index === index) {
					containsIndex = true;
				}
			});

			if (!containsIndex) {
				var title = snippetList[index].title;
				result.list.push({"index":index, "title": title});
				//console.log("added " + title);	
				output = "<li class='snippetItem' id='snippetId"+index+"'>" + title + "</li>";
				result.ul.append(output);			
			}
		} else {
			var title = snippetList[index].title;
			result.list.push({"index":index, "title": title});
			output = "<li class='snippetItem' id='snippetId"+index+"'>" + title + "</li>";
			result.ul.html(output);
		}	
	}

	init();
	(function(){
		$( window ).resize(function(){
			settStr();
		});
	})();
});