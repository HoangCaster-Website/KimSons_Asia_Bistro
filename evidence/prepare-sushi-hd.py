"""Package selected Imagegen restorations as small retina-ready menu assets.

The original crops in assets/images/sushi/ are kept intact. This only resizes
and encodes the generated masters recorded in sushi-restoration-manifest.json.
"""
import json
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = Path(__file__).with_name("sushi-restoration-manifest.json")
OUTPUT = ROOT / "assets/images/sushi-hd"

if __name__ == "__main__":
    OUTPUT.mkdir(parents=True, exist_ok=True)
    records = json.loads(MANIFEST.read_text(encoding="utf-8"))["records"]
    for record in records:
        with Image.open(record["source"]) as master:
            thumbnail = ImageOps.contain(master.convert("RGB"), (320, 320), Image.Resampling.LANCZOS)
            canvas = Image.new("RGB", (320, 320), (255, 249, 237))
            canvas.paste(thumbnail, ((320 - thumbnail.width) // 2, (320 - thumbnail.height) // 2))
            canvas.save(OUTPUT / f'{record["code"].lower()}.webp', quality=90, method=6)
    print(f"Prepared {len(records)} restored photos; {sum(p.stat().st_size for p in OUTPUT.glob('*.webp')):,} bytes total.")
