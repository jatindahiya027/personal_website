@echo off
for %%i in (*.jpg *.png *.jpeg) do (
    ffmpeg -i "%%i" -q:v 70 "%%~ni.webp"
)
