const songs = [
    {
        title: "Wildfire",
        artist: "Jessie Villa",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079817/Wildfire_-_Jessie_Villa_vmhsme.mp3",
        cover: "assets/cover1.png"
    },
    {
        title: "Two Things",
        artist: "Anno Domini Beats",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079816/Two_Things_-_Anno_Domini_Beats_vv7nzk.mp3",
        cover: "assets/cover2.png"
    },
    {
        title: "Slip Away",
        artist: "Blue Beat Review",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079807/Slip_Away_-_Blue_Beat_Review_h6oxzl.mp3",
        cover: "assets/cover3.png"
    },
    {
        title: "Rise of the Machines",
        artist: "Trey Xavier",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079798/Rise_of_the_Machines_-_Trey_Xavier_hk27ex.mp3",
        cover: "assets/cover1.png"
    },
    {
        title: "Sky Is The Limit",
        artist: "Anno Domini Beats",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079802/Sky_Is_The_Limit_-_Anno_Domini_Beats_j0f2ti.mp3",
        cover: "assets/cover2.png"
    },
    {
        title: "All For You",
        artist: "Anno Domini Beats",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079793/All_For_You_-_Anno_Domini_Beats_rkrnki.mp3",
        cover: "assets/cover3.png"
    },
    {
        title: "Paradise",
        artist: "Anno Domini Beats",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079800/Paradise_-_Anno_Domini_Beats_imnjcp.mp3",
        cover: "assets/cover1.png"
    },
    {
        title: "Walking the Wire",
        artist: "National Sweetheart",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079805/Walking_the_Wire_-_National_Sweetheart_oigxai.mp3",
        cover: "assets/cover2.png"
    },
    {
        title: "Never Coming Down",
        artist: "The Soundlings",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079811/Never_Coming_Down_-_The_Soundlings_jlutpl.mp3",
        cover: "assets/cover3.png"
    },
    {
        title: "Everything",
        artist: "Rodina feat. Alfie Tito",
        url: "https://res.cloudinary.com/dteiw2ptc/video/upload/q_auto/f_auto/v1781079817/Everything_feat._Rodina_Alfie_Tito_-_Rodina_feat._Alfie_Tito_lzpdkl.mp3",
        cover: "assets/cover1.png"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
const audio = new Audio();

// DOM Elements
const songGrid = document.getElementById('song-grid');
const quickLinks = document.getElementById('quick-links');
const playerArt = document.getElementById('player-art');
const playerTrackName = document.getElementById('player-track-name');
const playerTrackArtist = document.getElementById('player-track-artist');
const playPauseBtn = document.getElementById('play-pause-btn');
const playPauseIcon = playPauseBtn.querySelector('i');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const volumeBar = document.getElementById('volume-bar');
const volumeIcon = document.getElementById('volume-icon');
const greetingEl = document.getElementById('greeting');

// Initialize
function init() {
    renderSongs();
    renderQuickLinks();
    setGreeting();
    loadSong(songs[currentSongIndex]);
}

function setGreeting() {
    const hours = new Date().getHours();
    if (hours < 12) greetingEl.textContent = "Good Morning";
    else if (hours < 18) greetingEl.textContent = "Good Afternoon";
    else greetingEl.textContent = "Good Evening";
}

function renderSongs() {
    songGrid.innerHTML = songs.map((song, index) => `
        <div class="song-card" onclick="playSong(${index})">
            <img src="${song.cover}" alt="${song.title}">
            <div class="play-overlay">
                <i class="fas fa-play"></i>
            </div>
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        </div>
    `).join('');
}

function renderQuickLinks() {
    const top6 = songs.slice(0, 6);
    quickLinks.innerHTML = top6.map((song, index) => `
        <div class="quick-link-card" onclick="playSong(${index})">
            <img src="${song.cover}" alt="${song.title}">
            <span>${song.title}</span>
        </div>
    `).join('');
}

function loadSong(song) {
    playerTrackName.textContent = song.title;
    playerTrackArtist.textContent = song.artist;
    playerArt.src = song.cover;
    playerArt.classList.remove('hidden');
    audio.src = song.url;
}

function playSong(index) {
    if (index !== undefined) {
        currentSongIndex = index;
        loadSong(songs[currentSongIndex]);
    }
    
    isPlaying = true;
    audio.play();
    updatePlayIcon();
}

function pauseSong() {
    isPlaying = false;
    audio.pause();
    updatePlayIcon();
}

function updatePlayIcon() {
    if (isPlaying) {
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else {
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
}

function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
    playSong(currentSongIndex);
}

function nextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) currentSongIndex = 0;
    playSong(currentSongIndex);
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event Listeners
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) pauseSong();
    else playSong();
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progressPercent;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    }
});

progressBar.addEventListener('input', () => {
    const seekTime = (progressBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
    if (audio.volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (audio.volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-low';
    } else {
        volumeIcon.className = 'fas fa-volume-high';
    }
});

audio.addEventListener('ended', nextSong);

// Start App
init();
