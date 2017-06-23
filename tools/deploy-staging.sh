#!/bin/sh
git push -f docean v2:master
cd build
git add .
git commit --allow-empty -am "Staging"
git push staging master
