-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2020 at 12:16 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `assign`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `taskName` varchar(255) NOT NULL,
  `taskDesc` varchar(255) NOT NULL,
  `imgName` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`taskName`, `taskDesc`, `imgName`, `created_at`, `updated_at`) VALUES
('Task1', 'Coding NodeJS', 'http://localhost:5000/static/app/Public/images/17951A0573.jpg', '2020-04-05 10:07:23', '2020-04-05 10:07:23'),
('Task2', 'Gym', 'http://localhost:5000/static/app/Public/images/4k-wallpaper-automotive-blur-1413412.jpg', '2020-04-05 10:08:11', '2020-04-05 10:08:11'),
('Task3', 'Eating', 'http://localhost:5000/static/app/Public/images/dawn-hd-wallpaper-landscape-36717.jpg', '2020-04-05 10:08:50', '2020-04-05 10:08:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`taskName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
