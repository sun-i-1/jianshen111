from pathlib import Path
root=Path(r"D:\deepseek 文件\muscle-atlas")
source=(root/"index.html").read_text(encoding="utf-8")
new_block=(root/"tools"/"pwa-runtime-v2.html").read_text(encoding="utf-8").rstrip()
start_marker='  <script>\n    (() => {\n      const installApp = document.getElementById("installApp");'
start=source.find(start_marker)
if start < 0:
    raise SystemExit("runtime start not found")
end=source.find("  </script>\n\n</body>", start)
if end < 0:
    raise SystemExit("runtime end not found")
end += len("  </script>")
source=source[:start]+new_block+source[end:]
(root/"index.html").write_text(source, encoding="utf-8")
print("replaced runtime", end-start, "with", len(new_block), "total", len(source))
