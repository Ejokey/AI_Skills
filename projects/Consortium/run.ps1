$ErrorActionPreference='Continue'
[Console]::OutputEncoding=[System.Text.Encoding]::UTF8
cd 'C:/Users/Vladislav/Desktop/Claude folder/projects/Consortium'
$c = (Get-Content -Raw 'C:/Users/Vladislav/Desktop/Claude folder/projects/Consortium/ctx.md' -Encoding UTF8) -replace "`r`n"," " -replace "`n"," "
claude -p $c --dangerously-skip-permissions --output-format text *> claude_out.txt