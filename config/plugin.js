/*
 * @Author: 尉旭胜(Riansin)
 * @LastEditors: 尉旭胜(Riansin)
 */
'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

// exports.mysql = {
//   enable: true,
//   package: 'egg-mysql',
// };
module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  axiosPlus: {
    enable: true,
    package: 'egg-axios-plus',
  },
};
