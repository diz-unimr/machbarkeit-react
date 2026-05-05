#!/usr/bin/env sh
# ================================================================================
# File: env.sh
# Description: Replaces environment variables in asset files.
# From: https://github.com/Dutchskull/Vite-Dynamic-Environment-Variables
# ================================================================================

# Set the exit flag to exit immediately if any command fails
set -e

APP_PREFIX=MACHBARKEIT_
ASSET_DIR=/app/dist/assets

# Check if the directory exists
if [ ! -d "$ASSET_DIR" ]; then
    # If not, display a warning message and skip to the next iteration
    echo "Warning: directory '$ASSET_DIR' not found, skipping."
    continue
fi

# Display the current directory being scanned
echo "Scanning directory: $ASSET_DIR"

# Iterate through each environment variable that starts with APP_PREFIX
env | grep "^${APP_PREFIX}" | while IFS='=' read -r key value; do
    # Display the variable being replaced
    echo "  • Replacing ${key} → ${value}"

    # Use find and sed to replace the variable in all files within the directory
    find "$ASSET_DIR" -type f \
        -exec sed -i "s|${key}|${value}|g" {} +
done

exec "${@}"
