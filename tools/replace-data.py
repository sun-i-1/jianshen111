from pathlib import Path

root = Path(__file__).resolve().parent.parent
html_path = root / "index.html"
data_path = root / "tools" / "new-data-block.txt"

source = html_path.read_text(encoding="utf-8")
start_marker = "      const muscleData = {"
end_marker = "\n\n      const stage ="
start = source.index(start_marker)
end = source.index(end_marker, start)
new_block = data_path.read_text(encoding="utf-8").rstrip() + "\n"
source = source[:start] + new_block + source[end:]
source = source.replace("muscleData", "trainingData")
html_path.write_text(source, encoding="utf-8")
print(f"replaced {end - start} chars with {len(new_block)} chars; total {len(source)}")
