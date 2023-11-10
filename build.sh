#!/bin/bash
hugo --baseUrl="https://www.enjoy61.com/" --buildFuture --cleanDestinationDir
cd public
echo "www.enjoy61.com" > CNAME
git add -A
git commit -m "$1"
git push
cd ..
