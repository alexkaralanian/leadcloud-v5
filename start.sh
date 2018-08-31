#!/bin/bash

echo "RUNNING MIGRATIONS"
npm run migrate

echo "STARTING SERVER IN CLUSTER MODE"
pm2-runtime index.js -i max
