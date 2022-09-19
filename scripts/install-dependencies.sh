#!/bin/bash
sudo apt update

## Install jq
which jq >/dev/null 2>&1;

if [ $? -ne 0 ]; then
    sudo apt install jq -y
fi

## Install php
which php >/dev/null 2>&1;

if [ $? -ne 0 ]; then
    sudo apt install php-cli -y
fi

## Check and install packages dependencies

## pnpm global install
which pnpm >/dev/null 2>&1;

if [ $? -ne 0 ]; then
    npm install -g pnpm
fi

## dot-json global install
which dot-json >/dev/null 2>&1;

if [ $? -ne 0 ]; then
    pnpm add --global dot-json
fi
