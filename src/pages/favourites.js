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

let $ = require('jquery');
//getting the json file from favourites 
var fs = require('fs');
if (fs.existsSync("sample.json")) {
    const fileData = JSON.parse(fs.readFileSync('sample.json'))
    var oneQ = fileData.map(function(o){
        return `
        <blockquote class="blockquote blockquote-custom bg-white p-5 m-4 shadow rounded quote">
          <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
          <p class="mb-0 mt-2 font-italic first" id="Q">${o.q}</p>
          <footer class="blockquote-footer pt-4 mt-4 border-top">
              <cite title="Source Title" id="A">${o.a}</cite>
          </footer>
        </blockquote>
        `;
      });
      
      $('#json').append(oneQ);
  }else{
   var noqoutes = `
   <blockquote class="blockquote blockquote-custom bg-white p-5 m-4 shadow rounded quote">
          <div class="blockquote-custom-icon bg-info shadow-sm"><i class="fa fa-quote-left text-white"></i></div>
          <p class="mb-0 mt-2 font-italic first" style="text-align: center;"> YOU DONT HAVE ANY QUOTES IN FAVOURITES</p>
        </blockquote>
   `;
   $('#json').append(noqoutes);
  }
