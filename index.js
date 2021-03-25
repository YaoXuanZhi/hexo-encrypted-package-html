'use strict';

const package_encrypted_html = require('./package_encrypted_html');
const log = hexo.log;

hexo.extend.filter.register('after_post_render', (data) => {
    if(data.password == "" || data.password == undefined) {
        return data;
    }

    // for (var item in data){
    //     log.warn(` ${data.title.trim()} ====> ${item} ${data.content}`);
    // }

    // data.content就是文章正文的Html
    data.origin = data.content;
    data.content = package_encrypted_html.encrypt_html(__dirname, data.content, data.password);
    log.warn(`hexo-encrypt-test: encrypting "${data.password}" "${data.title.trim()}" "${__dirname}"`);
    return data;
}, 1000);