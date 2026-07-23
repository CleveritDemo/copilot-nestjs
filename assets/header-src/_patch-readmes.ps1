# Script to insert the header image tag into README.md and README_EN.md.
# Uses .NET File APIs to preserve UTF-8 encoding without BOM and original line endings.

param(
    [string]$RepoRoot = (Get-Location).Path
)

$ErrorActionPreference = 'Stop'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Edit-Readme {
    param(
        [string]$Path,
        [string]$OldMarker,
        [string]$NewBlock
    )

    if (-not (Test-Path $Path)) {
        throw "File not found: $Path"
    }

    $content = [System.IO.File]::ReadAllText($Path, $utf8NoBom)

    if ($content.IndexOf($OldMarker) -lt 0) {
        Write-Host "  [SKIP] Marker not found in $Path (probably already patched)."
        return $false
    }

    $updated = $content.Replace($OldMarker, $NewBlock)
    [System.IO.File]::WriteAllText($Path, $updated, $utf8NoBom)
    Write-Host "  [OK]   Patched $Path"
    return $true
}

# --- README.md (Spanish) ---
$esOld = @"
<div align="center">

  # 🚀 Copilot para NestJS: Del Prompt al Código Seguro
"@

$esNew = @"
<div align="center">

  <img src="./assets/header_esp.png" alt="Copilot para NestJS - Del Prompt al Código Seguro" width="100%" />

  # 🚀 Copilot para NestJS: Del Prompt al Código Seguro
"@

Write-Host "Patching README.md ..."
Edit-Readme -Path (Join-Path $RepoRoot 'README.md') -OldMarker $esOld -NewBlock $esNew | Out-Null

# --- README_EN.md (English) ---
$enOld = @"
<div align="center">

  # 🚀 Copilot for NestJS: From Prompt to Secure Code
"@

$enNew = @"
<div align="center">

  <img src="./assets/header_eng.png" alt="Copilot for NestJS - From Prompt to Secure Code" width="100%" />

  # 🚀 Copilot for NestJS: From Prompt to Secure Code
"@

Write-Host "Patching README_EN.md ..."
Edit-Readme -Path (Join-Path $RepoRoot 'README_EN.md') -OldMarker $enOld -NewBlock $enNew | Out-Null

Write-Host "Done."
