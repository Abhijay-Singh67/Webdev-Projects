let currentSong = new Audio();
let songs;
let currfolder;
let previousVolume=1;
let ham=false;
function formatTime(seconds) {
  let mins = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  let formattedMins = mins.toString().padStart(2, '0');
  let formattedSecs = secs.toString().padStart(2, '0');

  return `${formattedMins}:${formattedSecs}`;
}
async function getSongs(folder){
    currfolder = folder;
    let a = await fetch(`/Songs/${folder}/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    
    let as = div.getElementsByTagName("a");
    songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href);
        }
    }
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0];
    songUL.innerHTML = "";
    for (const song of songs) {
        let [temp1,temp] = song.split("/Songs/"+`${currfolder}/`)
        temp1 = temp1+"/Thumbnails/"+temp.split("-")[0]+".jpeg";
        temp = temp.replaceAll("%20", " ");
        songUL.innerHTML = songUL.innerHTML + `<li><div class="icons"><img src="/Assets/Images/play.svg" class="sidePlay"><img src=${temp1}></div><div class="info"><h4>${temp.split("-")[0]}</h4><h5>${temp.split("-")[1].replace(".mp3","")}</h5></div><li`;
    }

    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
            playMusic(e.querySelector(".info").firstElementChild.innerHTML,e.querySelector(".info").firstElementChild.nextElementSibling.innerHTML);
            const mediaQuery = window.matchMedia("(max-width: 650px)");
            if(mediaQuery.matches){
                document.querySelector("main .left").style.transform = "translateX(-100%)";
                ham=false;
            }
        })
    })
    return songs;
}
const playMusic = (track,author,paused=false)=>{
    currentSong.src = "/Songs/"+`${currfolder}/`+track+`-${author}`+".mp3";
    if(!paused){
        play.src = "/Assets/Images/pause.svg";
        currentSong.play();
    }
    document.querySelector(".songInfo").innerHTML = track;
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums(){
    let a = await fetch(`/Songs/`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a");
    let cardContainer = document.querySelector(".cardContainer")
    let array = Array.from(anchors)
    for (let index = 0; index < array.length; index++){
        const e = array[index];
        if(e.href.includes("/Songs")){
            let folder = e.href.split("/Songs/")[1].split("/")[0];
            let b = await fetch(`/Songs/${folder}/info.json`);
            let response = await b.json();
            cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder=${folder} class="card pointer"><img src="/Songs/${folder}/cover.jpeg"><h3>${response.title}</h3><p>${response.description}</p><div class="play pointer"><img src=/Assets/Images/play.svg></div></div>`
        }
    }

    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click",async (item)=>{
            songs = await getSongs(`${item.currentTarget.dataset.folder}`);
            let temp = songs[0].split("/Songs/"+`${currfolder}/`)[1]
            temp = temp.replaceAll("%20", " ");
            playMusic(temp.split("-")[0], temp.split("-")[1].replace(".mp3",""));
        })
    })
}
async function main(){
    songs = await getSongs("Random");
    let temp = songs[0].split("/Songs/"+`${currfolder}/`)[1]
    temp = temp.replaceAll("%20", " ");
    playMusic(temp.split("-")[0], temp.split("-")[1].replace(".mp3",""),true)

    displayAlbums();

    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src = "/Assets/Images/pause.svg";
        }else{
            currentSong.pause();
            play.src = "/Assets/Images/play.svg";
        }
    })

    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector(".songTime").innerHTML = `${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
        document.querySelector(".trail").style.width = (currentSong.currentTime/currentSong.duration)*100 + "%";
    })

    document.querySelector(".seekBar").addEventListener("click",e=>{
        let percent = (e.offsetX/document.querySelector(".seekBar").getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%";
        document.querySelector(".trail").style.width = percent + "%";
        currentSong.currentTime = (currentSong.duration * percent)/100;
    })
    hamburger.addEventListener("click",()=>{
        if(!ham){
            document.querySelector("main .left").style.transform = "translateX(0)";
            ham=true;
        }else{
            document.querySelector("main .left").style.transform = "translateX(-100%)";
            ham=false;
        }    
    })
    previous.addEventListener("click",()=>{
        let index = songs.indexOf(currentSong.src);
        if(index>0){
            let temp = songs[index-1].split("/Songs/"+`${currfolder}/`)[1]
            temp = temp.replaceAll("%20", " ");
            playMusic(temp.split("-")[0], temp.split("-")[1].replace(".mp3",""))
        }else{
            let temp = songs[songs.length-1].split("/Songs/"+`${currfolder}/`)[1]
            temp = temp.replaceAll("%20", " ");
            playMusic(temp.split("-")[0], temp.split("-")[1].replace(".mp3",""))
        }
    })

    next.addEventListener("click",()=>{
        let index = songs.indexOf(currentSong.src);
        if(index+1<songs.length){
            let temp = songs[index+1].split("/Songs/"+`${currfolder}/`)[1]
            temp = temp.replaceAll("%20", " ");
            playMusic(temp.split("-")[0], temp.split("-")[1].replace(".mp3",""))
        }else{
            let temp = songs[0].split("/Songs/"+`${currfolder}/`)[1]
            temp = temp.replaceAll("%20", " ");
            playMusic(temp.split("-")[0], temp.split("-")[1].replace(".mp3",""))
        }
    })
    
    searchButton.addEventListener("click",()=>{
        const mediaQuery = window.matchMedia("(max-width: 650px)");
        if(mediaQuery.matches){
            document.querySelector(".searchBar").style.display = "flex";
            document.getElementsByTagName("input")[0].focus();
            document.querySelector(".searchBar .bar").addEventListener("click",(e)=>{
                document.getElementsByTagName("input")[0].focus();
                e.stopPropagation();
            })
            document.querySelector(".searchBar").addEventListener("click",()=>{
                document.querySelector(".searchBar").style.display = "none";
            })
        }else{
            document.getElementsByTagName("input")[1].focus();
        }
    })

    volumeBar.addEventListener("change",()=>{
        if(volumeBar.value==0){
            volumeButton.src="/Assets/Images/Volume/muted.svg";
        }else if(volumeBar.value<30){
            volumeButton.src="/Assets/Images/Volume/uptoThirty.svg";
        }else if(volumeBar.value<80){
            volumeButton.src="/Assets/Images/Volume/thirty.svg";
        }else{
            volumeButton.src="/Assets/Images/Volume/eighty.svg"
        }
        currentSong.volume = volumeBar.value/100;
    })

    volumeButton.addEventListener("click",()=>{
        if(currentSong.volume>0){
            previousVolume=currentSong.volume;
            currentSong.volume=0;
            volumeBar.value=0;
            volumeButton.src="/Assets/Images/Volume/muted.svg";
        }else{
            currentSong.volume=previousVolume;
            volumeBar.value=100*previousVolume;
            if(volumeBar.value<30){
                volumeButton.src="/Assets/Images/Volume/uptoThirty.svg";
            }else if(volumeBar.value<80){
                volumeButton.src="/Assets/Images/Volume/thirty.svg";
            }else{
                volumeButton.src="/Assets/Images/Volume/eighty.svg"
            }
        }
    })
    currentSong.addEventListener("ended",()=>{
        let index = songs.indexOf(currentSong.src);
        if(index+1<songs.length){
            let temp = songs[index+1].split("/Songs/"+`${currfolder}/`)[1]
            temp = temp.replaceAll("%20", " ");
            playMusic(temp.split("-")[0], temp.split("-")[1].replace(".mp3",""))
        }else{
            let temp = songs[0].split("/Songs/"+`${currfolder}/`)[1]
            temp = temp.replaceAll("%20", " ");
            playMusic(temp.split("-")[0], temp.split("-")[1].replace(".mp3",""))
        }
    })

}
main()