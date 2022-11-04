-- phpMyAdmin SQL Dump
-- version 2.9.1.1-Debian-4
-- http://www.phpmyadmin.net
-- 
-- Host: localhost
-- Generation Time: Oct 10, 2007 at 12:47 AM
-- Server version: 5.0.32
-- PHP Version: 5.2.0-8+etch7
-- 
-- Database: `oririnn`
-- 



-- CREATE TABLES --------------------------------------------------------

DROP DATABASE IF EXISTS oririnn;
CREATE DATABASE oririnn;

USE oririnn;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL UNIQUE,
  `email_verified` tinyint(1) NOT NULL DEFAULT 1,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL DEFAULT 0,
  `age` varchar(255) NOT NULL ,
  `language` varchar(255) NOT NULL DEFAULT 'Francais',
  `avatar` varchar(255) NOT NULL DEFAULT 'default',
  `creation_date` varchar(255) NOT NULL,
  `admin` varchar(255) NOT NULL DEFAULT 0,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

-- DROP TABLE IF EXISTS `options`;

CREATE TABLE `options` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `offer_id` tinyint(11) NOT NULL DEFAULT 0,
  `piscine` tinyint(1) NOT NULL DEFAULT 0,
  `jacuzzi` tinyint(1) NOT NULL DEFAULT 0,
  `barbecue` tinyint(1) NOT NULL DEFAULT 0,
  `wifi` tinyint(1) NOT NULL DEFAULT 0,
  `climatisation` tinyint(1) NOT NULL DEFAULT 0,
  `chauffage` tinyint(1) NOT NULL DEFAULT 0,
  `lave` tinyint(1) NOT NULL DEFAULT 0,
  `seche` tinyint(1) NOT NULL DEFAULT 0,
  `cuisine` tinyint(1) NOT NULL DEFAULT 0,
  `workspace` tinyint(1) NOT NULL DEFAULT 0,
  `television` tinyint(1) NOT NULL DEFAULT 0,
  `chambres` int(11) NOT NULL DEFAULT 0,
  `lits` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

DROP TABLE IF EXISTS `email_verify`;

CREATE TABLE `email_verify` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

DROP TABLE IF EXISTS `favorites`;

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

DROP TABLE IF EXISTS `offers`;

CREATE TABLE `offers` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title`  varchar(255) NOT NULL,
  `description`  TEXT NOT NULL,
  `images`  int(11) NOT NULL,
  `dates_start`  varchar(255) NOT NULL,
  `dates_end`  varchar(255) NOT NULL,
  `capacity`  varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postcode` varchar(255) NOT NULL,
  `city`  varchar(255) NOT NULL,
  `country`  varchar(255) NOT NULL DEFAULT 'France',
  `approval`  tinyint(1) NOT NULL DEFAULT 0,
  `creation_date` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

DROP TABLE IF EXISTS `bookings`;

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  `description`  varchar(255) NOT NULL DEFAULT 'ceci est une description',
  `dates_start`  varchar(255) NOT NULL,
  `dates_end`  varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ---

DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `offer_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `score`  varchar(255) NOT NULL,
  `comment`  varchar(255) NOT NULL,
  `response`  varchar(255) NOT NULL,
  `com_date`  varchar(255) NOT NULL,
  `res_date`  varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;



-- FILL TABLES --------------------------------------------------------

TRUNCATE TABLE `users`;

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `email_verified`, `password`, `phone`, `age`, `language`, `avatar`, `creation_date`,  `admin`) VALUES
(1, 'Admin', 'ADMIN', 'admin@gmail.com', 1, '$2b$10$TeVmXMxIAopqutmwjPhBB.fbrb039jgybYK9ucRelRH9MitVtlI4q', '00 11 22 33 44', '25', 'Francais', 'default', '24/05/2022', 1),
(2, 'Tony', N'Téh', 'tony@gmail.com', 1, '$2b$10$TeVmXMxIAopqutmwjPhBB.fbrb039jgybYK9ucRelRH9MitVtlI4q', '00 11 22 33 44', '25', 'Francais', 'default', '24/05/2022', 0);

-- ---

TRUNCATE TABLE `offers`;

INSERT INTO `offers` (`id`, `user_id`, `title`, `description`, `images`, `dates_start`, `dates_end`, `capacity`, `price`,`city`, `address`, `postcode`, `creation_date`, `approval`) VALUES
(1, 1, N'Manoir du Duc Atti', N'Vous l\'aurez compris, cette résidence à appartenue au créateur de la marque du même nom, connue aujourd\'principalement pour ses motos, Ducatti. IL n\'y a pas grand chose d\{autre à dire sur cette propriété. Elle dispose de tous le confort nécessaire pour passer un agréable séjour. Beaucoup de chambres, encore plus de lits, et autant voire plus de salle de bain que dans le studio d\'un Parisien. Non, sans rire, il y a 6 salle de bains. Ca fait beaucoup la non ?', 5, '24/05/2022', '27/07/2022', '12', 790, N'Mâcon', N'Route de la Grisière', '71000', '24/05/2022', 1),
(2, 1, N'Château de Godfroy de Montmirail', N'Qui n\'a jamais rêvé de séjourner dans l\'authentique château du seigneur Godfroy de Montmirail ? Il dispose de toutes les commodités nécessaires, telles que salles de bain, toilettes, ainsi qu\'un parking couvert afin de garer votre chariotte du diable. Située dans un cadre buccolique, vous pourrez ainsi profiter de votre séjour dans le plus grand des calmes. Attention toutefois, il se peut que certains personnes passant devant la propriété en criant "que trépasse si je faiblis"', 5, '17/02/2022', '24/06/2022', '10', 1200, N'Montmirail', N'Lieu-dit de Jacquoiille', '06000', '25/05/2022', 1),
(3, 1, N'Château apeuprès', N'J\'ai vu que ce site permettait de mettre facilement des châteaux en location, je vous propose donc ce bien pour vos séjours de vacances. Je l\'ai obtenu il y a quelques années suite à un héritage. Alors oui je sais, a première vue il semble en mauvais état mais je vous rassure, c\'est encore pire à l\'intérieur. Aucun travaux n\'a été effectué depuis un siècle et demi. Vous pourrez donc profiter d\'un confort semblable à celui de nos ancêtres du siècle dernier. Et pour pas cher. Une aubaine non ?', 3, '01//01/2022', '31/12/2022', '70', 5, N'Trouville', N'Chemin de la perdition', '66666', '08/08/2022', 1),
(4, 1, N'Château Pessac', N'Lorsque le toit en tourelle de ce château sera visible, les clients commenceront à comprendre l\'ampleur de la grandeur que représente cette maison. Ce château centenaire, soigneusement conservé et réaménagé pour satisfaire les plus exigeants des clients modernes, offre chambre après chambre de l\'histoire et un confort luxueux à chaque pas, juste à la porte de la métropole bordelaise et du plus beau pays viticole de France.', 5, '30/06/2022', '31/08/2022', '10', '2500', 'Pessac', 'Avenue Pasteur', '30072', '10/08/2022', 1),
(5, 1, N'Poudlard', N'Non, vous ne rêvez pas. Il est maintenant possible de louer le célèbre château d\'Harry Potter. Inutile de présenter ce lieu emblématique que toute personne ne vivant pas dans une grotte. Possède toutes les commodités nécessaires pour une capacité de 500 personnes environ. Attention toutefois, nous vous déconseillons d\'aller vous promener dans les bois, surtout les nuits de pleine lune. Il faut aussi faire attention à la présence de serpent dans les canalisations. Il se peut aussi que vous croisiez quelques fantômes mais bon, c\'est Poudlard', 5, '30/06/2022', '31/12/2022', '1000', '37500', N'Salisbury', N'3 Stonehenge Rd', 'SP4 7DD', '10/08/2022', 1),
(6, 1, N'Château de Damien', N'Lorsque le toit en tourelle de ce château sera visible, les clients commenceront à comprendre l\'ampleur de la grandeur que représente cette maison. Ce château centenaire, soigneusement conservé et réaménagé pour satisfaire les plus exigeants des clients modernes, offre chambre après chambre de l\'histoire et un confort luxueux à chaque pas, juste à la porte de la métropole bordelaise et du plus beau pays viticole de France.', 5, '20/12/2022', '31/12/2022', '10', '1399', N'Tourcoing', N'32 Rue du Moulin Fagot', '59200', '10/08/2022', 1),
(7, 1, N'Château de Nicolas', N'Lorsque le toit en tourelle de ce château sera visible, les clients commenceront à comprendre l\'ampleur de la grandeur que représente cette maison. Ce château centenaire, soigneusement conservé et réaménagé pour satisfaire les plus exigeants des clients modernes, offre chambre après chambre de l\'histoire et un confort luxueux à chaque pas, juste à la porte de la métropole bordelaise et du plus beau pays viticole de France.', 5, '11/07/2022', '31/08/2022', '10', '450', N'Pau', N'7 Bd Champetier de Ribes', '64000', '10/08/2022', 1),
(8, 1, N'Château de Matthias', N'Lorsque le toit en tourelle de ce château sera visible, les clients commenceront à comprendre l\'ampleur de la grandeur que représente cette maison. Ce château centenaire, soigneusement conservé et réaménagé pour satisfaire les plus exigeants des clients modernes, offre chambre après chambre de l\'histoire et un confort luxueux à chaque pas, juste à la porte de la métropole bordelaise et du plus beau pays viticole de France.', 5, '17/06/2022', '22/09/2022', '10', '3500', N'Montpon-Ménestérol', N'8 Rue du 19 Mars 1962', '24700', '10/08/2022', 1),
(9, 1, N'Château d\'Alban', N'Lorsque le toit en tourelle de ce château sera visible, les clients commenceront à comprendre l\'ampleur de la grandeur que représente cette maison. Ce château centenaire, soigneusement conservé et réaménagé pour satisfaire les plus exigeants des clients modernes, offre chambre après chambre de l\'histoire et un confort luxueux à chaque pas, juste à la porte de la métropole bordelaise et du plus beau pays viticole de France.', 5, '12/04/2022', '31/09/2022', '10', '1200', N'Vannes', N'62 Rue des Capucins', '56000', '10/08/2022', 1),
(10, 1, N'Château de Benjamin', N'Lorsque le toit en tourelle de ce château sera visible, les clients commenceront à comprendre l\'ampleur de la grandeur que représente cette maison. Ce château centenaire, soigneusement conservé et réaménagé pour satisfaire les plus exigeants des clients modernes, offre chambre après chambre de l\'histoire et un confort luxueux à chaque pas, juste à la porte de la métropole bordelaise et du plus beau pays viticole de France.', 5, '26/06/2022', '06/11/2022', '10', '3777', N'Clacy-et-Thierret', N'2 Rue de l\'Église', '02000', '10/08/2022', 1);

-- ---

TRUNCATE TABLE `favorites`;

INSERT INTO `favorites` (`user_id`, `offer_id`) VALUES
(1, 1);

-- ---

TRUNCATE TABLE `bookings`;

INSERT INTO `bookings` (`offer_id`, `user_id`, `dates_start`, `dates_end`) VALUES
(1, 1, '2022/05/01', '2022/06/02'),
(2, 1, '2022/06/12', '2022/07/11');

TRUNCATE TABLE `options`;

INSERT INTO options( id, offer_id, piscine, jacuzzi, barbecue, wifi, climatisation, chauffage, lave, seche, cuisine, workspace, television, chambres, lits) VALUES 
(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 14, 24),
(2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20, 32),
(3, 3, 0 , 0, 0 ,0 ,0 ,0 ,0 , 0, 0, 0, 0, 1, 0),
(4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 16),
(5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 96, 480),
(6, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 16),
(7, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 16),
(8, 8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 16),
(9, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 16),
(10, 10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 16, 16);




