#!/bin/bash
hugo --baseUrl="https://enjoy61.github.io/" --buildFuture --cleanDestinationDir
cd public
git add -A
git commit -m "$1"
git push
cd ..
