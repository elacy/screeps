#!/usr/bin/env bash

apt-get update && apt-get upgrade -y

# Need curl for some reason
apt-get install curl -y

curl -sL https://deb.nodesource.com/setup_8.x | sudo bash -
apt-get install -y nodejs

npm install -g rollup
