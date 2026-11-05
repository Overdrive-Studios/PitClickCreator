# Pit Click

A browser app for building click tracks for musical theatre backing tracks.

- Load a track, auto-detect the tempo and bar 1, or tap along
- Build a tempo map with rehearsal-letter sections (tempo, meter, nudge)
- Make a show running order: repeat or cut bars, reorder sections, add click-only bars, and vamps that loop until you press GO
- Track audio is edited to match the click
- Export a .zip: click WAV, click L / track R WAV, edited track WAV, MIDI tempo map with markers, and a text running order

Open `index.html` in a browser. Everything runs locally; nothing is uploaded.

Keys: Space play/pause, G go, T tap, S split at playhead, Ctrl/Cmd+Z undo.

Export works in claude.ai and in any normal browser (it falls back to a regular download).

## Running the show in QLab

Step 3 has **Export for QLab**. It gives one zip with:

- a WAV per cue for the in-ears. By default it's click only (the track is usually just a reference) and the click goes to outputs 1 and 2, so it's in both ears. Set **The track** to *Plays in the show* to put the click on output 1 and the track on output 2 for FOH
- vamps rendered once and marked as looping slices, with a Devamp cue for each
- songs split into separate cues at any running-order entry marked **Wait for GO**
- `Import into QLab.applescript`, which builds the cues in the open QLab 5 workspace
- `Cue sheet.txt`, listing what each GO does, plus the slice times in case you need to set them by hand

Unzip into your show folder, open QLab 5 and the workspace, click the cue they should go after,
then open the script in Script Editor and press Run.
