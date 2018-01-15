var appticket_loaded_scripts = 0;

document.appticketIframeResize = function(){
    //alert('resized');
}

function appticketLoadScript(url, callback)
{
    appticket_loaded_scripts ++;
    console.log(appticket_loaded_scripts);
    // adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // then bind the event to the callback function
    // there are several events for cross browser compatibility
    script.onreadystatechange = callback;
    script.onload = callback;
    // fire the loading
    head.appendChild(script);
}
function appticketReady(){
    if(typeof($) == "undefined")
    {
        if( typeof(jQuery) == "function" )
        {
            var jApp = jQuery;
        }
        else
        {
            var jApp = $;
        }
    }
    else
    {
        var jApp = $;
    }
    appticket_loaded_scripts --;
    if(appticket_loaded_scripts === 0){
        jApp('[data-widget]').each(function(){
            var BASE_URL = jApp(this).data('base_url');
            var event_id = jApp(this).data('event_id');
            var event_alias = jApp(this).data('event_alias');
            var type = jApp(this).data('widget').replace('appticket_','');
            var width = jApp(this).data('width');
            var height = jApp(this).data('height');
            var text = jApp(this).data('text');
            var html = '';

            if(!width)
                width = 740;
            if(!height)
                height = 400;
            if(!BASE_URL)
                BASE_URL = 'https://appticket.com.br/';
            if(!text)
                text = 'Comprar';

            if(type=='iframe'){
                html = jApp('<div id="appticket_tickets"><iframe frameborder="0" width="100%" height="1200px"  src="'+BASE_URL+'purchase/newhotsite/iframe.php?event='+event_alias+'" vspace="0" hspace="0" marginheight="0" marginwidth="5" scrolling="auto" allowtransparency="true"|iframe frameborder="0" width="100%" height="1200px" src="'+BASE_URL+event_alias+'&iframe=1" vspace="0" hspace="0" marginheight="0" marginwidth="5" scrolling="auto" allowtransparency="true"></iframe></div>')
            }else if(type=='button'){
                html = jApp('<a href="'+BASE_URL+event_alias+'" target="_blank" title="Clique aqui e inscreva-se já!" style="display:block;margin:10px auto;text-align:center;clear: both;"><img src="'+BASE_URL+'purchase/global/imagens/bt_inscrevase_third.png" /></a>');
                html = jApp('<!-- APPTICKET - CÓDIGO PARA INCLUIR BOTÃO NO SITE --> <div id="appticket_botao" style="margin:10px auto;text-align:center;"><a href="'+BASE_URL+event_alias+'" target="_blank" title="Clique aqui e garanta sua presença!" style="margin:10px auto;text-align:center;clear: both;background:#000;color:#FFF;text-decoration:none;font:bold 14px Arial,Sans-serif;padding:10px 20px;">GARANTA SUA PRESEN&Ccedil;A</a></div> <!-- FIM -->');
            }
            jApp(this).replaceWith(html);
        })
    }
}
//Valida jQuery
if (typeof jQuery == 'undefined') {
    appticketLoadScript("https://appticket.com.br/painel/js/jquery-1.9.0.min.js", appticketReady);
} else {
    if(typeof($) == "undefined")
    {
        if( typeof(jQuery) == "function" )
        {
            var jApp = jQuery;
        }
        else
        {
            var jApp = $;
        }
    }
    else
    {
        var jApp = $;
    }
    jApp(document).ready(function(){
        appticketReady();
    });
}