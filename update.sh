#!/bin/bash

docker run --rm -v $(pwd):/data dockerfile/nodejs npm update
