#!/bin/sh
git push -f docean v2:master
cd build
git commit --allow-empty -am "Staging"
git push --set-upstream staging master
