var div0=document.getElementById("div0");
if(!div0){
	jQuery('body').prepend('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"><style>.uni{position:fixed;z-index:10000;overflow-y:scroll;scrollbar-width:none;background-color:rgba(0,129,178,1);height:auto;padding:10px;margin:10px;border-radius:4px;color:#fff;font-family:"Roboto Mono",monospace;box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.12),0px 1px 4px 0px rgba(0, 0, 0, 0.12);transition:1s;}.uni::-webkit-scrollbar{display:none;}#div0{top:40px;width:270px;}#div1{top:40px;width:270px;}#div2{left:0;bottom:0;user-select:none;}</style><div title="Requête de Sélection" class="uni" id="div0" style="right:0;" contenteditable="false"><h3>👉GRSCI™ v3</h3>Générateur de Requête de Sélection sur <a style="color:white;text-decoration:none;" href="https://catalogue.mediatheque-rueilmalmaison.fr/" target="_blank"><u>Catalogue InMedia</u></a><hr style="border-top:0.1px solid white;">Pour créer votre séléction survolez les titres des documents pour générer la requête \'LocalNumber:####\' avec l\'opérateur \'OR\'. Ne fonctionne pas avec les ressources en ligne.<br><br></div><div title="Titres de la séléction" class="uni" id="div1" style="left:0;" contenteditable="false">Changelog GRSCI™ v4 :<br><ul><li>Les titres des documents</li><li>Bouton Hide/Show</li></ul><br><img src="https://leblog92.github.io/grsci/cat.png" style="margin-bottom:-26px;" width="100%" height=auto"/></div><div title="Montre/cache l\'outil" class="uni" id="div2">Hide</div>');
	$(document).ready(function(){
		var origin=window.location.origin;
		var div0=document.getElementById("div0");
		var div1=document.getElementById("div1");
		var div2=document.getElementById("div2");
		var arr0=[];
		var arr1=[];
		var shown=true;
		$("#div2").on("click",function(){
			if(shown==true){$("#div0").attr("style","right:-300px;");$("#div1").attr("style","left:-300px");shown=false;div2.innerHTML="Show";}else{$("#div0").attr("style","right:0;");$("#div1").attr("style","left:0;");shown=true;div2.innerHTML="Hide";}
		});
		$(document).on("mouseenter","a",function(){
			var ark0=$(this).attr("href");
			var ark1=$(this).attr("title");
			if(~ark0.indexOf("/notice?id=p%3A%3Ausmarcdef_")){
				if(origin=="https://catalogue.mediatheque-rueilmalmaison.fr"){ark0=ark0.slice(28);}else{ark0=ark0.slice(75);}
				ark0=ark0.substring(0,10);
				ark1=ark1.substring(0,24);
				ark1=ark1.replace('"','\"');
				ark1=ark1.replace("'","\'");
				if(arr0==""){
					div0.setAttribute("contenteditable","true");
					div1.setAttribute("contenteditable","true");
					arr0.push("LocalNumber:"+ark0);
					arr1.push(ark1+"<br>");
				}else{
					if(~arr0.toString().indexOf(ark0)){
						return;
					}else{
						arr0.push(" OR LocalNumber:"+ark0);
						arr1.push(ark1+"<br>");
					}
				}
				$(div0).html(arr0);
				$(div1).html(arr1);
			}
		});
	});
}