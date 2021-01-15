# localSvnCommitHooks
#### 环境准备：Node、TortoiseSVN

1. 修改 post-commit-hook.js 中的  ```username``` 为自己昵称

2. 在svn项目中右键->选择TortoiseSVN->设置 

   ![](https://cdn.jsdelivr.net/gh/Canight/can1ght_ImageHosting/img/20210114141505.jpg)

![](https://cdn.jsdelivr.net/gh/Canight/can1ght_ImageHosting/img/20210114141534.png)

3. 在左侧选择勾子脚本(Hooks Script)，选择添加

   ![](https://cdn.jsdelivr.net/gh/Canight/can1ght_ImageHosting/img/20210114141703.png)

4. 点击右上角选择框选择 ```提交之后钩子 ``` 或者  ```post-commit-hook``` ，在第一个地址框选择svn项目地址根目录，在第二个地址框选择 post-commit-hook.js 文件路径，然后在路径前加上 ```node  ``` 命令

   ![](https://cdn.jsdelivr.net/gh/Canight/can1ght_ImageHosting/img/20210114142746.png)

5. 正常使用 TortoiseSVN 提交更新

