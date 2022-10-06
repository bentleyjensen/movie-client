#!/bin/bash
function build {
    timeout 5s npm start
}

build
exit 0
