DROP DATABASE IF EXISTS GAD_users;
CREATE DATABASE GAD_users;
USE GAD_users;

DROP TABLE IF EXISTS `users`;
		
CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50)  NOT NULL,
  `hash` CHAR(64) NOT NULL,
  `salt` CHAR(60) NOT NULL,
  PRIMARY KEY (`id`)
) COMMENT 'Users authentication';

-- ---
-- Foreign Keys 
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `users` (`id`,`email`,`password`) VALUES
-- ('','','');