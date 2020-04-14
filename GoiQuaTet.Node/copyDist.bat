REM robocopy ".\src\contents" ".\dist\Contents" /S /E /nfl /ndl /njh /njs
REM robocopy ".\src\assets" ".\dist\assets" /S /E /nfl /ndl /njh /njs
robocopy ".\dist" "..\GoiQuaTet.Web\dist" /S /E /nfl /ndl /njh /njs
REM robocopy ".\dist" ".\public\dist" /S /E /nfl /ndl /njh /njs
robocopy /PURGE ".\src\contents" "..\GoiQuaTet.Web\dist\Contents" /S /E /nfl /ndl /njh /njs /xf *.min.css
EXIT 0