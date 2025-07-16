
window.onload = async function() {

//carregar dados da internet (data.json)
    let request= await fetch("data.json");
    let audioData = await request.json();

    // Variaveis de elementos
    let title = document.querySelector("#title");
    let previousButton = document.querySelector("#previous-button");
    let playbutton = document.querySelector("#play-button");
    let nextbutton = document.querySelector("#next-button");
    
    let scrubinput= document.querySelector("#scrub-input");
    let volumeinput= document.querySelector("#volume-input");

    let fileinput = document.querySelector("#file-input");
    
    let audio = document.querySelector("audio");
    let currentTrack = 0;
    console.log(audioData[currentTrack]);

     
    // Funções
    function changeTitle(value) {
    title.innerText = value;
    }
    function updateInputBar(value, bar) {
        bar.style.transform = "scaleX(" + value / 100 + ")";
    }

    previousButton.onclick = function() {
        console.log("previous button clicked");
    }
    playbutton.onclick = function() {
        if(audio.paused) {
            playAudio();
        } else {
            pauseAudio();   
        }
    }
     
    nextbutton.onclick = function() {
        console.log("next button clicked");
    }

    scrubinput.querySelector("input").oninput = function(event) {
        let bar = scrubinput.querySelector(".range-bar");
        updateInputBar(event.target.value, bar);
    } 
    volumeinput.querySelector("input").oninput = function(event) {
        let bar = volumeinput.querySelector(".range-bar");
        updateInputBar(event.target.value, bar);
    } 
    fileinput.oninput = function(event) {
    console.log("aqui")
       
    }
    audio.onplay = function() {
        let playicon = document.querySelector("#icon-play");
        let pauseicon    = document.querySelector("#icon-pause");
        playicon.style.display = "none";
        pauseicon.style.display = "block";
    }
    audio.onpause = function() {
        let playicon = document.querySelector("#icon-play");
        let pauseicon    = document.querySelector("#icon-pause");
        playicon.style.display = "block";
        pauseicon.style.display = "none";

        console.log("audio esta pausado");
    }

    function playAudio() {
        audio.src = audioData[currentTrack].url;
        audio.play();
    }

    function pauseAudio() {
        audio.pause();

    }
    audioData.onplay = function() {
        console.log("audio esta a tocar");
    }
}
