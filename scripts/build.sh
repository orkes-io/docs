#!/bin/bash
set -e

BUILD_FOLDER=$(pwd)
ASSEMBLED_DIR="$BUILD_FOLDER/assembled/content"

echo "Building docs project..."

# Install dependencies and build the docs project
yarn
yarn build

# Prepare the assembled directory
mkdir -p "$ASSEMBLED_DIR"

# Copy the build output to the assembled directory
rsync -a build/ "$ASSEMBLED_DIR/"

# Output the assembled directory contents
find "$ASSEMBLED_DIR"

echo "Build completed successfully."
echo "User is $GH_USER"
