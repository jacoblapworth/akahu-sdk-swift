#!/bin/sh
echo "running pre-commit hook"
lint-staged
node ./build/versions
