/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50151
Source Host           : localhost:3306
Source Database       : qcrs

Target Server Type    : MYSQL
Target Server Version : 50151
File Encoding         : 65001

Date: 2017-02-09 17:24:32
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
  `tshort_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pro_basic_dept
-- ----------------------------
INSERT INTO `pro_basic_dept` VALUES ('BCS', '长沙银行', '0', 'BCS', null, '0', '0', null, null, '1', '长沙银行', '', null);
INSERT INTO `pro_basic_dept` VALUES ('BCS0001', '长沙银行总部', '1', 'BCS', null, '0', '0', null, null, '1', '长行总部', 'BCS', null);
INSERT INTO `pro_basic_dept` VALUES ('BCS1001', '长沙银行湖南省分行', '2', 'BCS', null, '0', '0', null, null, '1', '长行湖南分行', 'BCS0001', null);
INSERT INTO `pro_basic_dept` VALUES ('BCS2001', '长沙银行北京市分行', '2', 'BCS', null, '0', '0', null, null, '2', '长行北京分行', 'BCS0001', null);
INSERT INTO `pro_basic_dept` VALUES ('BCS1101', '长沙银行湖南省岳阳县分行', '3', 'BCS', null, '1', '1', null, null, '1', '长行湖南岳阳分行', 'BCS1001', null);
INSERT INTO `pro_basic_dept` VALUES ('BCS1111', '长沙银行湖南省岳阳县荣家湾镇分行', '4', 'BCS', null, '1', '1', null, null, '1', null, 'BCS1101', null);
INSERT INTO `pro_basic_dept` VALUES ('BCS1112', '长沙银行湖南省岳阳县荣家湾镇东方路支行', '5', 'BCS', null, '1', '1', null, null, '1', null, 'BCS1111', null);
