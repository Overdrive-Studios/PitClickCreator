# Pit Click

Click tracks for musical theatre backing tracks: tempo maps, vamps, safeties, segues and a QLab export that the operator only has to press GO on.

## Download

Get the latest Mac and Windows apps from the **[Releases page](https://github.com/Overdrive-Studios/PitClickCreator/releases/latest)**. They work fully offline, and your songs, maps and settings stay on your computer.

**Mac** (Apple Silicon and Intel): open `Pit-Click-…-Mac.dmg` and drag Pit Click into Applications.
The first time you open it, macOS says it can't check the app. Click **Done**, open **System Settings → Privacy & Security**, scroll down and click **Open Anyway** next to Pit Click. After that it opens normally.

**Windows**: run `Pit-Click-…-Windows-Setup.exe`. If Windows shows "Windows protected your PC", click **More info → Run anyway**. The `Portable.exe` runs without installing.

The apps aren't signed with an Apple or Microsoft developer certificate yet, which is why those one-time warnings appear.

The web version still works too: open `index.html` in a browser, or the GitHub Pages site.

## What it does

- Add every song in the show, drag them into order, and mark songs that flow straight into the next
- Auto-detect the tempo and bar 1, or tap along; any time signature, rits, holds, and a feel per section (in 1, 2, 4…)
- Drag a section's start line onto the hit in the waveform to line the click up with the recording
- Running order: repeat or cut bars, reorder sections, add click-only bars, turn the click off for a part
- Vamps and safeties: a set number of times every night, or looping until the MD's GO
- Count-in in bars or clicks (1, 2, 3, 4, 6, 8…), and Wait-for-GO stopped points
- Exports match exactly what you hear in Pit Click

Keys: Space play/pause, G go, T tap, S split at the playhead, Ctrl/Cmd+Z undo.

## Running the show in QLab

**Export ▾ → QLab** gives one zip (or one for the whole show) with:

- a WAV per cue: click only in both ears, click on output 1 and track on output 2 for FOH, or track and click together with the click down the centre
- vamps and safeties set to the MD's GO as looping slices, each with its own Leave vamp / End safety GO; ones set to a number of times are built straight into the audio
- a new cue only at your own Wait-for-GO points; segues joined into one cue so the next song starts exactly on time
- `Import into QLab.applescript`, which builds the cues in the open QLab 5 workspace
- `Cue sheet.txt`, listing what each GO does, plus the slice times in case you need to set them by hand

Unzip into your show folder, open QLab 5 and the workspace, click the cue they should go after, then open the script in Script Editor and press Run.

## Building the desktop apps

The desktop apps wrap the same `index.html` with Electron (in `desktop/`). Push a tag such as `v1.0.1` and GitHub Actions builds the `.dmg` and `.exe` on Mac and Windows machines and attaches them to a release. To try it locally: `cd desktop && npm install && npm start`.
