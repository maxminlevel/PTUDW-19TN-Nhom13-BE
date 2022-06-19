#!/bin/bash
set -e
npm i
npm i --save-dev
for f in *.env; do cp "$f" "$(echo "$f" | sed s/example//)"; done
npm run docker:setup
npm run docker:up