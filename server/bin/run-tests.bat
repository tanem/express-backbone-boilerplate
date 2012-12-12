%~dp0node.exe %~dp0stop-server.js
rmdir %~dp0..\..\_junitxml\server /s /q
mkdir %~dp0..\..\_junitxml\server
cd %~dp0
jasmine-node ..\test --junitreport --output ..\..\_junitxml\server
