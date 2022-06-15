#!/bin/bash
set -e
npm i
npm i --save-dev
npm docker:setup
npm docker:up