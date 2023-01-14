var muted = false;
var volumeState = 0;
var volumeCounter = 1;
var actualVolume = 0;

document.addEventListener("keydown", (data) => {

  if (document.activeElement === document.querySelector(`input`)) return; // Avoids using keys while the user interacts with any input, like search.
  const ytShorts = document.querySelector(
    "#shorts-player > div.html5-video-container > video"
  );

  const key = data.key.toLowerCase();

  switch (key) {
    case "j":
      ytShorts.currentTime -= 5;
      break;

    case "l":
      ytShorts.currentTime += 5;
      break;

    case "u":
      if (ytShorts.playbackRate > 0.25) ytShorts.playbackRate -= 0.25;
      break;

    case "i":
      ytShorts.playbackRate = 1;
      break;

    case "o":
      if (ytShorts.playbackRate < 16) ytShorts.playbackRate += 0.25;
      break;

    case "+":
      if (ytShorts.volume <= 0.975) {
        setVolume(ytShorts.volume + 0.025);
      }
      break;

    case "-":
      if (ytShorts.volume >= 0.025) {
        setVolume(ytShorts.volume - 0.025);
      }
      break;

    case "m":
      if (!muted) {
        muted = true;
        volumeState = ytShorts.volume;
        ytShorts.volume = 0;
      } else {
        muted = false;
        ytShorts.volume = volumeState;
      }
      break;
  }
  setSpeed = ytShorts.playbackRate;
});

const getCurrentId = () => {
  const videoEle = document.querySelector(
    "#shorts-player > div.html5-video-container > video"
  );

  if (videoEle) return videoEle.closest("ytd-reel-video-renderer").id;
  return null;
};

const getActionElement = (id) =>
  document.querySelector(
    `[id='${id}']  > div.overlay.style-scope.ytd-reel-video-renderer > ytd-reel-player-overlay-renderer > #actions`
  );

const setTimer = (currTime, duration) => {
  document.getElementById(
    `ytTimer${getCurrentId()}`
  ).innerText = `save`;
  // ).innerText = `${currTime}/${duration}s`;
};

const setVolumeSlider = () => {
  let index = parseFloat(getCurrentId()) + volumeCounter;
  const volumeContainer = document.querySelectorAll(`yt-icon-button.style-scope.ytd-shorts-player-controls`)[index].parentNode;
  const slider = document.createElement('input');

  if (!actualVolume) {
    actualVolume = 0.5;
  }

  checkVolume();

  slider.id = "volumeSliderController";
  slider.classList.add("volumeSlider");
  slider.type = 'range';
  slider.min = 0;
  slider.max = 1;
  slider.step = 0.01;
  // volumeContainer.appendChild(slider);
  slider.value = actualVolume;

  slider.addEventListener("input", (data) => {
    data.stopPropagation();
    data.preventDefault();
    data.stopImmediatePropagation();

    setVolume(data.target.value);
  });
  volumeCounter++;
};

const setVolume = (volume) => {
  const volumeContainer = document.querySelectorAll(`yt-icon-button.style-scope.ytd-shorts-player-controls`)[parseFloat(getCurrentId()) + (volumeCounter - 1)].parentNode;
  const volumeSliderController = volumeContainer.children.volumeSliderController;
  volumeSliderController.value = volume;

  const ytShorts = document.querySelector(
    "#shorts-player > div.html5-video-container > video"
  );
  ytShorts.volume = volume;
  localStorage.setItem("yt-player-volume", `{
      "data": {\"volume\":`+ volume + `,\"muted\":` + muted + `}
    }`)
}

const checkVolume = () => {
  let ytShorts = document.querySelector(
    "#shorts-player > div.html5-video-container > video"
  );
  if (JSON.parse(localStorage.getItem("yt-player-volume"))["data"]["volume"]) {
    actualVolume = JSON.parse(localStorage.getItem("yt-player-volume"))["data"]["volume"];
    ytShorts.volume = actualVolume;
  } else {
    actualVolume = ytShorts.volume;
  }
};

// const setPlaybackRate = (currSpeed) => {
const setPlaybackRate = (text) => {
  document.getElementById(
    `ytPlayback${getCurrentId()}`
  ).innerHTML = text; // icon 1x change
  // ).innerHTML = `${currSpeed}x`; // icon 1x change
};

var injectedItem = new Set();
var lastTime = -1;
var lastSpeed = 0;
var setSpeed = 1;

const timer = setInterval(() => {
  const ytShorts = document.querySelector(
    "#shorts-player > div.html5-video-container > video"
  );

  var currentId = getCurrentId();
  var actionList = getActionElement(currentId);

  if (injectedItem.has(currentId)) {

    var currTime = Math.round(ytShorts.currentTime);
    var currSpeed = ytShorts.playbackRate;

    if (currTime !== lastTime) {
      setTimer(currTime, Math.round(ytShorts.duration || 0));
      lastTime = currTime;
    }
    if (currSpeed != lastSpeed) {
      setPlaybackRate('cvb');
      lastSpeed = currSpeed;
    }
  } else {
    lastTime = -1;
    lastSpeed = 0;

    if (actionList) {
      //Container div
      const timerContainer = document.createElement("div");
      timerContainer.classList.add("betterYT-container");

      // Timer
      const ytTimer = document.createElement("div");
      var para0 = document.createElement("p");
      para0.classList.add("betterYT");
      para0.id = `ytTimer${currentId}`;
      ytTimer.appendChild(para0); // time

      // Playback Rate
      const ytPlayback = document.createElement("div");
      var para1 = document.createElement("p");
      para1.classList.add("betterYT");
      para1.classList.add("playBack");
      para1.id = `ytPlayback${currentId}`;

      para1.onclick = function () {
        console.log(`${currentId}`);
        setPlaybackRate('asd')


        const embeddedUrl = document.querySelector(
          "#shorts-player > div.ytp-chrome-top > div.ytp-title > div.ytp-title-text > a"
        ).href;

        console.log(embeddedUrl.substring(embeddedUrl.indexOf('=') + 1))


        // console.log('jkl')
        // // let url = document.head.querySelector("[og:video:url][content]").content;
        // let url = document.querySelector('meta[name="og:video:url"]').content
        // console.log('url', url)

        // function getMeta(metaName) {

        //   const metas = document.getElementsByTagName('meta');

        //   for (let i = 0; i < metas.length; i++) {
        //     // console.log(metas[i])
        //     // console.log(metas[i].getAttribute('property'))
        //     if (metas[i].getAttribute('property') === metaName) {
        //       return metas[i].getAttribute('content');
        //     }
        //   }

        //   return '';
        // }
        // console.log('return', getMeta('og:url'));
      };

      ytPlayback.appendChild(para1); // icon 1x

      timerContainer.appendChild(ytPlayback); // icon 1x
      actionList.insertBefore(timerContainer, actionList.children[1]);
      actionList.insertBefore(ytTimer, actionList.children[2]);
      injectedItem.add(currentId);

      ytShorts.playbackRate = setSpeed;
      setPlaybackRate(setSpeed);

      setTimer(currTime || 0, Math.round(ytShorts.duration || 0));

      timerContainer.addEventListener("click", (data) => {
        ytShorts.playbackRate = 1;
        setSpeed = ytShorts.playbackRate;
      });
    }
    setVolumeSlider();
  }
  checkVolume();
}, 100);
