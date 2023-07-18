import {} from "@coderline/alphatab";
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function TabViewer({ level, category }) {
  const ref = useRef(null);
  const [alphaTab, setAlphaTab] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [songURL, setSongURL] = useState("");
  const wrapper = useRef(null);
  let tabLevel = level
  let tabCategory = category
  async function getItems() {
    var date = new Date();

    // Get year, month, and day part from the date
    var year = date.toLocaleString("default", { year: "numeric" });
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = year + "-" + month + "-" + day;
    const items = await fetch(
      `http://localhost:1337/api/daily-${tabCategory}?filters[displayDate][$eq]=${formattedDate}&populate=deep`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    if (tabLevel == 1){
    setSongURL(
      itemsJson.data[0].attributes.level_1.data.attributes.sheetmusic.data
        .attributes.url
    );
    }
    if(tabLevel == 2){setSongURL(
      itemsJson.data[0].attributes.level_2.data.attributes.sheetmusic.data
        .attributes.url
    );}

    if(tabLevel == 3){setSongURL(
      itemsJson.data[0].attributes.level_3.data.attributes.sheetmusic.data
        .attributes.url
    );}

  }
  useEffect(() => {
    getItems();

  }, []);

  useEffect(() => {
    const settings = {
      core: {
        file: `http://localhost:1337${songURL}`,
      },
      display: {
        staveProfile: "Tab",

      },
      notation: {
        elements: {
          scoreTitle: false,
          scoreWordsAndMusic: false,
          effectTempo: true,
          guitarTuning: true,
        },
      },

      player: {
        enablePlayer: true,
        enableUserInteraction: true,
        enableCursor: true,
        soundFont: `https://alphatab-kpy7o.codesandbox.io/sound_fonts/guitar_acoustic.sf2`,
        scrollElement: document.querySelector(".at-viewport"),
      },
    };
    setAlphaTab(new window.alphaTab.AlphaTabApi(ref.current, settings));
  }, [songURL]);

  useEffect(() => {
    if (alphaTab) {
      alphaTab.soundFontLoaded.on(() => {
        setLoaded(true);
      });
      const playerIndicator = document.querySelector(
        ".at-controls .at-player-progress"
      );
      alphaTab.soundFontLoad.on((e) => {
        const percentage = Math.floor((e.loaded / e.total) * 100);
        playerIndicator.innerText = percentage + "%";
      });
      alphaTab.playerReady.on(() => {
        playerIndicator.style.display = "none";
      });

      const playPause = document.querySelector(
        ".at-controls .at-player-play-pause"
      );
      const stop = document.querySelector(".at-controls .at-player-stop");

      alphaTab.playerReady.on(() => {
        playPause.classList.remove("disabled");
        stop.classList.remove("disabled");
      });
      alphaTab.playerStateChanged.on((e) => {
        const icon = playPause.querySelector("i.fas");
        if (e.state === alphaTab.player._state) {
          icon.classList.remove("fa-play");
          icon.classList.add("fa-pause");
        } else {
          icon.classList.remove("fa-pause");
          icon.classList.add("fa-play");
        }
      });

      const songPosition = document.querySelector(".at-song-position");
      let previousTime = -1;
      alphaTab.playerPositionChanged.on((e) => {
        // reduce number of UI updates to second changes.
        const currentSeconds = (e.currentTime / 1000) | 0;
        if (currentSeconds === previousTime) {
          return;
        }

        songPosition.innerText =
          formatDuration(e.currentTime) + " / " + formatDuration(e.endTime);
      });
    }
  }, [alphaTab]);

  function formatDuration(milliseconds) {
    let seconds = milliseconds / 1000;
    const minutes = (seconds / 60) | 0;
    seconds = (seconds - minutes * 60) | 0;
    return (
      String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
    );
  }

  return (
    <Box display="flex">
      <div className="at-wrap" ref={wrapper}>
        <div className="at-content">
          <div className="at-viewport">
            <div className="at-main" ref={ref}></div>
          </div>
        </div>
        <div className="at-controls">
          <div className="at-controls-left">
            <a
              className="btn at-player-stop disabled"
              onClick={(e) => {
                if (e.target.classList.contains("disabled")) {
                  return;
                }
                alphaTab.stop();
              }}
            >
              <i className="fas fa-step-backward"></i>
            </a>
            <a
              className="btn at-player-play-pause disabled"
              onClick={(e) => {
                if (e.target.classList.contains("disabled")) {
                  return;
                }
                alphaTab.playPause();
              }}
            >
              <i className="fas fa-play"></i>
            </a>
            <span className="at-player-progress">0%</span>
            <div className="at-song-position">00:00 / 00:00</div>
            <div className="at-zoom">
              <i className="fas fa-hourglass-half"></i>
              <select
                defaultValue={"100"}
                onChange={(e) => {
                  alphaTab.playbackSpeed = e.currentTarget.value / 100;
                }}
              >
                <option value="25">0.25</option>
                <option value="50">0.50</option>
                <option value="75">0.75</option>
                <option value="90">0.90</option>
                <option value="100">1.0</option>
                <option value="110">1.10</option>
                <option value="125">1.25</option>
                <option value="150">1.50</option>
                <option value="200">2.00</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default TabViewer;
