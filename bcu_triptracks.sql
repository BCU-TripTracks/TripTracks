/*!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.2-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: bcu_triptracks
-- ------------------------------------------------------
-- Server version	11.4.2-MariaDB-ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Ambass_Info_Log`
--

DROP TABLE IF EXISTS `Ambass_Info_Log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ambass_Info_Log` (
  `User_ID` varchar(45) NOT NULL,
  `Year` year(4) NOT NULL,
  `Month` tinyint(2) unsigned NOT NULL,
  `Follower` int(11) NOT NULL DEFAULT 0,
  `View` int(11) NOT NULL DEFAULT 0,
  `Detail_View` int(11) NOT NULL DEFAULT 0,
  `Comment` int(11) NOT NULL DEFAULT 0,
  `Feed_Like` int(11) NOT NULL DEFAULT 0,
  `Score` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`User_ID`,`Year`,`Month`),
  CONSTRAINT `AIL_UI` FOREIGN KEY (`User_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ambass_Info_Log`
--

LOCK TABLES `Ambass_Info_Log` WRITE;
/*!40000 ALTER TABLE `Ambass_Info_Log` DISABLE KEYS */;
INSERT INTO `Ambass_Info_Log` VALUES
('1',2024,6,0,0,0,0,1,0),
('20',2024,6,0,0,0,0,1,0),
('asas0130',2024,5,0,565,123,15,2353,100),
('asas0130',2024,6,1,2811,16,2,30,0),
('dyyu0326',2024,6,0,10,4,3,1,0),
('junho',2024,6,2,0,0,0,6,0),
('_youngs_',2024,5,4,5,2,1,5,0),
('_youngs_',2024,6,10,165,1,1,16,0);
/*!40000 ALTER TABLE `Ambass_Info_Log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comment_Like`
--

DROP TABLE IF EXISTS `Comment_Like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comment_Like` (
  `User_ID` varchar(45) NOT NULL,
  `Comment_ID` int(11) NOT NULL,
  PRIMARY KEY (`User_ID`,`Comment_ID`),
  KEY `CL_PC.Post_ID_idx` (`Comment_ID`),
  CONSTRAINT `CL_PC.Comment_ID` FOREIGN KEY (`Comment_ID`) REFERENCES `Post_Comments` (`Comment_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `CL_UI.User_ID` FOREIGN KEY (`User_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment_Like`
--

LOCK TABLES `Comment_Like` WRITE;
/*!40000 ALTER TABLE `Comment_Like` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment_Like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DM_Member`
--

DROP TABLE IF EXISTS `DM_Member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DM_Member` (
  `Room_ID` int(11) NOT NULL,
  `User_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`Room_ID`,`User_ID`),
  KEY `DM_UI.User_ID_idx` (`User_ID`),
  CONSTRAINT `DMem_DR` FOREIGN KEY (`Room_ID`) REFERENCES `DM_Room` (`Room_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `DMem_UI` FOREIGN KEY (`User_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DM_Member`
--

LOCK TABLES `DM_Member` WRITE;
/*!40000 ALTER TABLE `DM_Member` DISABLE KEYS */;
INSERT INTO `DM_Member` VALUES
(3,'1'),
(4,'1'),
(1,'asas0130'),
(5,'dyyu0326'),
(2,'junho'),
(4,'junho'),
(1,'_youngs_'),
(2,'_youngs_'),
(3,'_youngs_'),
(5,'_youngs_');
/*!40000 ALTER TABLE `DM_Member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DM_Message`
--

DROP TABLE IF EXISTS `DM_Message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DM_Message` (
  `Message_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Room_ID` int(11) NOT NULL,
  `Sender_ID` varchar(45) NOT NULL,
  `Content` longtext NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`Message_ID`),
  KEY `DR_DM.Room_ID_idx` (`Room_ID`),
  KEY `DM_DM.Sender_ID_idx` (`Sender_ID`),
  CONSTRAINT `DMsg_DR` FOREIGN KEY (`Room_ID`) REFERENCES `DM_Room` (`Room_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `DMsg_UI` FOREIGN KEY (`Sender_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DM_Message`
--

LOCK TABLES `DM_Message` WRITE;
/*!40000 ALTER TABLE `DM_Message` DISABLE KEYS */;
INSERT INTO `DM_Message` VALUES
(1,1,'asas0130','ㅎㅇ','0000-00-00 00:00:00'),
(2,1,'_youngs_','sdfsdf','0000-00-00 00:00:00'),
(3,1,'_youngs_','asasdzxc','0000-00-00 00:00:00'),
(4,1,'_youngs_','일해라 개발자','0000-00-00 00:00:00'),
(5,1,'_youngs_','개가 되어라','0000-00-00 00:00:00'),
(6,2,'junho','2024부천대학교 컴퓨터소프트웨어 졸업작품 ','0000-00-00 00:00:00'),
(7,3,'1','하이','0000-00-00 00:00:00'),
(8,4,'junho','테스트','0000-00-00 00:00:00'),
(9,4,'junho','테스트1','0000-00-00 00:00:00'),
(10,4,'junho','퇴근','0000-00-00 00:00:00'),
(11,5,'_youngs_','안녕하세요','0000-00-00 00:00:00'),
(12,5,'_youngs_','트립트랙스팀','0000-00-00 00:00:00'),
(13,5,'_youngs_','팀장 이영재입니다','0000-00-00 00:00:00'),
(14,5,'_youngs_','반갑습니다','0000-00-00 00:00:00'),
(15,5,'dyyu0326','실시간소통이','0000-00-00 00:00:00'),
(16,5,'dyyu0326','가능합니다','0000-00-00 00:00:00'),
(17,5,'_youngs_','반가워요','0000-00-00 00:00:00'),
(18,5,'_youngs_','연우씨','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `DM_Message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DM_Room`
--

DROP TABLE IF EXISTS `DM_Room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `DM_Room` (
  `Room_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Room_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DM_Room`
--

LOCK TABLES `DM_Room` WRITE;
/*!40000 ALTER TABLE `DM_Room` DISABLE KEYS */;
INSERT INTO `DM_Room` VALUES
(1,'2024-06-24 12:15:10'),
(2,'2024-06-24 13:49:57'),
(3,'2024-06-24 15:10:50'),
(4,'2024-06-24 15:11:13'),
(5,'2024-06-25 06:59:30');
/*!40000 ALTER TABLE `DM_Room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Follow`
--

DROP TABLE IF EXISTS `Follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Follow` (
  `toUser_ID` varchar(45) NOT NULL,
  `fromUser_ID` varchar(45) NOT NULL,
  `fromUser_Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`toUser_ID`,`fromUser_ID`),
  KEY `FO_UI_toUser_idx` (`toUser_ID`),
  KEY `FO_UI.fromUser_idx` (`fromUser_ID`),
  CONSTRAINT `FI_UI.from` FOREIGN KEY (`fromUser_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `Fl_UI.to` FOREIGN KEY (`toUser_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Follow`
--

LOCK TABLES `Follow` WRITE;
/*!40000 ALTER TABLE `Follow` DISABLE KEYS */;
INSERT INTO `Follow` VALUES
('1','junho','2024-06-24 15:04:51'),
('16','_youngs_','2024-06-24 13:48:39'),
('2','_youngs_','2024-06-24 13:49:39'),
('asas0130','1','2024-06-24 14:20:53'),
('asas0130','junho','2024-06-24 14:20:42'),
('asas0130','_youngs_','2024-06-24 12:15:09'),
('dyyu0326','_youngs_','2024-06-25 07:02:55'),
('junho','_youngs_','2024-06-24 13:49:56');
/*!40000 ALTER TABLE `Follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post` (
  `Post_ID` int(11) NOT NULL AUTO_INCREMENT,
  `User_ID` varchar(45) NOT NULL,
  `Post_Caption` longtext NOT NULL,
  `Post_Like` int(11) NOT NULL DEFAULT 0,
  `Post_Create_Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `Post_Edit_Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `Postcol` varchar(45) DEFAULT NULL,
  `Post_Title` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Post_ID`),
  KEY `P_UI.User_ID_idx` (`User_ID`),
  CONSTRAINT `UI_P.User_ID` FOREIGN KEY (`User_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES
(1,'asas0130','길가다 예뻐서 찍은 나무 사진입니다',0,'2024-06-24 12:10:35','2024-06-24 12:10:35',NULL,'노을진 하늘'),
(2,'_youngs_','인천공항에 하늘공원입니당\r\n이곳에 서 있으면 머리 위로 비행이각 지나가욧',0,'2024-06-24 13:38:13','2024-06-24 13:38:13',NULL,'인천공항 하늘공원'),
(3,'asas0130','올해는 어디로 여행을 갈지 추천해주시면 감사하겠습니다',0,'2024-06-24 13:44:31','2024-06-24 13:44:31',NULL,'올해 여행지 추천 받습니다'),
(4,'asas0130','더베이 101입니다',0,'2024-06-24 13:46:45','2024-06-24 13:46:45',NULL,'부산입니다'),
(5,'asas0130','경기도 근교의 능강계곡입니다',0,'2024-06-24 13:48:06','2024-06-24 13:48:06',NULL,'능강계곡'),
(7,'asas0130','올해 봄에 다녀온 북한산 사진입니다',0,'2024-06-24 13:51:21','2024-06-24 13:51:21',NULL,'북한산입니다.'),
(8,'asas0130','경포대 해수욕장의 사진 명소입니다.',0,'2024-06-24 13:52:44','2024-06-24 13:52:44',NULL,'경포대 해수욕장 사진 명소'),
(9,'_youngs_','최근에 다녀온 \r\n 니지모리 스튜디오라는 곳 입니다.\r\n 입장료는 2만원 정도하고\r\n 이름이 스튜디오라 그렇지 \r\n 촬영이 목적이 아닌 구경하러 놀러 오시는 분도 많아요\r\n 강추드려요\r\n ',0,'2024-06-24 13:54:12','2024-06-24 13:54:12',NULL,'니지모리 출사'),
(10,'_youngs_','제주공항 근처 바다가 보이는\r\n듀포레 카페입니당',0,'2024-06-24 14:05:45','2024-06-24 14:05:45',NULL,'제주카페 듀포레'),
(11,'asas0130','을왕리 해수욕장에서 저녁 노을이 예뻐서 찍은 사진입니다.',0,'2024-06-24 14:06:38','2024-06-24 14:06:38',NULL,'을왕리 해수욕장입니다.'),
(13,'_youngs_','제주에 있는\r\n선녀와 나무꾼 테마공원이에요!\r\n옛날 감성의 사진을 많이 건질 수 있어요 강추',0,'2024-06-24 14:09:49','2024-06-24 14:09:49',NULL,'제주 선녀와 나무꾼'),
(14,'_youngs_','국내에 가장 큰 아쿠아리움인\r\n제주 한화 아쿠아플라넷이에용 진짜 크고 넓어요',0,'2024-06-24 14:13:11','2024-06-24 14:13:11',NULL,'제주 한화 아쿠아플라넷'),
(15,'asas0130','잠수교입니당',0,'2024-06-24 14:15:38','2024-06-24 14:15:38',NULL,'잠수교'),
(16,'asas0130','작년 겨울에 다녀온 스키장입니다\r\n설질도 좋고 사람도 많이 없어서 참 좋았던 기억인 것 같습니다.',0,'2024-06-24 14:17:39','2024-06-24 14:17:39',NULL,'스키장'),
(17,'junho','도쿄 롯폰기거리의 야경',0,'2024-06-24 14:19:48','2024-06-24 14:19:48',NULL,'일본여행'),
(18,'asas0130','작년 크리스마스에 송도 센트럴파크에 출현한 산타 카약입니다.\r\n 너무 귀엽고 재미있었네요!!',0,'2024-06-24 14:20:29','2024-06-24 14:20:29',NULL,'송도 센트럴파크'),
(21,'1','화창하고 이뻣도 제주 유체꽃밭',0,'2024-06-24 14:21:31','2024-06-24 14:21:31',NULL,'제주여행'),
(22,'asas0130','우도에 전기자전거가 생겼다고 하여 다녀왔습니다~~!!!',0,'2024-06-24 14:22:46','2024-06-24 14:22:46',NULL,'우도에 생긴 전기자전거'),
(23,'20','화창하고 맑은날 바라보았던 도쿄타워',0,'2024-06-24 14:24:03','2024-06-24 14:24:03',NULL,'도쿄의 낮'),
(24,'asas0130','통영에 있는 워터바이크 참 재미있게 탔던 것 같습니다. \r\n워터바이크는 처음이라 무서웠는데 생각보다 재미있고 진짜 바다 위에 떠있는 느낌이라 신기했네요~~',0,'2024-06-24 14:24:12','2024-06-24 14:24:12',NULL,'통영'),
(25,'junho','미우라치오카텔란 전시회',0,'2024-06-24 14:25:01','2024-06-24 14:25:01',NULL,'미우라치오카텔란 전시회'),
(26,'dyyu0326','좋아요',0,'2024-06-25 06:58:42','2024-06-25 06:58:42',NULL,'파주');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_Comments`
--

DROP TABLE IF EXISTS `Post_Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post_Comments` (
  `Comment_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Post_ID` int(11) NOT NULL,
  `User_ID` varchar(45) NOT NULL,
  `Comment_Text` longtext NOT NULL,
  `Comment_Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Comment_ID`),
  KEY `Post_ID_idx` (`Post_ID`),
  KEY `PC_UI.User_ID_idx` (`User_ID`),
  CONSTRAINT `PC_P.Post_ID` FOREIGN KEY (`Post_ID`) REFERENCES `Post` (`Post_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `PC_UI.User_ID` FOREIGN KEY (`User_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_Comments`
--

LOCK TABLES `Post_Comments` WRITE;
/*!40000 ALTER TABLE `Post_Comments` DISABLE KEYS */;
INSERT INTO `Post_Comments` VALUES
(1,1,'asas0130','안녕하세요','2024-06-24 12:11:35'),
(2,1,'_youngs_','사진이 이쁘네예','2024-06-24 13:14:41'),
(3,1,'_youngs_','어디서 찍은건가용','2024-06-24 13:15:35'),
(4,1,'_youngs_','히히','2024-06-24 13:26:19'),
(5,1,'_youngs_','DM 주세용','2024-06-24 13:27:03'),
(6,2,'asas0130','비행기가 아닌가요?','2024-06-24 13:38:38'),
(7,26,'dyyu0326','이뻐요','2024-06-25 06:58:54'),
(8,26,'_youngs_','너무 이쁘네요','2024-06-25 06:59:02'),
(9,26,'_youngs_','안녕하세요','2024-06-25 07:01:42');
/*!40000 ALTER TABLE `Post_Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_Image`
--

DROP TABLE IF EXISTS `Post_Image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post_Image` (
  `Post_ID` int(11) NOT NULL,
  `Image_Src` longtext NOT NULL,
  PRIMARY KEY (`Post_ID`),
  CONSTRAINT `PI_P_Post_ID` FOREIGN KEY (`Post_ID`) REFERENCES `Post` (`Post_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_Image`
--

LOCK TABLES `Post_Image` WRITE;
/*!40000 ALTER TABLE `Post_Image` DISABLE KEYS */;
INSERT INTO `Post_Image` VALUES
(1,'feeds/1719231036036_asas0130.jpg'),
(2,'feeds/1719236293735__youngs_.jpg'),
(3,'feeds/1719236672019_asas0130.jpg'),
(4,'feeds/1719236805552_asas0130.jpg'),
(5,'feeds/1719236887006_asas0130.jpg'),
(7,'feeds/1719237081475_asas0130.jpg'),
(8,'feeds/1719237164800_asas0130.jpg'),
(9,'feeds/1719237252261__youngs_.jpg'),
(10,'feeds/1719237945169__youngs_.jpg'),
(11,'feeds/1719237998216_asas0130.jpg'),
(13,'feeds/1719238189231__youngs_.jpg'),
(14,'feeds/1719238391404__youngs_.jpg'),
(15,'feeds/1719238538648_asas0130.jpg'),
(16,'feeds/1719238659961_asas0130.jpg'),
(17,'feeds/1719238788356_junho.jpg'),
(18,'feeds/1719238829818_asas0130.jpg'),
(21,'feeds/1719238892028_1.jpg'),
(22,'feeds/1719238966266_asas0130.jpg'),
(23,'feeds/1719239043774_20.jpg'),
(24,'feeds/1719239052388_asas0130.jpg'),
(25,'feeds/1719239101592_junho.jpg'),
(26,'feeds/1719298722706_dyyu0326.jpg');
/*!40000 ALTER TABLE `Post_Image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_Like`
--

DROP TABLE IF EXISTS `Post_Like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post_Like` (
  `Post_ID` int(11) NOT NULL,
  `User_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`Post_ID`,`User_ID`),
  KEY `PL_UI.User_ID_idx` (`User_ID`),
  CONSTRAINT `PL_P.Post_ID` FOREIGN KEY (`Post_ID`) REFERENCES `Post` (`Post_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `PL_UI.User_ID` FOREIGN KEY (`User_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_Like`
--

LOCK TABLES `Post_Like` WRITE;
/*!40000 ALTER TABLE `Post_Like` DISABLE KEYS */;
INSERT INTO `Post_Like` VALUES
(1,'1'),
(2,'1'),
(3,'1'),
(4,'1'),
(9,'1'),
(14,'1'),
(17,'1'),
(1,'16'),
(2,'16'),
(5,'16'),
(1,'2'),
(2,'2'),
(4,'2'),
(1,'20'),
(2,'20'),
(3,'20'),
(4,'20'),
(10,'20'),
(16,'20'),
(23,'20'),
(13,'4'),
(25,'4'),
(1,'asas0130'),
(2,'asas0130'),
(3,'asas0130'),
(4,'asas0130'),
(5,'asas0130'),
(7,'asas0130'),
(8,'asas0130'),
(9,'asas0130'),
(10,'asas0130'),
(11,'asas0130'),
(13,'asas0130'),
(14,'asas0130'),
(15,'asas0130'),
(16,'asas0130'),
(17,'asas0130'),
(18,'asas0130'),
(21,'asas0130'),
(22,'asas0130'),
(23,'asas0130'),
(24,'asas0130'),
(25,'asas0130'),
(26,'dyyu0326'),
(1,'junho'),
(2,'junho'),
(3,'junho'),
(4,'junho'),
(5,'junho'),
(24,'junho'),
(1,'_youngs_'),
(25,'_youngs_'),
(26,'_youngs_');
/*!40000 ALTER TABLE `Post_Like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post_SubComment`
--

DROP TABLE IF EXISTS `Post_SubComment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post_SubComment` (
  `SubComment_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Comment_ID` int(11) NOT NULL,
  `User_ID` varchar(45) NOT NULL,
  `SubComment_Text` varchar(100) NOT NULL,
  `SubComment_Like_Count` int(11) NOT NULL,
  `SubComment_Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`SubComment_ID`),
  KEY `PS_PC.Comment_ID_idx` (`Comment_ID`),
  KEY `PS_UI.User.ID_idx` (`User_ID`),
  CONSTRAINT `PS_PC.Comment_ID` FOREIGN KEY (`Comment_ID`) REFERENCES `Post_Comments` (`Comment_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `PS_UI.User_ID` FOREIGN KEY (`User_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post_SubComment`
--

LOCK TABLES `Post_SubComment` WRITE;
/*!40000 ALTER TABLE `Post_SubComment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post_SubComment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SubComment_Like`
--

DROP TABLE IF EXISTS `SubComment_Like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SubComment_Like` (
  `SubComment_ID` int(11) NOT NULL,
  `Liker_ID` varchar(45) NOT NULL,
  PRIMARY KEY (`SubComment_ID`,`Liker_ID`),
  KEY `SL_UI.Liker_ID_idx` (`Liker_ID`),
  CONSTRAINT `SL_PS.SubComment_ID` FOREIGN KEY (`SubComment_ID`) REFERENCES `Post_SubComment` (`SubComment_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `SL_UI.Liker_Id` FOREIGN KEY (`Liker_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SubComment_Like`
--

LOCK TABLES `SubComment_Like` WRITE;
/*!40000 ALTER TABLE `SubComment_Like` DISABLE KEYS */;
/*!40000 ALTER TABLE `SubComment_Like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tag_List`
--

DROP TABLE IF EXISTS `Tag_List`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tag_List` (
  `Post_ID` int(11) NOT NULL,
  `Post_Tag` varchar(45) NOT NULL,
  PRIMARY KEY (`Post_ID`,`Post_Tag`),
  KEY `TL_TI.Tag_idx` (`Post_Tag`),
  CONSTRAINT `TL_P.Post_ID` FOREIGN KEY (`Post_ID`) REFERENCES `Post` (`Post_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `TL_TI.Post_Tag` FOREIGN KEY (`Post_Tag`) REFERENCES `Tags_Info` (`Tag`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tag_List`
--

LOCK TABLES `Tag_List` WRITE;
/*!40000 ALTER TABLE `Tag_List` DISABLE KEYS */;
INSERT INTO `Tag_List` VALUES
(8,'강릉'),
(16,'겨울'),
(5,'경기'),
(8,'경포대'),
(3,'계곡'),
(5,'계곡'),
(1,'나무'),
(10,'듀포레'),
(1,'드라이브'),
(3,'드라이브'),
(5,'드라이브'),
(3,'맛집'),
(3,'바다'),
(4,'바다'),
(8,'바다'),
(11,'바다'),
(24,'바다'),
(16,'보드'),
(4,'부산'),
(2,'사진스팟'),
(1,'산'),
(3,'산'),
(7,'산'),
(18,'송도'),
(16,'스키'),
(16,'스키장'),
(14,'아쿠아리움'),
(3,'여행'),
(4,'여행'),
(5,'여행'),
(16,'여행'),
(22,'여행'),
(2,'영종도'),
(22,'우도'),
(24,'워터바이크'),
(11,'을왕리'),
(2,'인천공항'),
(17,'일본여행'),
(22,'자전거'),
(22,'전기자전거'),
(10,'제주'),
(13,'제주'),
(14,'제주'),
(22,'제주'),
(22,'제주도'),
(18,'카약'),
(3,'카페'),
(24,'통영'),
(7,'트래킹'),
(26,'파주아울렛'),
(15,'한강'),
(14,'한화아쿠아플라넷'),
(11,'해수욕장'),
(4,'해운대');
/*!40000 ALTER TABLE `Tag_List` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tags_Info`
--

DROP TABLE IF EXISTS `Tags_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Tags_Info` (
  `Tag` varchar(45) NOT NULL,
  `View_Count` int(11) NOT NULL DEFAULT 0,
  `Update_Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Tag`),
  KEY `TI_Count` (`View_Count`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tags_Info`
--

LOCK TABLES `Tags_Info` WRITE;
/*!40000 ALTER TABLE `Tags_Info` DISABLE KEYS */;
INSERT INTO `Tags_Info` VALUES
('강',2,'2024-06-24 12:08:22'),
('강릉',7,'2024-06-24 12:08:22'),
('겨울',0,'2024-06-24 14:17:39'),
('경기',0,'2024-06-24 13:48:06'),
('경포대',0,'2024-06-24 13:52:44'),
('계곡',31,'2024-06-24 12:08:22'),
('나무',0,'2024-06-24 12:10:35'),
('니지모리스튜디오',0,'2024-06-24 13:48:48'),
('듀포레',0,'2024-06-24 14:05:45'),
('드라이브',3,'2024-06-24 12:08:22'),
('맛집',0,'2024-06-24 13:44:31'),
('바다',5,'2024-06-24 12:08:21'),
('보드',11,'2024-06-24 12:08:21'),
('부산',15,'2024-06-24 12:08:21'),
('빠지',21,'2024-06-24 12:08:21'),
('사진스팟',0,'2024-06-24 13:38:13'),
('산',10,'2024-06-24 12:08:21'),
('서울',0,'2024-06-25 06:58:06'),
('송도',0,'2024-06-24 14:20:29'),
('수영',4,'2024-06-24 12:08:22'),
('수원',1,'2024-06-24 12:08:22'),
('스카이다이빙',5,'2024-06-24 12:08:22'),
('스키',12,'2024-06-24 12:08:21'),
('스키장',0,'2024-06-24 14:17:39'),
('아쿠아리움',0,'2024-06-24 14:13:11'),
('여행',0,'2024-06-24 13:44:31'),
('영종도',0,'2024-06-24 13:38:13'),
('우도',0,'2024-06-24 14:22:46'),
('워터바이크',0,'2024-06-24 14:24:12'),
('을왕리',0,'2024-06-24 14:06:38'),
('인천공항',0,'2024-06-24 13:38:13'),
('일본여행',0,'2024-06-24 14:19:48'),
('자전거',0,'2024-06-24 14:22:46'),
('전기자전거',0,'2024-06-24 14:22:46'),
('제주',20,'2024-06-24 12:08:21'),
('제주도',0,'2024-06-24 14:22:46'),
('카약',0,'2024-06-24 14:20:29'),
('카페',0,'2024-06-24 13:44:31'),
('통영',0,'2024-06-24 14:24:12'),
('트래킹',5,'2024-06-24 12:08:22'),
('파주아울렛',0,'2024-06-25 06:58:42'),
('한강',0,'2024-06-24 14:15:38'),
('한화아쿠아플라넷',0,'2024-06-24 14:13:11'),
('해수욕장',0,'2024-06-24 14:06:38'),
('해운대',0,'2024-06-24 13:46:45');
/*!40000 ALTER TABLE `Tags_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Info`
--

DROP TABLE IF EXISTS `User_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Info` (
  `User_ID` varchar(45) NOT NULL,
  `User_Email` varchar(100) NOT NULL,
  `Profile_Img` longtext NOT NULL DEFAULT 'profiles/default_img.svg',
  `User_Pwd` varchar(100) NOT NULL,
  `User_Name` varchar(45) NOT NULL,
  `User_Msg` varchar(100) DEFAULT NULL,
  `User_Rule` int(11) NOT NULL DEFAULT 0,
  `User_Activate` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Info`
--

LOCK TABLES `User_Info` WRITE;
/*!40000 ALTER TABLE `User_Info` DISABLE KEYS */;
INSERT INTO `User_Info` VALUES
('1','1@1.com','profiles/default_img.svg','1','1',NULL,0,1),
('10','10@10.com','profiles/default_img.svg','10','10',NULL,0,1),
('11','11@11.com','profiles/default_img.svg','11','11',NULL,0,1),
('12','12@12.com','profiles/default_img.svg','12','12',NULL,0,1),
('13','13@13.com','profiles/default_img.svg','13','13',NULL,0,1),
('14','14@14.com','profiles/default_img.svg','14','14',NULL,0,1),
('15','15@15..com','profiles/default_img.svg','15','15',NULL,0,1),
('16','16@16.com','profiles/default_img.svg','16','16',NULL,0,1),
('17','17@17.com','profiles/default_img.svg','17','17',NULL,0,1),
('18','18@18.com','profiles/default_img.svg','18','18',NULL,0,1),
('19','19@19.com','profiles/default_img.svg','19','19',NULL,0,1),
('2','2@2.com','profiles/default_img.svg','2','2',NULL,0,1),
('20','20@20.com','profiles/default_img.svg','20','20',NULL,0,1),
('3','3@3.com','profiles/default_img.svg','3','3',NULL,0,1),
('4','4@4.com','profiles/default_img.svg','4','4',NULL,0,1),
('5','5@5.com','profiles/default_img.svg','5','5',NULL,0,1),
('6','6@6.com','profiles/default_img.svg','6','6',NULL,0,1),
('7','7@7.com','profiles/default_img.svg','7','7',NULL,0,1),
('8','8@8.com','profiles/default_img.svg','8','8',NULL,0,1),
('9','9@9.com','profiles/default_img.svg','9','9',NULL,0,1),
('asas0130','ana3630@naver.com','profiles/default_img.svg','1','서현진','안녕하세요 1대 개발자입니다\r\n백엔드와 데이터베이스를 손 봐줬습니다.\r\n',1,1),
('dyyu0326','dyyu0326@naver.com','profiles/1719298686795_dyyu0326.jpg','ehtjrhks3!','유연우','안녕하세요',1,1),
('junho','soooh1030@naver.com','profiles/default_img.svg','dhwnsgh0','junho',NULL,0,1),
('_youngs_','leeyoungjae2001@naver.com','profiles/1719231080961__youngs_.jpg','dudwo2001!','융재닷','안녕하세요 저는 1대 개발자 융재입니다.',1,1);
/*!40000 ALTER TABLE `User_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Tags`
--

DROP TABLE IF EXISTS `User_Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User_Tags` (
  `User_ID` varchar(45) NOT NULL,
  `User_Tag` varchar(25) NOT NULL,
  `Setup_Timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`User_Tag`,`User_ID`),
  KEY `UT_UI.User_ID_idx` (`User_ID`),
  CONSTRAINT `UT_TI.User_Tag` FOREIGN KEY (`User_Tag`) REFERENCES `Tags_Info` (`Tag`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `UT_UI.User_ID` FOREIGN KEY (`User_ID`) REFERENCES `User_Info` (`User_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Tags`
--

LOCK TABLES `User_Tags` WRITE;
/*!40000 ALTER TABLE `User_Tags` DISABLE KEYS */;
INSERT INTO `User_Tags` VALUES
('10','강릉','2024-06-24 13:42:28'),
('11','강릉','2024-06-24 13:42:46'),
('2','강릉','2024-06-24 13:40:17'),
('4','강릉','2024-06-24 13:40:46'),
('6','강릉','2024-06-24 13:41:20'),
('junho','강릉','2024-06-24 13:45:40'),
('1','계곡','2024-06-24 13:40:05'),
('14','계곡','2024-06-24 13:43:26'),
('18','계곡','2024-06-24 13:44:49'),
('_youngs_','계곡','2024-06-24 12:11:20'),
('1','보드','2024-06-24 13:40:05'),
('10','보드','2024-06-24 13:42:28'),
('6','보드','2024-06-24 13:41:20'),
('9','보드','2024-06-24 13:42:15'),
('asas0130','보드','2024-06-24 12:14:09'),
('14','부산','2024-06-24 13:43:26'),
('17','부산','2024-06-24 13:44:37'),
('4','부산','2024-06-24 13:40:46'),
('asas0130','부산','2024-06-24 12:14:09'),
('dyyu0326','부산','2024-06-25 06:58:06'),
('junho','부산','2024-06-24 13:45:40'),
('10','빠지','2024-06-24 13:42:28'),
('11','빠지','2024-06-24 13:42:46'),
('18','빠지','2024-06-24 13:44:49'),
('2','빠지','2024-06-24 13:40:17'),
('20','빠지','2024-06-24 13:45:14'),
('6','빠지','2024-06-24 13:41:20'),
('7','빠지','2024-06-24 13:41:37'),
('9','빠지','2024-06-24 13:42:15'),
('dyyu0326','빠지','2024-06-25 06:58:06'),
('_youngs_','빠지','2024-06-24 12:11:20'),
('13','산','2024-06-24 13:43:12'),
('17','산','2024-06-24 13:44:37'),
('20','산','2024-06-24 13:45:14'),
('7','산','2024-06-24 13:41:37'),
('8','산','2024-06-24 13:42:01'),
('dyyu0326','서울','2024-06-25 06:58:06'),
('1','스카이다이빙','2024-06-24 13:40:05'),
('12','스카이다이빙','2024-06-24 13:42:59'),
('17','스카이다이빙','2024-06-24 13:44:37'),
('18','스카이다이빙','2024-06-24 13:44:49'),
('20','스카이다이빙','2024-06-24 13:45:14'),
('3','스카이다이빙','2024-06-24 13:40:32'),
('7','스카이다이빙','2024-06-24 13:41:37'),
('8','스카이다이빙','2024-06-24 13:42:01'),
('9','스카이다이빙','2024-06-24 13:42:15'),
('asas0130','스카이다이빙','2024-06-24 12:14:09'),
('12','스키','2024-06-24 13:42:59'),
('3','스키','2024-06-24 13:40:32'),
('5','스키','2024-06-24 13:41:07'),
('8','스키','2024-06-24 13:42:01'),
('asas0130','스키','2024-06-24 12:14:09'),
('junho','스키','2024-06-24 13:45:40'),
('11','제주','2024-06-24 13:42:46'),
('13','제주','2024-06-24 13:43:12'),
('14','제주','2024-06-24 13:43:26'),
('2','제주','2024-06-24 13:40:17'),
('4','제주','2024-06-24 13:40:46'),
('5','제주','2024-06-24 13:41:07'),
('asas0130','제주','2024-06-24 12:14:09'),
('dyyu0326','제주','2024-06-25 06:58:06'),
('junho','제주','2024-06-24 13:45:40'),
('12','트래킹','2024-06-24 13:42:59'),
('19','트래킹','2024-06-24 13:45:01'),
('3','트래킹','2024-06-24 13:40:32'),
('5','트래킹','2024-06-24 13:41:07');
/*!40000 ALTER TABLE `User_Tags` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2024-06-26 17:18:11
