#!/bin/bash
function build {
    timeout 5s npm start
    echo "timeout complete"
}

build
exit 0
