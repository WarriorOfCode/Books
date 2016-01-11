-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.41-log - MySQL Community Server (GPL)
-- Server OS:                    Win32
-- HeidiSQL Version:             9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for Books_DB
CREATE DATABASE IF NOT EXISTS `books_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `Books_DB`;


-- Dumping structure for table Books_DB.Authors
CREATE TABLE IF NOT EXISTS `Authors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` tinytext NOT NULL,
  `Last_Name` tinytext NOT NULL,
  `patronymic` tinytext,
  `Birth_date` date DEFAULT NULL,
  `Biography` text,
  `Counry_of_birth` text NOT NULL,
  `ISBN` int(13) unsigned zerofill NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.authors_groups
CREATE TABLE IF NOT EXISTS `authors_groups` (
  `id_author` int(10) unsigned NOT NULL,
  `id_group` int(10) unsigned NOT NULL,
  KEY `FK_authors_groups_authors` (`id_author`),
  KEY `FK_authors_groups_groups` (`id_group`),
  CONSTRAINT `FK_authors_groups_authors` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_authors_groups_groups` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.Books
CREATE TABLE IF NOT EXISTS `Books` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Birth_data` date NOT NULL,
  `Description` text,
  `number_of_pages` mediumint(20) unsigned NOT NULL,
  `ISBN` bigint(13) unsigned zerofill NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.books_authors
CREATE TABLE IF NOT EXISTS `books_authors` (
  `id_book` int(11) unsigned NOT NULL,
  `id_author` int(11) unsigned NOT NULL,
  KEY `FK_books_authors_books` (`id_book`),
  KEY `FK_books_authors_authors` (`id_author`),
  CONSTRAINT `FK_books_authors_authors` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_books_authors_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.books_groups
CREATE TABLE IF NOT EXISTS `books_groups` (
  `id_book` int(10) unsigned NOT NULL,
  `id_group` int(10) unsigned NOT NULL,
  KEY `FK_books_groups_books` (`id_book`),
  KEY `FK_books_groups_groups` (`id_group`),
  CONSTRAINT `FK_books_groups_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_books_groups_groups` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.books_reviews
CREATE TABLE IF NOT EXISTS `books_reviews` (
  `id_book` int(10) unsigned NOT NULL,
  `id_review` int(10) unsigned NOT NULL,
  KEY `FK_books_reviews_books` (`id_book`),
  KEY `FK_books_reviews_reviews` (`id_review`),
  CONSTRAINT `FK_books_reviews_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_books_reviews_reviews` FOREIGN KEY (`id_review`) REFERENCES `reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.books_users
CREATE TABLE IF NOT EXISTS `books_users` (
  `id_book` int(11) unsigned NOT NULL,
  `id_user` int(11) unsigned NOT NULL,
  KEY `FK_books_users_books` (`id_book`),
  KEY `FK_books_users_users` (`id_user`),
  CONSTRAINT `FK_books_users_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_books_users_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.friends
CREATE TABLE IF NOT EXISTS `friends` (
  `id_follower` int(11) unsigned NOT NULL,
  `id_following` int(11) unsigned NOT NULL,
  KEY `FK_friends_users` (`id_follower`),
  KEY `FK_friends_users_2` (`id_following`),
  CONSTRAINT `FK_friends_users` FOREIGN KEY (`id_follower`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_friends_users_2` FOREIGN KEY (`id_following`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.Groups
CREATE TABLE IF NOT EXISTS `Groups` (
  `id` int(10) unsigned NOT NULL,
  `Name` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) unsigned NOT NULL,
  `Text` mediumtext NOT NULL,
  `Birth_Date` date NOT NULL,
  `assessement` int(2) unsigned DEFAULT '5',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.Users
CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NickName` varchar(22) NOT NULL,
  `password` varchar(50) NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `BirthData` date DEFAULT NULL,
  `Age` int(3) DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `permissions` int(4) unsigned zerofill DEFAULT '0000',
  PRIMARY KEY (`id`),
  UNIQUE KEY `NickName` (`NickName`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table Books_DB.users_review
CREATE TABLE IF NOT EXISTS `users_review` (
  `id_user` int(10) unsigned NOT NULL,
  `id_review` int(10) unsigned NOT NULL,
  KEY `FK_users_review_users` (`id_user`),
  KEY `FK_users_review_reviews` (`id_review`),
  CONSTRAINT `FK_users_review_reviews` FOREIGN KEY (`id_review`) REFERENCES `reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_users_review_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
