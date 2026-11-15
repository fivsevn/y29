---
id: "l0-20261115140203-6eed42f5-9f2c7c81c1f9"
author: "guest-a3efe16d21c4af91"
createdAt: "2026-11-15T11:34:23.180Z"
replyTo: null
likes: 0
canon: "derivative"
media: []
guest: {"name":"木木_7447"}
---

Parallax2D 节点错位怎么处理？

Godot 版本：4.5.1

相机、Parallax2D 节点，还有它们下面的 Sprite2D 子节点，位置都是 0,0。编辑器里各层是完全对齐的，可一运行，各层就会根据各自的 scroll scale 错开很多。

之前有人给我解释，说 Parallax2D 是把相机的位置乘以 scroll scale，得到视差层的偏移。但相机就在 0,0，按这个理解，算出来的偏移应该还是 0 才对。

我现在挺迷糊的。想让相机在云层的高度时，云层是对齐的；相机在云层上方或下方时，云层才在竖直方向错开，这个要怎么弄？
