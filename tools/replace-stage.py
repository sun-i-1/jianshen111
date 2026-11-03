from pathlib import Path
root = Path(r"D:\deepseek 文件\muscle-atlas")
source = (root / "index.html").read_text(encoding="utf-8")
stage = (root / "tools" / "new-stage.html").read_text(encoding="utf-8")
start_marker = "    <section class=\"body-stage\""
end_marker = "\n  </main>"
start = source.index(start_marker)
end = source.index(end_marker, start)
source = source[:start] + stage.rstrip() + source[end:]
(root / "index.html").write_text(source, encoding="utf-8")
print("replaced", end-start, "with", len(stage), "total", len(source))
