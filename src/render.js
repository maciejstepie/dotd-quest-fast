import { clickButton } from "./content";

export function addFancyButton(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll, fires) {
	const parent = document.querySelector('.quest.button').parentNode;

	if (parent) {

		//console.log(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll);
		const clickableDiv = document.createElement('div');
		clickableDiv.id = "allquestbutton"
		if (!canAll) {
			if (fires == 0) {
				clickableDiv.textContent = `Doesn't have enough energy!`;
			} else {
				clickableDiv.textContent = `Requires ${energyRequiredAll} Energy\nCan spend ${fires * energyRequiredOne} energy`;
			}
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
			clickButton(fires);
			updateFancyButton(clickableDiv);
		};

		clickableDiv.addEventListener('click', handleClick);

		// Append to parent
		parent.appendChild(clickableDiv)
	}


}
function updateFancyButton(buttonContext) {
	//SOON
	//console.log(buttonContext, "updating button test");


}