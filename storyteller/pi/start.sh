#!/bin/sh
# Run inside the Pi desktop session after the SPI screen works at 320x240.
set -eu
URL="${STORYTELLER_URL:-https://y29.fivsevn.com/storyteller/}"
BROWSER="$(command -v chromium || command -v chromium-browser || true)"
if [ -z "$BROWSER" ]; then
  echo 'Chromium is required. Install it using your Raspberry Pi OS package manager.' >&2
  exit 1
fi
if [ -z "${DISPLAY:-}${WAYLAND_DISPLAY:-}" ]; then
  echo "Run this script inside the Pi graphical desktop session." >&2
  exit 1
fi
exec "$BROWSER" --kiosk --no-first-run --noerrdialogs --disable-session-crashed-bubble --window-size=320,240 --force-device-scale-factor=1 "$URL"
