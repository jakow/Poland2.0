#!/bin/sh
git push 
cd build
git add .
git commit -am "Staging"
git push --set-upstream staging master
