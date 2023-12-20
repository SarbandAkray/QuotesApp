let { ipcRenderer } = require("electron");
document.getElementById("close-btn").onclick = ()=>{
ipcRenderer.invoke('exitNot');
}

let q ,a;
let $ = require('jquery');
ipcRenderer.on('data', function (event,data) {
    console.log(data);
    $("#Q").html( data[0]);     
    $("#A").html( data[1]);
    q=data[0];
    a=data[1];
});

const fav = document.getElementById('addFav');

fav.addEventListener('click',()=>{
    if($(".red").hasClass("d-none")){
    $(".red").removeClass("d-none");
    $(".black").addClass("d-none");
    addTofavourites();
    }else{
        alert("already added to favourites");
    }
});
 
function addTofavourites(){

    ipcRenderer.send('item:addFavQ',{'q':q,'a':a});
}
