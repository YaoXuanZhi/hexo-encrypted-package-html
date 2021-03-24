'use strict';

const package_encrypted_html = require('./package_encrypted_html');
const log = hexo.log;

hexo.extend.filter.register('before_generate', function(){
    console.log("增加自定义的加密");
});

const defaultConfig = {
  'wrong_pwd_message': '密码输入错误，请重新输入'
};

hexo.extend.filter.register('after_post_render', (data) => {
    const config = Object.assign(defaultConfig, hexo.config.encrypt, data);
    if(data.password2 == "" || data.password2 == undefined) {
        return data;
    }

    for (var item in data){
        // log.warn(`${item} = ${data[item]}`);
        // log.warn(`${item} = ${data[item]}`);
        log.warn(` ${data.title.trim()} ====> ${item} ${data.full_source}`);
    }

    // 注意，data.content就是文章正文的标签
    data.origin = data.content;
    data.content = package_encrypted_html.encrypt_html(__dirname, data.content, data.password2);
    log.warn(`hexo-encrypt-test: encrypting "${data.password2}" "${data.title.trim()}" "${__dirname}"`);
    return data;
}, 1000);