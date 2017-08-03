#!/bin/sh
git push docean master
cd build
git add .
git commit --allow-empty -am "Staging"
git push staging master
