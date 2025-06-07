@echo off
echo 正在启动亲戚计算器...

:: 检查是否安装了 Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 使用 Python 启动服务器...
    echo 当前目录: %CD%
    echo 正在启动服务器...
    start http://localhost:8000
    python -m http.server 8000 --directory "%CD%"
    goto :eof
)

:: 检查是否安装了 Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 使用 Node.js 启动服务器...
    :: 检查是否安装了 http-server
    http-server --version >nul 2>&1
    if %errorlevel% neq 0 (
        echo 正在安装 http-server...
        npm install -g http-server
    )
    start http://localhost:8080
    http-server
    goto :eof
)

:: 如果都没有安装，提示用户安装
echo 错误：未检测到 Python 或 Node.js
echo 请安装以下任一软件：
echo 1. Python 3.x
echo 2. Node.js
echo.
echo 安装后重新运行此脚本即可。
pause 