from pathlib import Path
root=Path(r"D:\deepseek 文件\muscle-atlas")
source=(root/"index.html").read_text(encoding="utf-8")
css=(root/"tools"/"install-css.txt").read_text(encoding="utf-8")
marker="\n  </style>\n</head>"
if marker not in source:
    raise SystemExit("style marker not found")
source=source.replace(marker, "\n"+css+"\n  </style>\n</head>", 1)
(root/"index.html").write_text(source, encoding="utf-8")
print("inserted", len(css), "total", len(source))
