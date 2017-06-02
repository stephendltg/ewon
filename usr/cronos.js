var $={}
$.id=function(id){return document.getElementById(id)}
$.Class=function(Class){return document.getElementsByClassName(Class)}
$.TagName=function(TagName){return document.getElementsByTagName(TagName)}
$.Tab=function (NameClassTab,TabNumberVisible,LinkCaller){
var tab= $.Class(NameClassTab);var Link= $.TagName("a");
if (TabNumberVisible){for(var i= 0; i < tab.length; i++){$.Class(NameClassTab)[i].style.display='none';}$.Class(NameClassTab)[TabNumberVisible-1].style.display='block';}
if (LinkCaller){for(var i= 0; i < Link.length; i++){$.TagName("a")[i].classList.remove("active");}LinkCaller.classList.add('active');}
}
$.tag=function(html,tag){/*html=html.replace(/\r|\n|\t/g, "");*/return html.substring( html.indexOf('<'+tag+'>')+tag.length+2, html.lastIndexOf('</'+tag+'>') );}
$.request=function(method,file,data){var xhr;var file_request;var trame;var mode;
	if (method=='GET'||method=='DATA'){mode='GET';file_request=file+'?nocache='+ Math.random();trame=null;} else{mode=method,trame='data1='+file+'&data2='+data; file_request='update.shtm'}
	(window.XMLHttpRequest)?xhr=new XMLHttpRequest():console.log('Ajax indisponible')
	xhr.onreadystatechange = function(){ if(xhr.readyState === 4){(xhr.status == 200 && xhr.status < 300)?$.response(xhr.responseText,method):console.log('Fichier introuvable')}}
	xhr.open(mode,file_request, true);xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");xhr.send(trame);}
$.editor={get_filename:'',
get: function (file){$.request('GET',file);this.get_filename=file.substring(file.lastIndexOf("/")+1);$.id('filename').innerHTML=this.get_filename;$.id('message').innerHTML='';},
post: function (){(this.get_filename=='')?console.log('fichier non defini'):$.request('POST',this.get_filename,$.id('editor').value)},
response: function(responseText,method){(method=='GET')?$.id('editor').value=responseText:$.id('message').innerHTML=responseText}}
$.data={ get: function(file,time){$.data.file= file;(time)?setInterval("$.request('DATA',$.data.file)",time*1000):$.request('DATA',file)}}
$.response= function(responseText,method){if(method=='GET'){$.id('editor').value=responseText}else if(method=='POST'){$.id('message').innerHTML=responseText}else {response(responseText)}}
/*/t*/$.id('editor').onkeydown = function(e) {if (e.keyCode === 9) {var val = this.value,start = this.selectionStart,end = this.selectionEnd;this.value = val.substring(0, start) + '\t' + val.substring(end);this.selectionStart = this.selectionEnd = start + 1;return false;}}

