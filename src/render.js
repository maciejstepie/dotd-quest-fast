import { clickButton } from "./content";
import t from "./locale";
const renderOnButton = false;

export function addFancyButton(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll, fires) {
	const parent = document.querySelector('.quest.button').parentNode;

	if (parent) {
		//console.log(left, max, energyAvailable, energyRequiredOne, energyRequiredAll, canAll);
		const clickableDiv = document.createElement('div');
		clickableDiv.id = "allquestbutton"
		let className = "fancyButton ";
		if (renderOnButton) {
			className += "inside "
		}
		if (!canAll) {
			if (fires == 0) {
				clickableDiv.textContent = t('en', "error.no_energy", { name: 'John' })
				className += "error";
			} else {
				clickableDiv.textContent = t('en', "warning.energy", { energyRequiredAll: energyRequiredAll, canSpend: fires * energyRequiredOne })
				className += "warning";
			}
		}
		else {
			clickableDiv.textContent = t('en', "spend.energy", { energyRequiredAll: energyRequiredAll });
		}

		clickableDiv.className = className;

		const handleClick = (e) => {
			e.stopPropagation();
			e.preventDefault();

			clickButton(fires);
			//	updateFancyButton(clickableDiv);
		};

		clickableDiv.addEventListener('click', handleClick);

		// Append to parent
		parent.appendChild(clickableDiv)
	}


}
function updateFancyButton(buttonContext) {
	const clickableDiv = document.getElementById('allquestbutton');
	if (clickableDiv) {

	}


}