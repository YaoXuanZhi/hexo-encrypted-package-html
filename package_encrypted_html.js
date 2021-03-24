const base64_with_xor = require("./base64_with_xor");
const fs = require('fs');
const path = require('path');

function package_encrypted_content(dir, source_content, password) {
  var inner_encrypted_page_id = "inner-encrypted-page";
  var spec_blod_text = source_content;
  const encoded_blod_content = to_encoded_text(dir, spec_blod_text, password, inner_encrypted_page_id);
  return encoded_blod_content;
}

// 加密指定文本，并塞入到验证div上，更新解密后被替换的div id
function to_encoded_text(dir, spec_blod_text, password, inner_encrypted_page_id) {
  var temmplate_html_path = path.join(dir, 'encrypted_template_lite.html');
  const encrypted_template_content = fs.readFileSync(temmplate_html_path, 'utf8');
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