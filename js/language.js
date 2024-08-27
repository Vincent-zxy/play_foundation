$(document).ready(function() {
    var script = document.createElement("script");  
    script.type = "text/javascript";  
    script.src = "https://www.microsoft.com/translator/WidgetV3.ashx?siteData=YOUR_SITE_DATA&wid=YOUR_WIDGET_ID&textColor=000000&textSize=100&bubbleColor=FFFFFF&bubbleBorder=000000&autoOpen=1&from=en&to=es";
    script.onload = function() {
        // 当脚本加载完成后执行
        var value = sessionStorage.getItem("language");
        if (value === "1") {
            Microsoft.Translator.Widget.Translate('zh-CHS', 'en', onProgress, onError, onComplete, onRestoreOriginal, 2000);
        }
    };
    document.getElementsByTagName('head')[0].appendChild(script);

    function onProgress(value) {
    }
    function onError(error) {
    }
    function onComplete() {
        $("#WidgetFloaterPanels").hide();
    }
    function onRestoreOriginal() { 
    }

    
});