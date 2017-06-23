#!/bin/sh
cd build
git commit --allow-empty -am "Staging"
git push --set-upstream staging master
