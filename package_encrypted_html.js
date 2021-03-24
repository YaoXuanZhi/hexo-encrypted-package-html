const base64_with_xor = require("./base64_with_xor");
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

function package_encrypted_content(dir, source_content, password) {
  // fs.writeFile(`${dir}/${password}.html`, source_content, function(err, result) {
  //   if (err) throw err;
  // });
  // var dom = cheerio.load(source_content);
  var inner_encrypted_page_id = "inner-encrypted-page";

  // // 在正文标签同级上插入一个加密节点
  // var spec_blod_dom = dom('div[class="article-content"]');
  // spec_blod_dom.parent().append('<div id="' + inner_encrypted_page_id + '"></div>');

  // // 将正文标签转换成加密节点的子节点
  // var replace_tag_dom = dom('div[id="' + inner_encrypted_page_id + '"]');
  // spec_blod_dom.appendTo(replace_tag_dom);

  // // 读取加密节点下的内容，将其进行base64加密处理，并且替换正文节点的outHtml
  var spec_blod_text = source_content;
  const encoded_blod_content = to_encoded_text(dir, spec_blod_text, password, inner_encrypted_page_id);
  // spec_blod_dom.replaceWith(encoded_blod_content);
  // return dom.root().toString();
  // return source_content;
  return encoded_blod_content;
}

// function package_encrypted_content(dir, source_content, password) {
//   fs.writeFile(`${dir}/${password}.html`, source_content, function(err, result) {
//     if (err) throw err;
//   });
//   var dom = cheerio.load(source_content);
//   var inner_encrypted_page_id = "inner-encrypted-page";

//   // 在正文标签同级上插入一个加密节点
//   var spec_blod_dom = dom('div[class="article-content"]');
//   spec_blod_dom.parent().append('<div id="' + inner_encrypted_page_id + '"></div>');

//   // 将正文标签转换成加密节点的子节点
//   var replace_tag_dom = dom('div[id="' + inner_encrypted_page_id + '"]');
//   spec_blod_dom.appendTo(replace_tag_dom);

//   // 读取加密节点下的内容，将其进行base64加密处理，并且替换正文节点的outHtml
//   var spec_blod_text = replace_tag_dom.html();
//   const encoded_blod_content = to_encoded_text(dir, spec_blod_text, password, inner_encrypted_page_id);
//   spec_blod_dom.replaceWith(encoded_blod_content);
//   return dom.root().toString();
// }

// 加密指定文本，并塞入到验证div上，更新解密后被替换的div id
function to_encoded_text(dir, spec_blod_text, password, inner_encrypted_page_id) {
  var temmplate_html_path = path.join(dir, 'encrypted_template_lite.html');
  const encrypted_template_content = fs.readFileSync(temmplate_html_path, 'utf8');
  console.log(`temmplate_html_path : "${temmplate_html_path}" spec_blod_text: "${spec_blod_text}"  password: "${password}"`);
  const encoded_content = base64_with_xor.encode_with_xor(spec_blod_text, password);
  const encoded_blod_content = encrypted_template_content.replace(/base64_text/g, encoded_content).replace(/spec_replace_id/g, inner_encrypted_page_id);
  return encoded_blod_content;
}

var package_encrypted_html = {
  encrypt_html: function (dir, source_content, password) {
    if (password == "" || password == undefined) {
      return source_content;
    }
    var encrypted_html = package_encrypted_content(dir, source_content, password);
    return encrypted_html;
  }

}

module.exports = package_encrypted_html;