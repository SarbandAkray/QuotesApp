let { ipcRenderer } = require("electron");
document.getElementById("close-btn").onclick = ()=>{
ipcRenderer.invoke('exit');
}
document.getElementById("mini-btn").onclick = ()=>{
    ipcRenderer.invoke('mini');
}
document.getElementById("max-btn").onclick = ()=>{
    ipcRenderer.invoke('max');
}

//animating title
const anime =require("animejs");
anime({
    targets: '.path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration:2000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
});

let $ = require("jquery");
// getting settings on right values
var fs = require('fs');

loadSettings();
function loadSettings(){
    if (fs.existsSync("settings.json")) {
        $("#OFF,#15m,#30m,#1h,#2h,#3h,#4h").css({
            "background-color":"white",
            "color":"black"
        });
        const fileData = JSON.parse(fs.readFileSync('settings.json'))
        let notificationsetting = [fileData[0].name,fileData[0].value]
        $("#"+notificationsetting[1]).css({
            "background-color":"black",
            "color":"white"
        });
    }
    ipcRenderer.invoke("setSettingsNot");
}


//on click notifcaiton chnage
$("#OFF,#15m,#30m,#1h,#2h,#3h,#6h").click((e)=>{
    var fs = require('fs');
    const fileData = JSON.parse(fs.readFileSync('settings.json'));
    fileData[0].value= e.target.id;
    fs.writeFileSync('settings.json', JSON.stringify(fileData, null, 2));
    loadSettings();
});


