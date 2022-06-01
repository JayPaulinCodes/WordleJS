taskkill /f /t /fi "WINDOWTITLE eq WordleJS*" /im cmd.exe
title WordleJS
mode con:cols=32 lines=16
node index.js