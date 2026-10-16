# Fonthill /fh mobile story v03 — tap-through navigation and sound design (2026-10-16)

Builds on v02 (live). Geometry, models, scenes and copy are unchanged; v03 changes navigation, feedback and audio only.

## Navigation and interface
- **Tap through.** Tap the right 70% of the stage to continue, the left 30% to go back. In scenes with something to turn (underside, Deluxe solo, assembly, collection, Explore) only the outer 30% edges navigate, so the model stays free in the middle. Drags and pinches never navigate (10 px / 420 ms tap threshold). Tapping the centre of a printing scene skips printing, as the Continue button does. Back on scene 1 and forward on the last scene only tick; "Play again" stays an explicit button.
- **Progress rail.** Nine segments at the top of the screen, one per scene; tap any segment to jump. During a layer-by-layer print the current segment fills with print progress. Each segment has an accessible name ("Scene 3 of 9: Micro · 2 in").
- **First-time hint.** "Back / Tap to continue" chips appear for about five seconds on the first scenes and disappear after the first tap-through (remembered in `localStorage`, `fonthill-tapnav`). Not shown under reduced motion.
- **Feedback.** Ring-and-chevron ripple at the tap point, text that slides in from the direction of travel, light haptic tick (`navigator.vibrate`, Android only). Ripples and text motion are removed under `prefers-reduced-motion`.
- Existing Back / Continue / Notes buttons, keyboard arrows and saved progress are unchanged.

## Sound design (procedural Web Audio, no audio files)
- **Palette.** Replaces the v02 chip-tune. Marimba and kalimba plucks, inharmonic bell, soft room reverb, a quiet evolving pad.
- **Story arc.** One D-major-pentatonic note per scene, rising from scene 1 to 9; moving forward adds a fifth above, going back a fourth below, with a soft paper-slide whoosh. The pad changes chord per scene (all in D major) and ducks while a print plays or How it's made is open.
- **Printing.** Quiet stepper hum and extruder whirr that brighten as the object grows, a soft kalimba tick as layers climb the scale, and a bell-and-thunk reveal when printing completes or is skipped.
- **Touch.** Friction hiss follows the finger while turning a model, with a faint detent tick every ~15°. Distinct sounds for colour swatches, turning the Micro over, lifting and seating the castle, detail selection and opening Explore.
- **Controls.** Sound on by default (audio starts on the first tap or Start); mute is remembered; muting suspends the audio context; hiding the tab suspends and resumes it.
- Levels measured in-browser on the output bus: pad alone peak ≈ 0.05 (about −26 dBFS), scene plucks peak ≈ 0.17, loudest observed 0.23; no clipping; compressor on the master bus. **No human listening review was possible in this session; balance and taste are unjudged.**

## Verification performed
- JS syntax for story, audio and UI; packager rebuild; 49 files / ~33.9 MB uncompressed / ~18.6 MB ZIP.
- Browser (390×844, 320×568, 844×390): tap right/left, centre tap skipping a print, centre tap ignored in interactive scenes, edge tap navigating, drag not navigating, rail jump, last-scene tap not leaving the story, mute persistence and suspend/resume, How it's made ducking, no console errors.
- Not done: iPhone/Android multi-touch and real speakers; iOS silent-switch behaviour; actual Safari audio unlock timing; screen-reader pass of the rail; Vercel preview check.

## Rebuild
`.venv/bin/python scripts/2026-10-16__fonthill__web-package__v03__mobile.py` after editing `web-story__v03__mobile.js` or `web-audio__v03__sfx.js`. v02 sources and ZIP are preserved. Canonical package: `references/working/2026-10-16__fonthill__website-package__v03__tap-sound.zip`.
