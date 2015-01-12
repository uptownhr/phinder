#!/bin/bash

docker stop pinder
docker start pinder
docker logs -f pinder
