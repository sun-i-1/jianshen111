from PIL import Image, ImageDraw
from pathlib import Path
root=Path(r"D:\deepseek 文件\muscle-atlas")
def make(size):
    scale=4
    s=size*scale
    img=Image.new("RGB",(s,s),"#ffffff")
    d=ImageDraw.Draw(img)
    # rounded black tile inset, maskable safe area
    inset=int(s*0.10)
    r=int(s*0.20)
    d.rounded_rectangle([inset,inset,s-inset,s-inset],radius=r,fill="#1b1d22")
    # orange M mark
    w=int(s*0.085)
    pad=int(s*0.26)
    top=int(s*0.27)
    bottom=int(s*0.74)
    mid=int(s*0.55)
    left=pad
    right=s-pad
    d.line([(left,bottom),(left+int(s*0.15),top)],fill="#f15a32",width=w,joint="curve")
    d.line([(left+int(s*0.15),top),(s//2,mid)],fill="#f15a32",width=w,joint="curve")
    d.line([(s//2,mid),(right-int(s*0.15),top)],fill="#f15a32",width=w,joint="curve")
    d.line([(right-int(s*0.15),top),(right,bottom)],fill="#f15a32",width=w,joint="curve")
    # baseline accent
    d.line([(int(s*0.31),int(s*0.81)),(int(s*0.69),int(s*0.81))],fill="#5b5f69",width=max(2,int(s*0.012)))
    return img.resize((size,size),Image.Resampling.LANCZOS)
for size in (512,192,180):
    img=make(size)
    img.save(root/f"icon-{size}.png", optimize=True)
    print(size, (root/f"icon-{size}.png").stat().st_size)
