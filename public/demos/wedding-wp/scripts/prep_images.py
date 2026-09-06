"""Resize + optimize curated candidates into assets/img with final names."""
import os
from PIL import Image, ImageOps

CAND = 'assets/candidates'
OUT = 'assets/img'
os.makedirs(OUT, exist_ok=True)

MAP = {
    'hero.jpg':            ('villa-3.jpg', 1920),
    'venue-main.jpg':      ('lakecomo-6.jpg', 1600),
    'venue-garden.jpg':    ('garden-45.jpg', 1400),
    'story-atelier.jpg':   ('atelier-10.jpg', 1100),
    'story-letters.jpg':   ('atelier-11.jpg', 1100),
    'story-santorini.jpg': ('santorini-15.jpg', 1200),
    'story-villa.jpg':     ('villa-4.jpg', 1200),
    'gallery-01.jpg':      ('bouquet-32.jpg', 1100),
    'gallery-02.jpg':      ('atelier-8.jpg', 1100),
    'gallery-03.jpg':      ('santorini-18.jpg', 1200),
    'gallery-04.jpg':      ('garden-47.jpg', 1200),
    'gallery-05.jpg':      ('ceremony-20.jpg', 1200),
    'gallery-06.jpg':      ('ceremony-22.jpg', 1200),
    'gallery-07.jpg':      ('dance-28.jpg', 1200),
    'gallery-08.jpg':      ('table-35.jpg', 1200),
}

for dest, (src, maxw) in MAP.items():
    path = os.path.join(CAND, src)
    if not os.path.exists(path):
        print(f'MISSING {src}')
        continue
    im = Image.open(path)
    im = ImageOps.exif_transpose(im).convert('RGB')
    if im.width > maxw:
        h = round(im.height * maxw / im.width)
        im = im.resize((maxw, h), Image.LANCZOS)
    out = os.path.join(OUT, dest)
    im.save(out, 'JPEG', quality=82, optimize=True, progressive=True)
    print(f'{src} -> {dest}  {im.size}')

total = sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT) if f.endswith('.jpg'))
print(f'TOTAL {round(total/1024/1024, 2)} MB')