var audio = document.getElementById('audio');
var progressBar = document.getElementById('progress-bar');
var progress = document.getElementById('current-progress');
var thumb = document.getElementById('thumb')
var play = document.getElementById('play')
var prev = document.getElementById('prev')
var next = document.getElementById('next')
var playPause = document.getElementById('playPause')
var song = document.getElementById('song')
var artist = document.getElementById('artist')
var playing = true
var index = 0;
const makeRequest = async() => {
    const url = './data.json'
    const res = await fetch(url)
    songs = await res.json()
    audio.src = songs[index]["src"]
    song.textContent = songs[index]["song"]
    artist.textContent = songs[index]["artist"]
}
makeRequest()
var songs

play.addEventListener('click',() => {
    if(playing)
    {
        audio.pause()
        playing = false
        playPause.className = 'fa-solid fa-play'
    }
    else
    {
        audio.play()
        playPause.className = 'fa-solid fa-pause'
        playing = true
    }
})
prev.addEventListener('click',() => {
    index--
    index = index < 0 ? 0 : index
    console.log(index)
    audio.src = songs[index]["src"]
    song.textContent = songs[index]["song"]
    artist.textContent = songs[index]["artist"]
    audio.play()
})
next.addEventListener('click',() => {
    index++
    index > 4 ? 0 : index
    console.log(index)
    audio.src = songs[index]["src"]
    song.textContent = songs[index]["song"]
    artist.textContent = songs[index]["artist"]
    audio.play()
})
audio.addEventListener('timeupdate', () =>
{
    var value = (audio.currentTime / audio.duration) * 100
    thumb.style.left = value + '%'
    progress.style.width = value + '%'
})
progressBar.addEventListener('click', (e) => {
    var width = progressBar.clientWidth
    var clickX = e.clientX - progressBar.getBoundingClientRect().left
    var percent = (clickX / width)
    audio.currentTime = percent * audio.duration
})