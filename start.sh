#!/bin/bash

echo "RUNNIGN MIGRATIONS"
npm run migrate

echo "STARTING SERVER"
node index.js
