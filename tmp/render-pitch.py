import sys
from pathlib import Path
sys.path.insert(0, str(Path('tmp/pitch-tools').resolve()))
import pymupdf

pdf = pymupdf.open('pitch/E-JUAN-Pitch.pdf')
assert len(pdf) == 24, len(pdf)
out = Path('tmp/pitch-final-pdf')
out.mkdir(exist_ok=True)
for i, page in enumerate(pdf):
    page.get_pixmap(matrix=pymupdf.Matrix(1, 1)).save(out / f'slide-{i+1}.png')
    text = page.get_text()
    assert f'{i+1:02d} / 24' in text, (i+1, 'page numbering missing')
    assert 'E-JUAN' not in text if i < 3 else 'E-JUAN' in text
    assert '\ufffd' not in text, (i+1, 'replacement glyph in PDF')
assert '1.85M' in pdf[4].get_text()
assert '41.2%' in pdf[5].get_text()
assert '54' in pdf[6].get_text()
assert '10,000' in pdf[7].get_text()
assert '60,000' in pdf[8].get_text()
assert '100' in pdf[9].get_text()
print(f'PDF verified: {len(pdf)} pages, {pdf[0].rect.width} × {pdf[0].rect.height} pt; page numbers, figures, problem-first order and text glyphs checked.')
