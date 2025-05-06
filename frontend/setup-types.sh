#!/bin/bash

# Install TypeScript type definitions for libraries used in the project
echo "Installing TypeScript type definitions..."

npm install --save-dev \
  @types/react@^18.2.15 \
  @types/react-dom@^18.2.7 \
  @types/node@^16.18.38 \
  @types/jest@^27.5.2 \
  @types/react-router-dom@^5.3.3 \
  @types/react-dropzone@^5.1.0

echo "Done installing TypeScript type definitions."
echo "You may need to restart your TypeScript server or IDE for changes to take effect." 