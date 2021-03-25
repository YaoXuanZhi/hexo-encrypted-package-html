'use strict';
const fs = require('fs');
var assert = require('assert');
var base64_with_xor = require("../lib/base64_with_xor");
const package_encrypted_html = require('../lib/package_encrypted_html');

describe('Base', function() {
  const source_text = "aaaaa";
  const password = "admin";
  describe('normal encode/decode', function() {
    it('should return true', function() {
        const encoded_text = base64_with_xor.encode(source_text);
        const decoded_text = base64_with_xor.decode(encoded_text);
        console.log(encoded_text);
        console.log(decoded_text);
        assert.equal(source_text, decoded_text);
    });
  });
  describe('encode/decode with xor', function() {
    it('should return true', function() {
        const encoded_text_with_xor = base64_with_xor.encode_with_xor(source_text, password);
        const decoded_text_with_xor = base64_with_xor.decode_with_xor(encoded_text_with_xor, password);
        assert.equal(source_text, decoded_text_with_xor);
    });
  });
});

describe('hexo-package-encrypted-html', () => {
    const output_path = "./test/out.html";
    const template_path = `${__dirname}/../lib/`;
    const data = {
        password: "test",
        content: `<div> Hello Word! </div>`
    };

    data.content = package_encrypted_html.encrypt_html(template_path, data.content, data.password);
    var full_html = `<html> ${data.content} </html>`;
    fs.writeFile(output_path, full_html, function(err, result) {
        if (err) throw err;
    });
});