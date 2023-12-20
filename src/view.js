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
let $ = require('jquery');
let q , a;

getNewQuote();
function getNewQuote(){
$.ajax({
    url: "https://zenquotes.io/api/random",
    type: 'GET',
    dataType: 'json', // added data type
    success: function(res) {
      
       $("#Q").html( res[0]['q']);     
       $("#A").html( res[0]['a']);
       q = res[0]['q'];
       a =  res[0]['a'];
    }
});
}
//animate the TITLE
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


// favourite icon
const fav = document.getElementById('addFav');

fav.addEventListener('click',()=>{
    if($(".red").hasClass("d-none")){
    $(".red").removeClass("d-none");
    $(".black").addClass("d-none");
    console.log("here we go");
    addTofavourites();
    }else{
        alert("already added to favourites");
    }
});


// next quote icon

const next = document.getElementById('nextquote');

next.addEventListener("click",()=>{
 getNewQuote();
 $(".red").addClass("d-none");
 $(".black").removeClass("d-none");
});

function addTofavourites(){
    ipcRenderer.send('item:addFavQ',{'q':q,'a':a});
}



