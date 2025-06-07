# 亲戚计算器

一个基于 Web 的亲戚关系计算器，可以计算复杂的亲戚关系，并提供可视化的关系图谱。

## 功能特点

- 支持输入复杂的亲戚关系（如："妈妈的妹妹的女儿"）
- 实时计算并显示正确的亲戚称呼
- 提供详细的计算过程分析
- 使用 D3.js 生成交互式关系图谱
- 响应式设计，支持移动端访问

## 技术栈

- HTML5
- CSS3
- JavaScript (ES6+)
- D3.js (数据可视化)

## 如何运行

1. 克隆项目到本地：
```bash
git clone [项目地址]
```

2. 由于使用了 ES6 模块，需要通过 HTTP 服务器来运行项目。你可以使用以下任一方式：

   - 使用 Python 的简单 HTTP 服务器：
     ```bash
     # Python 3
     python -m http.server 8000
     ```
   
   - 使用 Node.js 的 http-server：
     ```bash
     # 全局安装 http-server
     npm install -g http-server
     
     # 运行服务器
     http-server
     ```

3. 在浏览器中访问：
   - 如果使用 Python：http://localhost:8000
   - 如果使用 http-server：http://localhost:8080

## 使用示例

1. 在输入框中输入亲戚关系，例如：
   - "妈妈的妹妹的女儿"
   - "爸爸的弟弟的儿子"
   - "妈妈的姐姐的女儿"

2. 点击"计算关系"按钮或使用示例按钮

3. 查看结果：
   - 最终称呼
   - 计算过程
   - 关系图谱

## 项目结构

```
/
├── index.html          # 主页面
├── src/
│   ├── components/     # 组件
│   │   ├── InputArea.js
│   │   ├── ResultDisplay.js
│   │   └── RelationGraph.js
│   ├── logic/         # 业务逻辑
│   │   ├── relationParser.js
│   │   ├── relationMap.js
│   │   └── graphBuilder.js
│   └── assets/        # 静态资源
│       └── style.css
└── README.md
```

## 注意事项

- 确保使用现代浏览器访问（支持 ES6 模块）
- 需要网络连接以加载 D3.js 库
- 建议使用 Chrome、Firefox 或 Edge 的最新版本

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

## 许可证

MIT License 