(function () {
	const TARGET_HASH = '#/quest';
	const CHECK_INTERVAL = 1000;
	const CHECK_TIMEOUT = 10000;
	const URL_WATCH_INTERVAL = 300;

	let lastUrl = window.location.href;
	console.log("Fast Quest Extension initialized!");

	function checkQuestButton() {
		if (!window.location.href.includes(TARGET_HASH)) return;

		const intervalId = setInterval(() => {
			const button = document.querySelector('.quest.button');
			if (button) {
				const bar = document.querySelector('.raid-bar-container.energy-bar span');
				const energyRequiredOne = document.querySelector('.rpc-container span').textContent;
				const [left, max] = bar.textContent.split('/');
				const energyAvailable = GetEnergy();
				const energyRequiredAll = left * energyRequiredOne;
				const canAll = energyAvailable >= energyRequiredAll;
				const fires = Math.floor((energyRequiredAll) / energyRequiredOne);

				if (!document.querySelector('#allquestbutton')) {
					addFancyButton(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll, fires);
				}
				else {
					updateFancyButton(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll, fires);
				}
				//clearInterval(intervalId);
			}
			//checkQuestButton();
		}, CHECK_INTERVAL);

		//	setTimeout(() => clearInterval(intervalId), CHECK_TIMEOUT);
	}
	function GetEnergy() {
		const resourceBars = document.querySelectorAll('.resource-bar-container')[1]
			?.querySelector('.ammount-left')
			?.querySelectorAll('span')[0];
		return resourceBars ? resourceBars.textContent.split('/')[0] : null;

	}
	function addFancyButton(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll) {
		const parent = document.querySelector('.quest.button').parentNode;

		if (parent) {

			//console.log(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll);
			const clickableDiv = document.createElement('div');
			clickableDiv.id = "allquestbutton"
			if (!canAll) {
				clickableDiv.textContent = `Spend ${energyRequiredAll} Energy`;
			}
			else {
				clickableDiv.textContent = `Spend ${energyRequiredAll} Energy`;
			}
			Object.assign(clickableDiv.style, {
				cursor: "pointer",
				width: "100px",
				color: canAll ? "green" : "red",
				display: "flex",
				alignItems: "center",
				border: "solid 2px #8b6950",
				'text-align': 'center'
			});

			const handleClick = () => {

				console.log(fires);

				clickButton(fires)
			};

			clickableDiv.addEventListener('click', handleClick);

			// Append to parent
			parent.appendChild(clickableDiv)
		}


	}
	function clickButton(fires) {
		const button = document.querySelector('.quest.button');
		if (button) {
			for (let index = 0; index < fires; index++) {
				button.click();
			}
		}
	}

	// Initial check
	checkQuestButton();

	// Watch for URL changes manually
	setInterval(() => {
		const currentUrl = window.location.href;
		if (currentUrl !== lastUrl) {
			lastUrl = currentUrl;
			checkQuestButton();
		}
	}, URL_WATCH_INTERVAL);
})();
