#!/bin/bash

JS_FOLDER="./site/assets/js"

main() {
  rm -rf $JS_FOLDER/* && \
  tsc && \
  browserifyImports
}

browserifyImports() {
  addMissingExtensions

  transformAliasImports
}

addMissingExtensions() {
  local sedString="s|from ['\"](.*)['\"];|from '\1.js';|g"
  echo "sed -Ei $sedString"
  find $JS_FOLDER -name "*.js" -exec sed -Ei "$sedString" {} \;
}

transformAliasImports() {
  local sedString="s|from '@/(.*)';|from '$BROWSER_JS_PATH/\1';|g"
  echo "sed -Ei $sedString"
  find $JS_FOLDER -name "*.js" -exec sed -Ei "$sedString" {} \;
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  main "$@"
fi
