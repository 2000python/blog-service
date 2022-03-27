/*
 * @Author: 尉旭胜(Riansin)
 * @LastEditors: 尉旭胜(Riansin)
 */
'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const getColor = require('@agencyanalytics/colorthief/dist/color-thief.js');
const getrandomInt = max => (Math.floor(Math.random() * max));
// const axios = require('axios');

// function deleteDir(url) {
//   let files = [];
//   if (fs.existsSync(url)) {
//     files = fs.readdirSync(url);
//     files.forEach(function(file) {
//       const curPath = path.join(url, file);
//       if (fs.statSync(curPath).isDirectory()) {
//         deleteDir(curPath);
//       } else {
//         fs.unlinkSync(curPath);
//       }
//     });

//     fs.rmdirSync(url);
//   } else {
//     console.log('给定的路径不存在！');
//   }
// }


class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // const tag = 'shijing';
    // const spe = 'shijing';
    // const url = `https://rainsin-1305486451.cos.ap-nanjing.myqcloud.com/poet-database/${tag}/${spe}.json`;
    // const res = await ctx.curl(url, { dataType: 'json' });
    const rus = await ctx.app.mysql.get('shijing', { id: getrandomInt(25) });
    ctx.body = rus;
  }
  // async img() {
  //   const { ctx } = this;
  //   const name = ctx.query.url;
  //   const body = await ctx.curl(name, { responseType: 'buffer' });
  //   const palette = await splashy(body);
  //   ctx.body = palette;
  // }
  async getimg() {
    const { ctx } = this;
    const name = ctx.query.url;
    fs.readdir('./', (err, files) => {
      if (!files.includes('saveImage')) {
        fs.mkdir('./saveImage', err => {
          if (err) {
            throw err;
          }
          console.log('已创建图片文件夹');
        }
        );
      }
    });
    let imgData = '';
    const res = await ctx.axios({ method: 'get', url: name, responseType: 'stream' });
    res.setEncoding('binary');
    res.on('data', function(chunk) {
      imgData += chunk;
    });

    res.on('end', function() {
      fs.writeFile('./saveImage/color.jpg', imgData, 'binary', function(err) {
        if (err) {
          console.log('down fail');
        }
        console.log('down success');
      });
    });
    const p = path.join(__dirname, '../../saveImage/color.jpg');
    ctx.body = await getColor.getColor(p, 10);
  }
  async music() {
    const { ctx } = this;
    // const name = ctx.query.key,
    //   limit = ctx.query.limit ? ctx.query.limit : 20,
    //   offset = ctx.query.offset ? ctx.query.offset : 1,
    //   type = ctx.query.type ? ctx.query.type : 2;
    // const rus = await ctx.curl(`http://127.0.0.1:5000/v1/migu/search?key=${name}&limit=${limit}&offset=${offset}&type=${type}`, { dataType: 'json' });
    ctx.body = {
    };
  }
  async getsong() {
    const { ctx } = this;
    const s = ctx.query.cid ? ctx.query.cid : '',
      q = ctx.query.br ? ctx.query.br : 1;
    if (s === '') {
      ctx.body = [];
    }
    const url = `http://127.0.0.1:5000/v1/migu/song?cid=${s}&br=${q}`;
    const rus = await ctx.curl(url);
    ctx.body = rus.data;
  }
  async getMagnetList() {
    const { ctx } = this;
    const s = ctx.query.s ? ctx.query.s : 'u3c3',
      q = ctx.query.q ? ctx.query.q : '海绵宝宝',
      p = ctx.query.p;
    const url = `https://api.jucili.com/api.php?s=${s}&q=${q}&p=${p}`;
    const rus = await ctx.curl(url);
    ctx.body = rus.data;
  }
  async searchtg() {
    const { ctx } = this;
    const q = ctx.query.q,
      p = ctx.query.p,
      ps = ctx.query.ps,
      type = ctx.query.q_type ? ctx.query.q_type : 'source';
    const url = `http://api.sssoou.com/search?q=${q}&page=${p}&q_type=${type}&page_size=${ps}`;
    const rus = await ctx.curl(url);
    ctx.body = rus;
  }
  async getBilibili() {
    const { ctx } = this;
    const q = ctx.query.keyword;
    const url = `http://api.bilibili.com/x/web-interface/search/all/v2?keyword=${q}`;
    const rus = await ctx.curl(url);
    ctx.body = rus.data;
  }
  async getBilibilitype() {
    const { ctx } = this;
    const q = ctx.query.keyword,
      type = ctx.query.search_type,
      page = ctx.query.page;
    const url = `http://api.bilibili.com/x/web-interface/search/all/v2?search_type=${type}&keyword=${q}&page=${page}`;
    const rus = await ctx.curl(url);
    ctx.body = rus.data;
  }
  async getBilibiliImg() {
    const { ctx } = this;
    const url = 'https://i0.hdslb.com/bfs/archive/76b3eb6e0815891e7f527c420cbe6d6b46cb46ce.jpg';
    const rus = await ctx.curl(url);
    ctx.body = rus;
  }
  async loginBilibili() {
    const { ctx } = this;
    const url = 'http://passport.bilibili.com/login?act=getkey';
    const rus = await ctx.curl(url);
    const tt = rus;
    ctx.body = tt;
  }
}

module.exports = HomeController;
