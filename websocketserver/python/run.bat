@echo off
title Run
if exist env\scripts\activate (
    call env/scripts/activate
    python server.py
) else (
    echo The virtual environment does not exist
)