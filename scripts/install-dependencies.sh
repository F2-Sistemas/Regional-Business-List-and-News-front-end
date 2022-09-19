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
    sudo apt install php php-cli -y
fi

## Check and install packages dependencies

export PNPM_HOME="${HOME}/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"

## pnpm global install
which pnpm >/dev/null 2>&1;

if [ $? -ne 0 ];
    then
    npm install -g pnpm
    else
    pnpm setup
fi

## dot-json global install
which dot-json >/dev/null 2>&1;

if [ $? -ne 0 ]; then
    pnpm setup
    pnpm add --global dot-json
fi
