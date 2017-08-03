#!/bin/sh
git push docean master
cd build
git add .
git commit --allow-empty -am "Production commit $(date +'%F %T')"
git push production master
