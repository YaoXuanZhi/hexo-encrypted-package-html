# hexo-encrypted-package-html

这是一款用于文章正文内容加密的hexo插件，而在hexo插件市场里，已经有[hexo-blog-encrypt hexo插件](https://github.com/D0n9X1n/hexo-blog-encrypt)珠玉在前了，这个插件是本人在学习hexo插件的练手之作，对其中缘由感兴趣的可访问[开发一款用于正文加密的Hexo插件](https://yaoxuanzhi.github.io/news/)

## 在线演示

- 点击 [Demo Page](https://yaoxuanzhi.github.io/about/)
  >密码 `test`

## 安装

```sh
npm install --save hexo-encrypted-package-html
```

## 快速使用

在md文件的文件头上添加password的配置，如下所示：

```md
title: About
date: 2021-03-25
password: test
---

content text
```

重新执行`hexo clean && hexo g && hexo s`即可

---

如果需要更加高级的加密功能，建议采用[hexo-blog-encrypt](https://github.com/D0n9X1n/hexo-blog-encrypt)