#!/bin/bash

docker run --rm -it --name bot-discord \
-v $(pwd):/app \
node:16 bash