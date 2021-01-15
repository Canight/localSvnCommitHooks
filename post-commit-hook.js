const https = require("https");
const fs = require("fs");

//定义用户名
let username = "username";

//创建获取文件promise
let createPromise = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data.toString());
    });
  });
};

//获取时间
let getTime = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return (
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    (minute > 9 ? minute : "0" + minute) +
    ":" +
    second
  );
};

//创建https请求
let sendPostRequest = (content) => {
  let options = {
    hostname: "oapi.dingtalk.com", //自己现用钉钉机器人，所以是钉钉域名
    port: 443, //注意端口号 可以忽略不写 写一定写对
    json: true,
    path: "这里写WebHook hostname后缀",
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  };
  let req = https.request(options, function (res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
      console.log("BODY: " + chunk);
    });
  });

  req.on("error", function (e) {
    console.log("problem with request: " + e.message);
  });
  req.write(content);
  req.end();
};

//发送信息函数
let postMessage = async (
  name = "username",
  commitMessageP,
  modifiedListP,
  svnVersion,
  projectPath
) => {
  let commitMessage = await commitMessageP,
    modifiedList = await modifiedListP;
  let modifiedListMd = "";
  modifiedList.split(projectPath).forEach((filePath) => {
    if (filePath != "") {
      modifiedListMd += `\n> >  ...${filePath.trim()}`;
    }
  });
  console.log(name, commitMessage, modifiedList, svnVersion);
  let postJson = JSON.stringify({
    msgtype: "markdown",
    markdown: {
      title: "SVN更新",
      text: `### SVN更新\n> **更新内容**：${commitMessage}\n>\n> **影响文件**:\n>${modifiedListMd}\n>\n> \n> 版本：${svnVersion} \n>\n> 作者：${name} \n>\n> 时间：${getTime()}`,
    },
    at: {
      isAtAll: false,
    },
  });
  sendPostRequest(postJson);
};
/*********************************main********************************************/

//创建对应文件promise
let commitMessageP = createPromise(process.argv[4]),
  modifiedListP = createPromise(process.argv[2]),
  svnVersion = process.argv[5],
  projectPath = process.argv[7].replace(/\\/g, "/");
postMessage(username, commitMessageP, modifiedListP, svnVersion, projectPath);

/*********************************main********************************************/
