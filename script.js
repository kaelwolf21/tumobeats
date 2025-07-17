
window.onload = async function() {

//carregar dados da internet (data.json)
    let request= await fetch("data.json");
    let audioData = await request.json();

    //carregar o service worker
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js")
    }

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
        currentTrack--;
        if(currentTrack < 0) {
            currentTrack = audioData.length - 1;
        }
        playAudio();
        
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
        let value = event.target.value;
        scrubaudio(value);
        updateInputBar(value, bar);
    } 
    volumeinput.querySelector("input").oninput = function(event) {
        let bar = volumeinput.querySelector(".range-bar");
        let value = event.target.value;
        audio.volume = value / 100;
        updateInputBar(event.target.value, bar);
    } 
    fileinput.oninput = function(event) {
        let file = Array.from(fileInput.files)[0];
        let reader = new FileReader();
        reader.onload = function() {
        audioData.push({
        title: file.name,
        url: reader.result
        });
        }
        if (file) {
        reader.readAsDataURL(file);
        }
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

    }
    audio.ontimeupdate = function() {
        let value = (audio.currentTime / audio.duration) * 100;
        let bar = scrubinput.querySelector(".range-bar");
        updateInputBar(value, bar);
    }


    function playAudio() {
        audio.src = audioData[currentTrack].url;
        changeTitle(audioData[currentTrack].title);
        audio.play();
    }
         
    function pauseAudio() {
        audio.pause();

    }
    audioData.onplay = function() {
        console.log("audio esta a tocar");
    }

    function scrubaudio(value) {
        audio.currentTime = (value / 100) * audio.duration;
    }
}     
