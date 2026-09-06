@echo off
start /b "" powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\fetch-photos.ps1" > photos-log.txt 2> photos-err.txt