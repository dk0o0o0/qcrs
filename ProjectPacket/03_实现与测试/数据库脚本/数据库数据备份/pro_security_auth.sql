/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : qcrs

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2017-02-09 17:24:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pro_security_auth
-- ----------------------------
DROP TABLE IF EXISTS `pro_security_auth`;
CREATE TABLE `pro_security_auth` (
  `id` varchar(36) NOT NULL,
  `auth_type` varchar(36) DEFAULT NULL,
  `display` varchar(50) DEFAULT NULL,
  `dept_id` varchar(36) DEFAULT NULL,
  `is_universal` varchar(3) DEFAULT NULL,
  `is_active` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pro_security_auth
-- ----------------------------
INSERT INTO `pro_security_auth` VALUES ('fs', 'dfas', 'sfs', null, null, null);
INSERT INTO `pro_security_auth` VALUES ('fasdf', 'asdf', 'asd', null, null, null);
INSERT INTO `pro_security_auth` VALUES ('f', 'asdf', 'asd', null, null, null);
