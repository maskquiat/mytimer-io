# MyTimer.io — Visual Routine Timer

Visit: **https://mytimer.io**

## What is MyTimer.io?

A free visual timer, built by a special educator, that shows your whole routine on a real analog clock. Each activity is a colored wedge, so you can see exactly when each step ends. It's designed for time blindness, ADHD, executive function support and classroom transitions.

Great for:
- Classroom transitions, learning centers and test sections
- Morning, homework and bedtime routines
- Pomodoro and focused study sessions
- Calm-down breaks and brain breaks

## Features

- ⏰ **Multi-activity routines**: plan several steps and they run back to back
- 🕐 **Real clock face**: wedges start at the current time, so you see when each step ends
- 🔁 **Auto 12-hour view**: plans longer than an hour switch to a 12-hour face so nothing overlaps (or pick 60-minute / 12-hour in Settings)
- ⚡ **Quick timers**: one tap for 1–60 minutes (or any length), without losing your saved plan
- 📚 **Template gallery**: 24 ready-made routines for the classroom, home, study, executive function and calm-down time, each with a shareable link
- ⭐ **My templates**: save any plan as your own template
- 🎨 **Optional wedge patterns**: stripes, dots and other textures so activities can be told apart without relying on color
- 🪟 **Floating clock**: keep the clock on top while you work or present (pop-out window in Chrome and Edge)
- 🔊 **Three completion sounds**: chime, bell and alert, stored with the site
- 🌙 **Dark mode**, plus support for your device's reduce-motion setting
- 👆 **Large touch targets** for kids, tablets and interactive boards
- ⏱️ **Accurate in background tabs**: time is based on the real clock, not a counter
- 💾 **Saves automatically** in your browser

## Quick timer pages

Each length has its own page:
[1](https://mytimer.io/1-minute-timer/) ·
[2](https://mytimer.io/2-minute-timer/) ·
[3](https://mytimer.io/3-minute-timer/) ·
[5](https://mytimer.io/5-minute-timer/) ·
[10](https://mytimer.io/10-minute-timer/) ·
[15](https://mytimer.io/15-minute-timer/) ·
[20](https://mytimer.io/20-minute-timer/) ·
[25](https://mytimer.io/25-minute-timer/) ·
[30](https://mytimer.io/30-minute-timer/) ·
[45](https://mytimer.io/45-minute-timer/) ·
[60](https://mytimer.io/60-minute-timer/) minutes

## Shareable links

- `https://mytimer.io/?t=10` opens a ready-to-start 10-minute timer (any length from 1 to 720)
- `https://mytimer.io/?template=morning-routine` opens a template from the gallery (use the link button on any template card)

## Using it on a phone or tablet

Visit mytimer.io in Safari or Chrome and choose **Add to Home Screen** for one-tap access.

## Privacy

Your activities, templates and settings are saved only in your browser on your device. MyTimer.io doesn't have accounts, and your plans are never uploaded. The site uses Google Analytics to count visits and see which pages are used.

---

### For maintainers

- The site is static: `index.html`, the `sounds/` folder, the quick-timer folders (`5-minute-timer/` etc.), icons, `sitemap.xml` and `robots.txt`. Upload them all to the repository root.
- `sw.js` retires a service worker from an earlier version of the site. Keep it until a new PWA service worker replaces it.
- Styles in `index.html` are **compiled Tailwind CSS** (no CDN). Only the classes used in the file are included. If new Tailwind classes are added to the page, the style block must be recompiled, or the new classes will have no effect. The config is noted in a comment above the style block.
