# Supplementary fetch: fills quality gaps found during curation.
$ErrorActionPreference = 'Continue'
$cand = 'assets/candidates'
$queries = @(
  @{ n = 'ws-atelier';  q = 'book restoration workshop' },
  @{ n = 'ws-atelier2'; q = 'printing workshop letters press' },
  @{ n = 'ws-letters';  q = 'handwritten letter envelope ink' },
  @{ n = 'ws-couple';   q = 'wedding couple embracing sunset' },
  @{ n = 'ws-couple2';  q = 'couple walking wedding' },
  @{ n = 'ws-toast';    q = 'champagne glasses clinking' },
  @{ n = 'ws-dance';    q = 'wedding reception dance' },
  @{ n = 'ws-ceremony'; q = 'wedding bride groom outdoor ceremony' }
)
$ua = 'PerfumeWP/1.0 (personal wedding-demo asset fetch; Author contact: none@example.com)'
$manifest = @()
$api = 'https://commons.wikimedia.org/w/api.php'
$idx = 100
foreach ($s in $queries) {
  $used = 0
  $uri = "$api`?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=25&prop=imageinfo&iiprop=url`|size&iiurlwidth=1920&gsrsearch=" + $s.q.Replace(' ', '%20')
  $json = ''
  for ($try = 0; $try -lt 3; $try++) {
    $json = ((curl.exe -s -A $ua -o - $uri) -join "`n")
    if ($json -match '"query"') { break }
    sleep 3
  }
  if ($json -notmatch '"query"') { Write-Host "FAIL $($s.n)"; continue }
  $j = ($json | ConvertFrom-Json)
  if (-not $j.query.pages) { continue }
  $pages = $j.query.pages
  $list = @()
  foreach ($p in $pages.PSObject.Properties) {
    $pg = $p.Value
    if (-not $pg.imageinfo) { continue }
    if ($pg.title -notmatch '\.jpe?g$') { continue }
    $ii = $pg.imageinfo[0]
    if ($ii.width -lt 1000) { continue }
    if ($ii.size -gt 4000000) { continue }
    $list += [pscustomobject]@{ url = $ii.thumburl; w = $ii.width; bytes = $ii.size; name = $pg.title }
  }
  $list = $list | Sort-Object -Property w -Descending | Select-Object -First 5
  foreach ($f in $list) {
    $idx++
    $fn = "$($s.n)-$idx.jpg"
    curl.exe -sL -A $ua -o "$cand\$fn" $f.url
    $manifest += "$($s.n)`t$fn`t$($f.name)"
    $used++
  }
  Write-Host "$($s.n): downloaded $used"
  sleep 2
}
Add-Content -Path "$cand\manifest-more.txt" -Value ($manifest -join "`n") -Encoding utf8
Write-Host "Total: $idx"