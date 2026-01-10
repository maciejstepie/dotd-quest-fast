# dotd-quest-fast

Very simple chrome based browser extension to add a button that will allow to click once to perform all required clicks on node.

# Features

-   Allows to click one new button to runs all clicks on the node
-   Turns text green or red if you have enough energy to run all clicks

## Building bundle

I use `pnpm` as packet manager but feel free to use `npm` or `yarn` or whatever you like
Run `pnpm run build` script to update bundle in `build` directory.

## 🧩 How to Install This Extension

You can load this extension into any Chromium-based browser (such as Chrome, Brave, or Edge) by following these steps:

## Settings

-   Posible switch to render on top of vanilla button by editng boolean value `renderOnButton` in `render.js`.

### 1. Download or Clone the Repository

```bash
git clone git@github.com:maciejstepie/dotd-quest-fast.git
```

Or download it as a ZIP and extract it to a folder.

### 2. Open the Chrome Extensions Page

-   Open your browser and go to (when for example chrome): `chrome://extensions/`
-   Enable **Developer mode** using the toggle in the top right corner.

### 3. Load the Unpacked Extension

-   Click the **"Load unpacked"** button.
-   Select the `build` folder that contains the extension files (make sure it includes `manifest.json`).

### 4. Done!

-   The extension should now appear in your browser's extension list.
-   If you make changes to the code, click the **Reload** button on the extensions page to apply them.

## Know bugs to fix

-   Doesn't update the required energy after manually clicking button or when energy is refreshed or when energy updates from potion or interval
