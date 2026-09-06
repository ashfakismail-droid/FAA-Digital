"""Compute size / aspect / brightness stats for curation candidates."""
import os
from PIL import Image

CAND = os.path.join('assets', 'candidates')
rows = []
for fn in sorted(os.listdir(CAND)):
    if not fn.lower().endswith(('.jpg', '.jpeg')):
        continue
    path = os.path.join(CAND, fn)
    try:
        im = Image.open(path)
        im.load()
        w, h = im.size
    except Exception as e:
        rows.append((fn, 'ERR', str(e)[:40], 0, 0, 0, 0, 0))
        continue
    small = im.convert('RGB').resize((40, 40))
    px = list(small.getdata())
    n = len(px)
    lum = sum(0.299 * r + 0.587 * g + 0.114 * b for r, g, b in px) / n
    r_avg = sum(p[0] for p in px) / n
    b_avg = sum(p[2] for p in px) / n
    ratio = w / h
    orient = 'P' if ratio < 0.95 else ('L' if ratio > 1.05 else 'S')
    rows.append((fn, orient, round(ratio, 2), w, h, round(lum), round(r_avg), round(b_avg)))

print(f"{'file':28s} {'or':3s} {'rat':5s} {'w':5s} {'h':5s} {'lum':4s} {'R':4s} {'B':4s}")
for r in rows:
    if len(r) == 8 and r[1] != 'ERR':
        print(f"{r[0]:28s} {r[1]:3s} {r[2]:5.2f} {r[3]:5d} {r[4]:5d} {r[5]:4d} {r[6]:4d} {r[7]:4d}")
    else:
        print(f"{r[0]:28s} {r[1]:3s} {r[2]}")