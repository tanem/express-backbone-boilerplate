%~dp0..\..\server\bin\node.exe %~dp0..\..\server\bin\stop-server.js
start %~dp0..\..\server\bin\node.exe %~dp0..\..\server\server.js
start casperjs %~dp0..\test\lib\casperjs-runner.js
