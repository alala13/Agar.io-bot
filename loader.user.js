// ==UserScript==
// @name        AposLoader
// @namespace   AposLoader
// @description Grabs latest versions of the bot scripts automatically.
// @include     http://agar.io/
// @version     1
// @grant       none
// @author      http://www.twitch.tv/apostolique
// ==/UserScript==

var aposLoaderVersion = 1;

var script1 = "https://github.com/Apostolique/Agar.io-bot/raw/master/launcher.user.js";
window.jQuery("body").append('<script type="text/javascript" src="' + script1 + '"></script>');
var script2 = "https://github.com/Apostolique/Agar.io-bot/raw/master/beta.user.js";
window.jQuery("body").append('<script type="text/javascript" src="' + script2 + '"></script>');

function update(prefix, name, url) {
    window.jQuery(document.body).prepend("<div id='" + prefix + "Dialog' style='position: absolute; left: 0px; right: 0px; top: 0px; bottom: 0px; z-index: 100; display: none;'>");
    window.jQuery('#' + prefix + 'Dialog').append("<div id='" + prefix + "Message' style='width: 350px; background-color: #FFFFFF; margin: 100px auto; border-radius: 15px; padding: 5px 15px 5px 15px;'>");
    window.jQuery('#' + prefix + 'Message').append("<h2>UPDATE TIME!!!</h2>");
    window.jQuery('#' + prefix + 'Message').append("<p>Grab the update for: <a id='" + prefix + "Link' href='" + url + "' target=\"_blank\">" + name + "</a></p>");
    window.jQuery('#' + prefix + 'Link').on('click', function() {
        window.jQuery("#" + prefix + "Dialog").hide();
        window.jQuery("#" + prefix + "Dialog").remove();
    });
    window.jQuery("#" + prefix + "Dialog").show();
}

window.jQuery.get('https://raw.githubusercontent.com/Apostolique/Agar.io-bot/master/loader.user.js?' + Math.floor((Math.random() * 1000000) + 1), function(data) {
    var latestVersion = data.replace(/(\r\n|\n|\r)/gm, "");
    latestVersion = latestVersion.substring(latestVersion.indexOf("// @version") + 11, latestVersion.indexOf("// @grant"));

    latestVersion = parseFloat(latestVersion + 0.0000);
    var myVersion = parseFloat(aposLoaderVersion + 0.0000);

    if (latestVersion > myVersion) {
        update("aposLoader", "loader.user.js", "https://github.com/Apostolique/Agar.io-bot/blob/master/loader.user.js/");
    }
    console.log('Current loader.user.js Version: ' + myVersion + " on Github: " + latestVersion);
});
