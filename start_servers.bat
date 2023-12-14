taskkill /F /IM node.exe

start cmd /k "cd .\backend-sc\ && nodemon"
start cmd /K "cd .\client-sc\ && npm run dev"