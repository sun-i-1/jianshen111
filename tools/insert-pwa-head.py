from pathlib import Path
root=Path(r"D:\deepseek 文件\muscle-atlas")
source=(root/"index.html").read_text(encoding="utf-8")
snippet=(root/"tools"/"pwa-head.html").read_text(encoding="utf-8")
old='  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
if old not in source:
    raise SystemExit("viewport marker not found")
source=source.replace(old, snippet + '\n', 1)
(root/"index.html").write_text(source, encoding="utf-8")
print("inserted", len(snippet), "total", len(source))
