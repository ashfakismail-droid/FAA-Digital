# Sources free-licensed photography from Wikimedia Commons (CC) and downloads
# 1920px-wide JPEG fetch candidates into assets/candidates for visual curation.
$ErrorActionPreference = 'Continue'
$cand = 'assets/candidates'
New-Item -ItemType Directory -Force -Path $cand | Out-Null

$queries = @(
  @{ n = 'villa';      q = 'Villa Balbianello Lake Como' },
  @{ n = 'lakecomo';   q = 'Lake Como sunset' },
  @{ n = 'atelier';    q = 'bookbinding workshop' },
  @{ n = 'letters';    q = 'letter writing desk vintage' },
  @{ n = 'santorini';  q = 'Oia Santorini' },
  @{ n = 'ceremony';   q = 'wedding ceremony bride groom' },
  @{ n = 'couple';     q = 'bride and groom wedding' },
  @{ n = 'dance';      q = 'wedding first dance' },
  @{ n = 'bouquet';    q = 'bridal bouquet' },
  @{ n = 'table';      q = 'wedding table setting' },
  @{ n = 'rings';      q = 'wedding rings' },
  @{ n = 'toast';      q = 'wedding champagne toast' },
  @{ n = 'garden';     q = 'wisteria flowers' },
  @{ n = 'aperitivo';  q = 'aperitivo spritz' },
  @{ n = 'ballroom';   q = 'candlelight dinner party' }
)

$ua = 'PerfumeWP/1.0 (personal wedding-demo asset fetch; Author contact: none@example.com)'
$manifest = @()
$api = 'https://commons.wikimedia.org/w/api.php'
$idx = 0
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
    if ($ii.width -lt 1100) { continue }
    if ($ii.size -gt 4000000) { continue }
    $list += [pscustomobject]@{ url = $ii.thumburl; w = $ii.width; bytes = $ii.size; name = $pg.title }
  }
  $list = $list | Sort-Object -Property w -Descending | Select-Object -First 4
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
Set-Content -Path "$cand\manifest.txt" -Value ($manifest -join "`n") -Encoding utf8
Write-Host "Total candidates: $idx"