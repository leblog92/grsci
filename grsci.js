if($("#div0").length==0){
if($("#div0").length==0){
	jQuery('body').prepend('<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet"><style>span{transition:.5s}.uni{position:fixed;z-index:10000;overflow-y:scroll;scrollbar-width:none;background-color:rgba(0,129,178,1);height:auto;padding:10px;margin:10px;border-radius:4px;color:#fff;font-family:"Roboto Mono",monospace;box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.12),0px 1px 4px 0px rgba(0, 0, 0, 0.12);transition:1s;}.uni::-webkit-scrollbar{display:none;}#div0{top:40px;width:261px;}#div1{top:40px;width:261px;}#div2{left:0;user-select:none;}#div3{left:70px;user-select:none;background:#c72c48;}#div4{user-select:none;right:0px;}#div5{user-select:none;left:150px;}</style><div title="Requête de Sélection" class="uni" id="div0" style="right:-300px;" contenteditable="false"><h3>👉GRSCI™ v5</h3>Générateur de Requête de Sélection sur <a style="color:white;text-decoration:none;" href="https://catalogue.mediatheque-rueilmalmaison.fr/" target="_blank"><u>Catalogue InMedia</u></a><hr style="border-top:0.1px solid white;"><div style="font-size:14px;">Pour créer votre séléction survolez les titres des documents pour générer la requête \'LocalNumber:####\' avec l\'opérateur \'OR\'. Ne fonctionne pas avec les ressources en ligne.<br><br></div></div><div title="Titres de la séléction" class="uni" id="div1" style="left:-300px;" contenteditable="false">Changelog<br><ul><li>Affichage des titres</li><li>Bouton "Hide/Show"</li><li>Bouton "Reset"</li><li>Bouton "Remove last"</li><li>Résultats surlignés</li></ul><img src="https://leblog92.github.io/grsci/cat.png" style="margin-bottom:-26px;" width="240px" height=auto"/></div><div title="Montre/cache le GRSCI" class="uni" style="bottom:-60px;" id="div2">Hide</div><div title="Efface la sélection" id="div3" style="bottom:-60px;" class="uni">Reset</div><div title="Nombre de documents" id="div4" style="bottom:-60px;" class="uni">0 document</div><div id="div5" title="Efface la dernière sélection" style="bottom:-60px;" class="uni">Remove last</div>');

	$(document).ready(function(){
		var origin=window.location.origin;
		var arr0=[];
		var arr1=[];
		var shown=true;
		var n=0;

		$("#div0").attr("style","right:0px;");
		$("#div1").attr("style","left:0px");
		$("#div2").attr("style","bottom:0px");
		$("#div4").attr("style","bottom:0px");

		$("#div2").on("click",function(){
			if(shown==true){
				$("#div0").attr("style","right:-300px;");
				$("#div1").attr("style","left:-300px;");
				$("#div2").attr("style","bottom:0px;opacity:0.5;");
				$("#div3").attr("style","bottom:-60px;");
				$("#div4").attr("style","bottom:-60px;");
				$("#div5").attr("style","bottom:-60px;");
				shown=false;
				$("#div2").html("Show");
			}else{
				$("#div0").attr("style","right:0;");
				$("#div1").attr("style","left:0;");
				$("#div2").attr("style","bottom:0px;opacity:1;");
				$("#div4").attr("style","bottom:0px;");
				if(arr0.length>0){
					$("#div3").attr("style","bottom:0px");
					$("#div5").attr("style","bottom:0px;");
				}
				shown=true;
				$("#div2").html("Hide");
			}
		});

		$("#div3").on("click",function(){
			$("#div0").html('<img style="border-radius:4px;" src="https://leblog92.github.io/grsci/jedi.gif"/>');
			$("#div1").html('<img style="border-radius:4px;" src="https://leblog92.github.io/grsci/jedi.gif"/>');
			$("#div3").attr("style","bottom:-60px");
			$("#div5").attr("style","bottom:-60px");
			arr0=[];
			arr1=[];
			n=0;
			setTimeout(function(){
				$("#div0").html("“Ce ne sont pas ces documents que vous recherchez.”<br><div style=\"text-align:right\">- Obi-Wan Kenobi</div>");
				$("#div1").html("“Ce ne sont pas ces documents que vous recherchez.”<br><div style=\"text-align:right\">- Obi-Wan Kenobi</div>");
				$("#div4").html(n+" document");
			},1920);
			
		});

		$("#div5").on("click",function(){
			if (arr0.length>0){
				arr0.splice(-1);
				arr1.splice(-1);
				n--;
				$("#div0").html(arr0);
				$("#div1").html(arr1);
				if(n>1){
					$("#div4").html(n+" documents");
				}else{
					$("#div4").html(n+" document");
				}
				if(arr0.length===0){
					$("#div0").html("“Échouer, c'est avoir la possibilité de recommencer de manière plus intelligente.”<br><div style=\"text-align:right\">- Henry Ford</div>");
					$("#div1").html("“Échouer, c'est avoir la possibilité de recommencer de manière plus intelligente.”<br><div style=\"text-align:right\">- Henry Ford</div>");
					$("#div3").attr("style","bottom:-60px");
					$("#div5").attr("style","bottom:-60px");
				}else{
					return;
				}
			}
		});

		$(document).on("mouseover","span",function(){
			$("."+$(this).attr("class")).css("background","rgba(255,255,255,0.5)");
		});
		
		$(document).on("mouseout","span",function(){
			$("."+$(this).attr("class")).css("background","rgba(255,255,255,0)");
		});

		$(document).on("mouseenter","a",function(){
			if(shown==true){
				var ark0=$(this).attr("href");
				var ark1=$(this).attr("title");
				if(~ark0.indexOf("/notice?id=p%3A%3Ausmarcdef_")){
					if(origin=="https://catalogue.mediatheque-rueilmalmaison.fr"){ark0=ark0.slice(28);}else{ark0=ark0.slice(75);}
					ark0=ark0.substring(0,10);
					ark1=ark1.substring(0,25);
					ark1=ark1.replace('"','\"');
					ark1=ark1.replace("'","\'");
					if(arr0==""){
						n++;
						$("#div0").attr("contenteditable","true");
						$("#div1").attr("contenteditable","true");
						arr0.push("<span class=\"n"+n+"\">LocalNumber:"+ark0+"</span>");
						arr1.push("<span class=\"n"+n+"\">"+ark1+"</span><br>");
						$("#div4").html(n+" document");
						$("#div3").attr("style","bottom:0px");
						$("#div5").attr("style","bottom:0px");
					}else{
						if(~arr0.toString().indexOf(ark0)){
							return;
						}else{
							n++;
							arr0.push(" OR <span class=\"n"+n+"\">LocalNumber:"+ark0+"</span>");
							arr1.push("<span class=\"n"+n+"\">"+ark1+"</span><br>");
							$("#div4").html(n+" documents");
						}
					}
					$("#div0").html(arr0);
					$("#div1").html(arr1);
				}
			}
		});
	});
}