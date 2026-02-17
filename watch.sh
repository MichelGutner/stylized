#!/bin/bash

WATCH_DIR="src"

if [ ! -d "$WATCH_DIR" ]; then
  echo "❌ Directory '$WATCH_DIR' not found"
  exit 1
fi

echo "👀 Watching $WATCH_DIR..."

fswatch -o "$WATCH_DIR" | while read -r _; do
  echo "🔄 Change detected → running build:dev"
  yarn build:dev
done
