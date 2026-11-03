from pathlib import Path
root=Path(r"D:\deepseek 文件\muscle-atlas")
source=(root/"index.html").read_text(encoding="utf-8")
snippet=(root/"tools"/"pwa-runtime.html").read_text(encoding="utf-8")
marker="</body>\n</html>"
if marker not in source:
    raise SystemExit("body marker not found")
source=source.replace(marker, snippet+"\n"+marker, 1)
(root/"index.html").write_text(source, encoding="utf-8")
print("inserted runtime", len(snippet), "total", len(source))
