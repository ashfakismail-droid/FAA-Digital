"""Verify every local asset referenced by index.html exists on disk."""
import re, pathlib

root = pathlib.Path(__file__).resolve().parents[1]
html = (root / 'index.html').read_text(encoding='utf-8')

refs = set()
refs.update(re.findall(r'(?:src|href)="([^"]+)"', html))
refs.update(re.findall(r"url\(['\"]?([^)'\"]+)['\"]?\)", html))

missing = []
for ref in sorted(refs):
    if ref.startswith(('http:', 'https:', '#', 'mailto:', 'data:')):
        continue
    p = root / ref.split('?')[0]
    if not p.exists():
        missing.append(ref)

print('References checked:', len(refs))
if missing:
    print('MISSING:')
    for m in missing:
        print('  -', m)
    raise SystemExit(1)
print('All local assets present.')

for marker in ('TODO', 'FIXME', 'lorem', 'Photo 1', 'placeholder-box'):
    if marker.lower() in html.lower():
        print('WARNING: marker found:', marker)