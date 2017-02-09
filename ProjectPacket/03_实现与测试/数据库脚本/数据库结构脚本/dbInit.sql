/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : qcrs

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2017-02-08 09:33:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pro_basic_dept
-- ----------------------------
DROP TABLE IF EXISTS `pro_basic_dept`;
CREATE TABLE `pro_basic_dept` (
  `id` varchar(36) NOT NULL,
  `dept_name` varchar(256) DEFAULT NULL,
  `dept_type` varchar(3) DEFAULT NULL,
  `par_dept_id` varchar(32) DEFAULT NULL,
  `dept_function` varchar(256) DEFAULT NULL,
  `flw_type` varchar(3) DEFAULT NULL,
  `bat_flw_type` varchar(3) DEFAULT NULL,
  `contact_person` varchar(256) DEFAULT NULL,
  `contact_tel` varchar(256) DEFAULT NULL,
  `dept_sort` int(8) DEFAULT NULL,
  `short_name` varchar(100) DEFAULT NULL,
  `sub_branch_code` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pro_security_user_auth`;
CREATE TABLE `pro_security_user_auth` (
  `id` varchar(36) NOT NULL,
  `auth_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pro_security_res`;
CREATE TABLE `pro_security_res` (
  `id` varchar(36) NOT NULL,
  `href` varchar(200) DEFAULT NULL,
  `sort` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `pro_security_auth_res`;
CREATE TABLE `pro_security_auth_res` (
  `id` varchar(36) NOT NULL,
  `res_id` varchar(36) NOT NULL,
  `relation_type` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`,`res_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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

DROP TABLE IF EXISTS `pro_basic_user`;
CREATE TABLE `pro_basic_user` (
  `id` varchar(36) NOT NULL,
  `user_name` varchar(256) DEFAULT NULL,
  `dept_id` varchar(36) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `par_dept_id` varchar(32) DEFAULT NULL,
  `is_online` varchar(1) DEFAULT NULL,
  `is_active` varchar(1) DEFAULT NULL,
  `is_hint` varchar(1) DEFAULT NULL,
  `sub_branch_code` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;





