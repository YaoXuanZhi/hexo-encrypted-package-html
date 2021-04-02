'use strict';

const package_encrypted_html = require('./lib/package_encrypted_html');
const log = hexo.log;

hexo.extend.filter.register('after_post_render', (data) => {
    if(data.password == "" || data.password == undefined) {
        return data;
    }
    const template_path = `${__dirname}/lib/`;

    // for (var item in data){
    //     log.warn(` ${data.title.trim()} ====> ${item} ${data[item]}`);
    // }

    // data.content就是文章正文的Html
    var prefix = "hexo-encrypted-package-html";
    data.origin = data.content;
    data.content = package_encrypted_html.encrypt_html(template_path, prefix+data.content, data.password);
    log.info(`hexo-encrypted-package-html: encrypting "password:${data.password}" "path:${data.full_source.trim()}"`);
    return data;
}, 1000);