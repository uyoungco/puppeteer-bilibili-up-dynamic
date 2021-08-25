## bilibili UP动态截图（puppeteer-bilibili-up-dynamic）


```shell
$ git clone https://github.com/uyoungco/puppeteer-bilibili-up-dynamic.git
$ cd puppeteer-bilibili-up-dynamic
$ yarn install
$ yarn dev
```

#### 获取最近一条动态截图
http://localhost:8081/api/puppeteer/v1/screenshot?id=[UP主ID]

返回数据
```json
  {
    "code": 200,
    "message": "成功",
    "data": "data:image/jpg;base64,xxxxxxxxxxx",
  }
```

#### 获取指定动态截图
http://localhost:8081/api/puppeteer/v1/screenshot?tid=[动态ID]

返回数据
```json
  {
    "code": 200,
    "message": "成功",
    "data": "data:image/jpg;base64,xxxxxxxxxxx",
  }
```

#### 部署

推荐使用docker部署我都封装好了