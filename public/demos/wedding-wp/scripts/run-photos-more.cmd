@echo off
start /b "" powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\fetch-photos-more.ps1" > photos-more-log.txt 2> photos-more-err.txt