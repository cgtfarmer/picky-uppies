#!/bin/bash

main() {
  if [[ ! -d ./out ]]; then
    mkdir ./out
  fi

  cp ./src/*.html ./out
  cp -r ./src/assets/css ./out/assets
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
