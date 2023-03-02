@echo off
title Run
if exist env\scripts\activate (
    call env/scripts/activate
) else (
    echo The virtual environment does not exist
)