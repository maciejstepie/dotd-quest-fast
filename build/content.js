(() => {
  // src/locale/en.json
  var en_default = {
    "error.no_energy": "Doesn't have enough energy!",
    "warning.energy": "Requires {{energyRequiredAll}} Energy\nCan spend {{canSpend}} energy",
    "spend.energy": "Spend {{energyRequiredAll}} Energy"
  };

  // src/locale/pl.json
  var pl_default = {};

  // src/locale/index.js
  var translations = { en: en_default, pl: pl_default };
  function t(lang, key, vars = {}) {
    const langData = translations[lang] || translations.en;
    let text = langData[key] || key;
    for (const k in vars) {
      text = text.replace(`{{${k}}}`, vars[k]);
    }
    return text;
  }

  // src/render.js
  var renderOnButton = false;
  function addFancyButton(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll, fires) {
    const parent = document.querySelector(".quest.button").parentNode;
    if (parent) {
      const clickableDiv = document.createElement("div");
      clickableDiv.id = "allquestbutton";
      let className = "fancyButton ";
      if (renderOnButton) {
        className += "inside ";
      }
      if (!canAll) {
        if (fires == 0) {
          clickableDiv.textContent = t("en", "error.no_energy", { name: "John" });
          className += "error";
        } else {
          clickableDiv.textContent = t("en", "warning.energy", { energyRequiredAll, canSpend: fires * energyRequiredOne });
          className += "warning";
        }
      } else {
        clickableDiv.textContent = t("en", "spend.energy", { energyRequiredAll });
      }
      clickableDiv.className = className;
      const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        clickButton(fires);
      };
      clickableDiv.addEventListener("click", handleClick);
      parent.appendChild(clickableDiv);
    }
  }

  // src/content.js
  function clickButton(fires) {
    const button = document.querySelector(".quest.button");
    if (button) {
      for (let index = 0; index < fires; index++) {
        button.click();
      }
    }
  }
  function GetEnergy() {
    const resourceBars = document.querySelectorAll(".resource-bar-container")[1]?.querySelector(".ammount-left")?.querySelectorAll("span")[0];
    return resourceBars ? resourceBars.textContent.split("/")[0] : null;
  }
  (function() {
    const TARGET_HASH = "#/quest";
    const CHECK_INTERVAL = 1e3;
    const CHECK_TIMEOUT = 1e4;
    const URL_WATCH_INTERVAL = 300;
    let lastUrl = window.location.href;
    console.log("Fast Quest Extension initialized!");
    function checkQuestButton() {
      if (!window.location.href.includes(TARGET_HASH)) return;
      const intervalId = setInterval(() => {
        const button = document.querySelector(".quest.button");
        if (button) {
          const bar = document.querySelector(".raid-bar-container.energy-bar span");
          const energyRequiredOne = document.querySelector(".rpc-container span").textContent;
          const [left, max] = bar.textContent.split("/");
          const energyAvailable = GetEnergy();
          const energyRequiredAll = left * energyRequiredOne;
          const canAll = energyAvailable >= energyRequiredAll;
          const fires = energyAvailable < energyRequiredAll ? Math.floor(energyAvailable / energyRequiredOne) : Math.floor(energyRequiredAll / energyRequiredOne);
          if (!document.querySelector("#allquestbutton")) {
            addFancyButton(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll, fires);
          } else {
          }
        }
      }, CHECK_INTERVAL);
    }
    checkQuestButton();
    setInterval(() => {
      const currentUrl = window.location.href;
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl;
        checkQuestButton();
      }
    }, URL_WATCH_INTERVAL);
  })();
})();
