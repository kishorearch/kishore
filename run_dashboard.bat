@echo off
title NEO*CHURN Real-Time Intelligence Dashboard
echo ========================================================
echo  NEO*CHURN // E-COMMERCE CHURN REAL-TIME ANALYSIS
echo ========================================================
echo Starting local preview server...
python server.py
if errorlevel 1 (
    echo Python server launch failed, opening index.html directly...
    start index.html
)
pause
