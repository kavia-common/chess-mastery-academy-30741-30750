#!/bin/bash
cd /home/kavia/workspace/code-generation/chess-mastery-academy-30741-30750/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

