#!/bin/bash

echo "BUILDING CLIENT"
npm run build

echo "RUNNIGN MIGRATIONS"
npm run migrate

echo "STARTING SERVER"
node index.js
