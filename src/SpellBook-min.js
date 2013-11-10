(function(a){a.fn.input=function(b){var c=this;if(!b){return c.trigger("keydown.input")}return c.bind({"input.input":function(d){c.unbind("keydown.input");b.call(this,d)},"keydown.input":function(d){b.call(this,d)}})};a.fn.markdownEditor=function(j){j=a.extend({historyRate:2000,leftSide:0,rightSide:0,fileMenu:0,settingsMenu:"spellbook_settings",TipIt:0,renderRate:300,buttons:["chevron-down","cog","cloud","font","bold","italic","quote-right","beaker","link","picture","list-ul","reply","share-alt","info-sign"],resources:{"icon-bold":"Bold","icon-italic":"Italic","icon-link":"Create link","icon-quote-right":"Quote","icon-beaker":"Code","icon-picture":"Add image","icon-font":"Header","icon-list-ul":"Bullet list","icon-reply":"Undo","icon-share-alt":"Redo","icon-info-sign":"Help","icon-ok":"Accept","icon-minus-sign":"Cancel"},funbuttons:{"chevron-down":"Editor Toggle","icon-cloud":"File Menu","icon-cog":"Settings"}},j);var q=[],b=0,H=new Showdown.converter(),x=function(J,K){if(J=="chevron-down"){if(K=="true"){return'<a class="button button-mobile TBBtn"><span class="fa-icon icon-chevron-down"></span></a>'}else{return'<a class="button button-mobile"><span class="fa-icon icon-chevron-down"></span></a>'}}else{var I="icon-"+J;var e="Magick-"+J;var i;if(j.funbuttons[I]){i=j.funbuttons[I];e+=" FunBtn"}else{i=j.resources[I]}if(J=="bold"){e+=" left"}if(J=="italic"){e+=" right"}if(J=="quote-right"){e+=" left"}if(J=="beaker"){e+=" right"}if(J=="reply"){e+=" left"}if(J=="share-alt"){e+=" right"}if(J=="cloud"){e+=" FileMenu";return'<a class="button action '+e+'" title="'+i+'"><span class="fa-icon red icon-'+J+'"></span><span class="label red">File</span></a>'}if(J=="cog"){e+=" CogMenu";return'<a class="button '+e+'" title="'+i+'"><span class="fa-icon icon-'+J+'"></span></a>'}if(j.TipIt!=0){return'<a class="button '+e+" "+j.TipIt+'" title="'+i+'"><span class="fa-icon icon-'+J+'"></span></a>'}else{return'<a class="button '+e+'" title="'+i+'"><span class="fa-icon icon-'+J+'"></span></a>'}}};var y=(new Date).getTime();if(j.leftSide!=0){$container=a('<div class="markdown-container"><div id="'+j.topSide+'"><div class="markdown-ToolBox"><div class="markdown-toolbar"></div></div></div><div id="'+j.leftSide+'"><textarea class="markdown-editor" id="'+y+'"></textarea></div><div id="'+j.rightSide+'"><div class="markdown-preview"></div><div class="push fixBlock"></div></div></div>'),$toolbar=$container.find(".markdown-toolbar"),$toolbox=$container.find(".markdown-ToolBox"),$editor=$container.find(".markdown-editor"),$preview=$container.find(".markdown-preview")}else{$container=a('<div class="markdown-container"><div class="markdown-toolbar"></div><textarea class="markdown-editor" id="'+y+'"></textarea><div class="markdown-preview"></div></div>'),$toolbar=$container.find(".markdown-toolbar"),$editor=$container.find(".markdown-editor"),$preview=$container.find(".markdown-preview")}var F=$editor[0],u=function(e,I,i){if(!i){return I}while(I>1){if(e[I-1]=="\n"){break}I--}return I},t=function(i,e,I){if(!I){return e}while(e<i.length-1){if(i[e]=="\n"){break}e++}return e},m=("selectionStart" in F&&function(I){var J=u(F.value,F.selectionStart,I);var i=t(F.value,F.selectionEnd,I);var e=i-J;return{start:J,end:i,length:e,text:F.value.substr(J,e)}})||(document.selection&&function(){F.focus();var i=document.selection.createRange();if(i===null){return{start:0,end:F.value.length,length:0}}var e=F.createTextRange();var I=e.duplicate();e.moveToBookmark(i.getBookmark());I.setEndPoint("EndToStart",e);return{start:I.text.length,end:I.text.length+i.text.length,length:i.text.length,text:i.text}})||function(){return null};var o=function(){var i=a(window).width();var e=jQuery(window).height()-jQuery("#"+j.topSide).height();finalHeight=e-4;jQuery("#"+y).height(finalHeight);if(i<800){}else{if(jQuery(".markdown-ToolBox").hasClass("PanelOpen")==true){jQuery(".markdown-ToolBox").removeClass("PanelOpen");jQuery("#"+j.leftSide).removeClass("DropDown");jQuery("#"+j.topSide).removeClass("DropDown")}}};var p=("selectionStart" in F&&function(I,i){var J=u(F.value,F.selectionStart,i);var e=t(F.value,F.selectionEnd,i);F.value=F.value.substr(0,J)+I+F.value.substr(e,F.value.length);F.selectionStart=J;F.selectionEnd=J+I.length;F.focus()})||(document.selection&&function(e){F.focus();document.selection.createRange().text=e})||function(e){F.value+=e};var d=0;var s=function(){clearTimeout(d);d=setTimeout(function(){if(F.value!=q[b]){q[++b]=F.value;if(q.length>b+1){q=q.slice(0,b+1);G.attr("disabled","")}}},j.historyRate);B.removeAttr("disabled");g()};var k=function(){if(b){F.value=q[--b];G.removeAttr("disabled");g()}b||B.attr("disabled","")};var A=function(){if(b<q.length-1){F.value=q[++b];if(b===q.length-1){G.attr("disabled","")}g();B.removeAttr("disabled")}};var f=0;var g=function(e){if(!e){clearTimeout(f);f=setTimeout(function(){$preview.html(H.makeHtml(F.value));$editor.trigger("md.change",F)},j.renderRate)}else{$preview.html(H.makeHtml(F.value))}};a.each(j.buttons,function(e,i){if(i=="chevron-down"){$toolbar.append(x(i));$toolbox.append(x(i,"true"))}else{if(i=="cloud"||i=="cog"){$toolbox.append(x(i))}else{$toolbar.append(x(i))}}});var B=$toolbar.find(".icon-reply");var G=$toolbar.find(".icon-share-alt");var E=function(){var e="<div id='"+j.settingsMenu+"'><div id='spellbook_settings_inner'><div class='p10'>";e+='<p class="m0 p0 L whiteText" style="padding-top:3px;">&nbsp;<span class="fa-icon icon-cog" style="padding:3px;margin:2px;"></span>&nbsp;Editor Settings</p><a class="button settings_toggle" style="float:right;margin:2px 4px 0px 0px;"><span class="fa-icon icon-arrow-up" style="padding:2px;margin:2px"></span></a><div class="push" style="height:10px;"></div>';e+='<div id="SettingsBar"><label for="TheNoteTitle" class="m0 p0 whiteText">Editor Text Size</label><div class="push" style="height:2px;"></div><a class="button left FontButton FBF" id="LessFont"><span class="fa-icon icon-minus-sign"></span></a><a id="RESETFont" class="button middle FontButton"><span class="fa-icon icon-text-height"></span><span class="label">Size</span></a><a id="MoreFont" class="button right FontButton"><span class="fa-icon icon-plus-sign"></span></a><div class="push" style="height:2px;"></div></div>';e+='<div id="ViewBar"><p class="m0 p0 L whiteText" style="padding-top:13px;">&nbsp;<span class="fa-icon icon-columns" style="padding:3px;margin:2px;"></span>&nbsp;Display Mode</p><span class="push" style="height:2px;"></span><a class="button ViewButton FBF on"><span class="label activeD">Vertical</span></a><a class="button ViewButton"><span class="label">Horizontal</span></a><a class="button ViewButton"><span class="label">Full Page</span></a><span class="push" style="height:2px;"></span></div>';e+="</div></div></div>";return e};var l=function(K){var i=m().text.replace(/\n/g,"").trim(),J=a('<form class="md-link-form" action="#"><input placeholder="Title" type="text" class="md-input md-title"><input placeholder="http://" type="url" class="md-input md-href">'+x("accept")+x("cancel")+"</form>"),I=function(){J.remove();$toolbar.show();return false},e=function(){var O=J.find(".md-href"),M=J.find(".md-title"),L=O.val(),N=M.val()||L;p(K(N,L));s();J.remove();$toolbar.show();return false};$toolbar.hide().after(J);J.on("click",".icon-ok",e).on("click",".icon-minus-sign",I).on("keyup",".md-input",function(L){if(L.keyCode===13){e()}else{if(L.keyCode===27){I()}}});if(!i||/^http(s?):\/\//.exec(i)){J.find(".md-href").val(i);J.find(".md-title").focus()}else{J.find(".md-title").val(i);J.find(".md-href").focus()}};var r=function(J){var e=m(J.block).text;if(!J.block&&/\n/.exec(e)){return}var I=J.regex.exec(e);var i=!I?J.modify(e):J.undo?J.undo(e,J):I[1];p(i,J.block)};var n=[{cmd:"bold",handler:function(){r({modify:function(e){return"**"+e.trim()+"**"},regex:/^\*\*(.*)\*\*$/});s()}},{cmd:"italic",handler:function(){r({modify:function(e){return"*"+e.trim()+"*"},regex:/^\*((\*\*)?([^*]*)(\*\*))?\*$/});s()}},{cmd:"link",shortcut:"⌘+k, ctrl+k",handler:function(){l(function(i,e){return"["+i+"]("+e+")"})}},{cmd:"beaker",shortcut:"shift+⌘+p, shift+ctrl+p",handler:function(){r({modify:function(e){return"`"+e+"`"},regex:/^`([^`]*)`$/});s()}},{cmd:"quote-right",shortcut:"⌘+', ctrl+'",handler:function(){r({modify:function(e){return"> "+e.replace(/\n/g,"\n> ")},undo:function(e){return e.replace(/(^|\n)>[ \t]*(.*)/g,"$1$2")},regex:/((^|\n)>(.*))+$/,block:true});s()}},{cmd:"picture",shortcut:"shift+⌘+i, shift+ctrl+i",handler:function(){l(function(i,e){return"!["+i+"]("+e+' "'+i+'")'})}},{cmd:"font",handler:function(){r({modify:function(e){return"#"+e},regex:/^#(.*)$/,block:true});s()}},{cmd:"list-ul",shortcut:"shift+⌘+l, shift+ctrl+l",handler:function(){r({modify:function(e){return"* "+e.replace(/\n/g,"\n* ")},undo:function(e){return e.replace(/^[\s\t]*\*[ \t]*/mg,"")},regex:/^([\s\t]*\*.*)*$/,block:true});s()}},{cmd:"reply",shortcut:"⌘+z, ctrl+z",handler:k},{cmd:"share-alt",shortcut:"⌘+y, ctrl+y",handler:A},{cmd:"info-sign",shortcut:"shift+⌘+h, shift+ctrl+h",handler:function(){jQuery.facebox({div:"#markup_help_box"})}},{cmd:"chevron-down",handler:function(){console.debug("this");if(jQuery(".markdown-ToolBox").hasClass("PanelOpen")==true){jQuery(".markdown-ToolBox").removeClass("PanelOpen");jQuery("#"+j.leftSide).removeClass("DropDown");jQuery("#"+j.topSide).removeClass("DropDown")}else{jQuery(".markdown-ToolBox").addClass("PanelOpen");jQuery("#"+j.leftSide).addClass("DropDown");jQuery("#"+j.topSide).addClass("DropDown")}}},{cmd:"cloud",shortcut:"⌘+s, ctrl+s",handler:function(){jQuery("#"+j.fileMenu).toggleClass("FileShow")}},{cmd:"cog",shortcut:"⌘+,, ctrl+,",handler:function(){console.debug("options.settingsMenu");jQuery("#"+j.settingsMenu).toggleClass("FileShow")}}];key.filter=function(i){var e=(i.target||i.srcElement).tagName;return !(e=="INPUT"||e=="SELECT")};for(var z=0;z<n.length;z++){var v=n[z],w=v.cmd,c=v.handler;if(w!="chevron-down"&&w!="cloud"){$toolbar.on("click",".icon-"+w,c);key(v.shortcut||"⌘+"+w+", ctrl+"+w,"markdown",c)}if(w=="chevron-down"){$toolbox.on("click",".icon-chevron-down",c)}else{if(w=="cloud"||w=="cog"){$toolbox.on("click",".icon-"+w,c);key(v.shortcut||"⌘+"+w+", ctrl+"+w,"markdown",c)}}}$editor.focusin(function(){key.setScope("markdown")}).focusout(function(){key.setScope()});if(j.internals){var z=j.internals;z.pushHistory=s;z.popHistory=k;z.history=q}j.value&&$editor.val(j.value);$editor.input(s);q[b]=F.value;g(true);G.attr("disabled","");B.attr("disabled","");this.html($container);o();jQuery(window).resize(function(){o()});if(j.TipIt!=0){jQuery("."+j.TipIt).tipTip()}if(j.fileToggle){var h=".FileMenu, ."+j.fileToggle;jQuery(h).on("click",function(e){e.preventDefault();jQuery("#"+j.fileMenu).toggleClass("FileShow");return false})}var D=14;function C(J){var I="#"+y;console.debug(I);var e=jQuery(I).css("font-size");var i=parseInt(e,10);console.debug(i);if(J=="RESETFont"){jQuery(I).css("font-size",D)}if(J=="LessFont"){i--;jQuery(I).css("font-size",i)}if(J=="MoreFont"){i++;jQuery(I).css("font-size",i)}o()}if(j.settingsMenu=="spellbook_settings"){$toolbox.append(E);jQuery(".settings_toggle").on("click",function(e){e.preventDefault();jQuery("#spellbook_settings").toggleClass("FileShow");return false});jQuery(".FontButton").on("click",function(i){i.preventDefault();var e=a(this).attr("id");C(e);return false})}}})(jQuery);