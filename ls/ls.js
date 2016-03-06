var fs = require('fs');
var strFormat = require('string-format-js');

var nextLine = 3;
var currentLine = [];


var files = fs.readdirSync(process.argv[2] || ".") || [];

// ================ 确定组数 ================
var groupNum = 1;
// 一列中最长的文件名
var maxLength = [];
// 是从三个一行开始，测试是否可以在一行内输出
var formatStr = "";
for (var columnsNum = 3; columnsNum > 1; columnsNum--) {

    // 初始化maxLength
    maxLength = [];
    for (var j = 0; j < columnsNum; j++) {
        maxLength.push(0);
    }

    for (var i = 0; i < files.length; i += columnsNum) {
        // 空格
        var curLineLength = 4;
        for (var j = 0; j < columnsNum; j++) {
            maxLength[j] = maxLength[j] > (files[i + j] || "").length ?  maxLength[j] : (files[i + j] || "").length;
            curLineLength += maxLength[j];
        }
        if (curLineLength > 80) {
            break;
        }
    }
    // 全部验证通过
    if (i >= files.length) {
        groupNum = columnsNum;
        break;
    }
}

// 配置格式化字符串
if (columnsNum > 1) {
    formatStr = "%-";
    for (var j = 0; j < columnsNum - 1; j++) {
        formatStr = formatStr + (maxLength[j] + 2).toString() + "s%-";
    }
    formatStr = formatStr + (maxLength[columnsNum - 1]).toString() + "s";    
} else {
    formatStr = "%s";
}


// 对齐，使之为整数倍
var remain = files.length % columnsNum;
for (var i = columnsNum; i > remain; i--) {
    files.push("");
}

for (var i = 0; i < files.length; i += columnsNum) {
    switch (columnsNum) {
        case 1:
            console.log(formatStr.format(files[i]));
            break;
        case 2:
            console.log(formatStr.format(files[i], files[i + 1]));
            break;
        case 3:
            console.log(formatStr.format(files[i], files[i + 1], files[i + 2]));
            break;
        default:
            break;
    }
}