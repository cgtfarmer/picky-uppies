#!/bin/bash

main() {
  copyAssets && \
    tsc && \
    browserifyImports
}

browserifyImports() {
  local sedString="s|'@/|'$BASE_PATH|g"
  find ./out/assets/app -name "*.js" -exec sed -Ei $sedString {} \;
}

copyAssets() {
  if [[ ! -d ./out/assets ]]; then
    mkdir -p ./out/assets/css
    mkdir -p ./out/assets/app
  fi

  cp ./src/*.html ./out
  cp ./src/assets/css/* ./out/assets/css/
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
