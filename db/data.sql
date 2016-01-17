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


-- Dumping structure for table Books_DB.authors
CREATE TABLE IF NOT EXISTS `authors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` tinytext NOT NULL,
  `Last_Name` tinytext NOT NULL,
  `patronymic` tinytext,
  `Birth_date` date DEFAULT NULL,
  `Biography` text,
  `Counry_of_birth` text NOT NULL,
  `image_url` tinytext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.authors: ~16 rows (approximately)
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` (`id`, `Name`, `Last_Name`, `patronymic`, `Birth_date`, `Biography`, `Counry_of_birth`, `image_url`) VALUES
	(1, 'Антуан де', 'Сент-Экзюпери', '', '1900-06-20', 'Антуан де Сент-Экзюпери родился во французском городе Лион на улице Пейра, 8 у графа Жана-Марка Сент-Экзюпери (1863-1904), который был страховым инспектором, и его супруги Мари Буаэ де Фонколомб. Семья происходила из старинного рода перигорских дворян. Антуан (его домашним прозвищем было „Тонио“) был третьим из пятерых детей, у него было две старших сестры — Мари-Мадлен „Бише“ (род. в 1897) и Симона „Моно“ (род. в 1898), — младший брат Франсуа (род. в 1902) и младшая сестра Габриэла „Диди“ (род. в 1904). Ранее детство детей Экзюпери прошло в усадьбе Сен-Морис де Реманс в департаменте Эн, но в 1904 году, когда Антуану было 4 года, отец скончался от кровоизлияния в мозг, после чего Мари вместе с детьми переехала в Лион.', 'Франция', '/images/authors/1.jpg'),
	(2, 'Элис', 'Сиболд', '', '1963-09-06', 'Элис Сиболд родилась в Мэдисоне, штат Висконсин, США и с детства мечтала стать известным писателем. В настоящее время Сиболд является автором трёх книг, в разной степени основанных на событиях её жизни.Первой книгой Сиболд стали мемуары «Счастливая», в которых она попыталась рассказать о случившемся с ней в юные годы, когда она поступила в Сиракузский университет. Будучи молодой студенткой, 8 мая 1981 года Сиболд подверглась нападению насильника. Названием мемуаров («Счастливая») Сиболд обязана офицеру полиции, который расследовал её дело: он сказал ей, что предыдущая жертва насильника погибла от нанесённых ей повреждений, и Элис просто «повезло». 5 октября того же года, идя по улице около Сиракузского университетского городка, она случайно узнала своего насильника, сообщила в полицию и дала против него показания в суде. Воспоминания были опубликованы в 1999 году, после чего Элис Сиболд решила продолжить карьеру писателя.', 'США', '/images/authors/2.jpg'),
	(3, 'Фрэнсис Скотт', 'Фицджеральд', 'Кей ', '1896-09-24', 'Фицджеральд родился 24 сентября 1896 года в городе Сент-Пол, штат Миннесота, в обеспеченной католической ирландской семье. До его рождения семья потеряла двоих детей, поэтому Фрэнсис Скотт был желанным ребёнком. Своё имя он получил в честь своего двоюродного прадеда, автора текста государственного гимна США «Знамя, усыпанное звёздами» Фрэнсиса Скотта Ки (1779—1843). Дед Фицджеральда по материнской линии, Филип Маккуиллан, эмигрировал в США из Ирландии. Семья быстро разбогатела, и уже к 30 годам старший Маккуиллан стал владельцем крупной фирмы.', 'США', '/images/authors/3.jpg'),
	(4, 'Ханс ', 'Андерсен', 'Кристиан', '1805-04-02', ' Отец Андерсена, Ханс Андерсен (1782—1816), был бедным башмачником, а мать Анна Мари Андерсдаттер (1775—1833) была прачкой из бедной семьи. Он рос очень нервным ребёнком, эмоциональным и восприимчивым. В то время физические наказания детей в школах были обычным делом, поэтому мальчик боялся ходить в школу, и мама отдала его в благотворительную школу (куда брали и еврейских детей), где физические наказания не практиковались.', 'Дания', '/images/authors/4.jpg'),
	(5, 'Михаил', 'Булгаков', 'Афанасьевич', '1891-05-15', 'В семье было семеро детей: Михаил (1891—1940), Вера (1892—1972), Надежда (1893—1971), Варвара (1895—1956), Николай (1898—1966), Иван (1900—1969) и Елена (1902—1954).В 1909 году Михаил Булгаков окончил Первую киевскую гимназию и поступил на медицинский факультет Киевского университета. Выбор профессии врача объяснялся тем, что оба брата матери, Николай и Михаил Покровские, были врачами, один — в Москве, другой — в Варшаве, оба хорошо зарабатывали. Михаил, терапевт, был врачом Патриарха Тихона, Николай — гинеколог — имел в Москве прекрасную практику. Булгаков в университете учился 7 лет — имея освобождение по состоянию здоровья (почечная недостаточность) подавал рапорт для службы врачом на флоте и после отказа медицинской комиссии попросил послать его добровольцем Красного Креста в госпиталь. 31 октября 1916 года — получил диплом об утверждении «в степени лекаря с отличием со всеми правами и преимуществами, законами Российской Империи сей степени присвоенными».', 'Российская империя', '/images/authors/5.jpg'),
	(6, 'Эрнест', 'Хемингуэй', 'Миллер', '1899-07-21', 'Американский писатель, журналист, лауреат Нобелевской премии по литературе 1954 года.', 'США', '/images/authors/6.jpg'),
	(7, 'Дэвид ', 'Флэнаган', NULL, NULL, ' Программист, автор множества книг. Закончил Массачусестский технологический институт.', 'США', '/images/authors/7.jpg'),
	(10, 'Саша', 'Сушкин', NULL, '2010-11-30', 'Хороший мужик', 'Россия', ''),
	(12, 'Агата', 'Кристи', NULL, '0808-09-11', 'Холост', 'Питер', ''),
	(13, 'Николай', 'Белый', NULL, NULL, 'Белый', 'Бельгия', ''),
	(14, 'Льюис', 'Кэрролл', NULL, NULL, 'Родился 27 января 1832 в доме приходского священника в деревне Дарсбери, графство Чешир. Всего в семье было 7 девочек и 4 мальчика. Учиться начал дома, показал себя умным и сообразительным. Его образованием занимался отец...', 'Великобритания', '/images/authors/14.jpg'),
	(15, 'Фёдор', 'Достоевский', 'Михайлович', '1821-10-29', 'По линии отца Фёдор Михайлович происходил из дворянского рода Достоевских, ведущего своё начало с 1506 года. Биограф писателя Л. И. Сараскина отмечает, что Достоевский не знал своей столь древней родословной. Генеалогией рода Достоевских начала заниматься вдова писателя лишь после его смерти.  Дед писателя Ф. М. Достоевского Андрей Григорьевич Достоевский (1756 — около 1819) служил униатским, позже — православным священником в селе Войтовцы близ Немирова (ныне Винницкая область Украины), по родословной — протоиерей города Брацлав Подольской губернии', 'Российская империя', '/images/authors/15.jpg'),
	(16, 'Виктор', 'Гюго', NULL, '1802-02-25', 'Виктор Гюго был младшим из трёх братьев', 'Франция', '/images/authors/16.jpg'),
	(17, 'Михаил', 'Лермонтов', 'Юрьевич', '1814-10-02', 'Род Лермонтовых происходил из Шотландии и восходил к полумифическому барду-пророку Томасу Лермонту. В 1613 году один из представителей этого рода, поручик польской армии Георг (Джордж) Лермонт (около 1596—1633 или 1634), был взят в плен русскими при захвате крепости Белая и в числе прочих так называемых бельских немцев поступил на службу к царю Михаилу Фёдоровичу. Он перешёл в православие и стал, под именем Юрия Андреевича, родоначальником русской дворянской фамилии Лермонтовых.', 'Российская империя', '/images/authors/17.jpg'),
	(18, 'Николай', 'Гоголь', 'Васильевич', '1809-03-20', 'Николаем его назвали в честь Святителя Николая. Согласно семейному преданию, он происходил из старинного казацкого рода и предположительно был потомком Остапа Гоголя — гетмана Правобережного Войска Запорожского Речи Посполитой. Некоторые из его предков приставали и к шляхетству, и ещё дед Гоголя, Афанасий Демьянович Гоголь-Яновский (1738—1805), писал в официальной бумаге, что «его предки, фамилией Гоголь, польской нации», хотя большинство биографов склонны считать, что он всё же был «малороссом».', 'Российская империя', '/images/authors/18.png'),
	(19, 'Айн', 'Рэнд', NULL, '1905-02-02', 'Алиса Зиновьевна Розенбаум родилась в Санкт-Петербурге, в семье фармацевта Залмана-Вольфа (Зиновия Захаровича) Розенбаума (1869, Брест-Литовск — между 1941—1943, Ленинград) и его жены, зубного техника Ханы Берковны (Анны Борисовны) Каплан (1880, Санкт-Петербург — ноябрь 1941, Ленинград)...', 'СССР', '/images/authors/19.jpg');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;


-- Dumping structure for table Books_DB.authors_groups
CREATE TABLE IF NOT EXISTS `authors_groups` (
  `id_author` int(10) unsigned DEFAULT NULL,
  `id_group` int(10) unsigned DEFAULT NULL,
  KEY `FK_authors_groups_authors` (`id_author`),
  KEY `FK_authors_groups_groups` (`id_group`),
  CONSTRAINT `FK_authors_groups_authors` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_authors_groups_groups` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.authors_groups: ~0 rows (approximately)
/*!40000 ALTER TABLE `authors_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `authors_groups` ENABLE KEYS */;


-- Dumping structure for table Books_DB.books
CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Birth_data` smallint(4) NOT NULL,
  `Description` text,
  `ISBN` bigint(13) unsigned zerofill NOT NULL,
  `image_url` tinytext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.books: ~31 rows (approximately)
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (`id`, `Name`, `Birth_data`, `Description`, `ISBN`, `image_url`) VALUES
	(34, 'Мастер и маргарита', 1966, 'Роман Михаила Афанасьевича Булгакова, работа над которым началась в конце 1920-х годов и продолжалась вплоть до смерти писателя. Роман относится к незавершённым произведениям; редактирование и сведение воедино черновых записей осуществляла после смерти мужа вдова писателя — Елена Сергеевна. Первая версия романа, имевшая названия «Копыто инженера», «Чёрный маг» и другие, была уничтожена Булгаковым в 1930 году. В последующих редакциях среди героев произведения появились автор романа о Понтии Пилате и его возлюбленная. Окончательное название — «Мастер и Маргарита» — оформилось в 1937 году.', 9788636701584, '/images/34.jpg'),
	(35, 'Алиса в стране чудес', 1865, 'Сказка, написанная английским математиком, поэтом и писателем Чарльзом Лютвиджом Доджсоном под псевдонимом Льюис Кэрролл и изданная в 1865 году. В ней рассказывается о девочке по имени Алиса, которая попадает сквозь кроличью нору в воображаемый мир, населённый странными антропоморфными существами. Сказка пользуется устойчивой популярностью как у детей, так и взрослых. Книга считается одним из лучших образцов литературы в жанре абсурда; в ней используются многочисленные математические, лингвистические и философские шутки и аллюзии. Ход повествования и его структура оказали сильное влияние на искусство, особенно на жанр фэнтези. «Алиса в Зазеркалье» является сюжетным продолжением произведения.', 9785990228436, '/images/35.jpg'),
	(36, 'Преступление и наказание', 1866, 'Осенью 1865 года, потеряв все свои деньги в казино, не в состоянии оплатить долги кредиторам, и стараясь помочь семье своего брата Михаила, который умер в июле 1864 года, Достоевский планирует создание романа с центральным образом семьи Мармеладовых под названием «Пьяненькие». На тему же убийства его натолкнуло дело Пьера-Франсуа Ласенера, французского убийцы-интеллектуала, считавшего, что в его деяниях виновато общество, главным героем становится студент Родион Раскольников, и роман получает название «Преступление и наказание».  Роман печатался по частям с января по декабрь 1866 года. Достоевский много работал над романом, торопясь добавить к каждой очередной книжке журнала свежие главы. Вскоре после окончания публикации романа в журнале Достоевский печатает его отдельным изданием: «Роман в шести частях с эпилогом Ф. М. Достоевского. Издание исправленное». Для этого издания Достоевский сделал в тексте значительные сокращения и изменения: три части журнальной редакции были преобразованы в шесть, изменено частично и деление на главы.  "Философская мысль Достоевского в романе «Преступление и наказание» касается «проблем добра и зла, свободы и необходимости, преступления и моральной ответственности, революции, социализма, философии, истории и государства», — пишет чл.-корр. Н. К. Пиксанов.', 9781743338742, '/images/36.jpg'),
	(37, 'Собор Парижской Богоматери', 1831, '6 января 1482 года в Париже идут «гуляния, объединяющие праздник Крещения Господня с древним языческим праздником шутов». В этот день, по традиции, на Гревской площади зажигают потешные огни, украшают деревья (своего рода прообраз рождественской ёлки).  По приказу кардинала Бурбонского Карла в центральном зале Дворца правосудия («Большая зала») должны были представить пьесу с участием персонажей из Библии, а также древнеримских богов — «Мистерию». Пьеса была посвящена планировавшемуся в то время бракосочетанию «сына льва Франции», наследника французского престола дофина Карла и Маргариты Австрийской. После мистерии должно было состояться избрание главного комедианта Парижа — шутовского папы.  Состоялось избрание шутовского папы — им стал горбатый звонарь собора Парижской Богоматери Квазимодо. Пьер Гренгуар, автор «Мистерии», в отчаянии бежал из дворца. Ему негде было скоротать ночь, ведь на вырученные за «Мистерию» деньги он рассчитывал расплатиться за жильё. Он решил разделить с народом радость и отправился к огню на площади. Там Пьер увидел танцующую девушку «такой красоты, что сам Бог предпочел бы её Деве Марии».', 9781412109123, '/images/37.jpg'),
	(38, 'Герой нашего времени', 1840, 'Роман Михаила Юрьевича Лермонтова, классика русской литературы. Впервые роман был издан в Санкт-Петербурге, в типографии Ильи Глазунова и Кº, в 1840 г., в 2 книгах. Тираж 1000 экземпляров.', 9785998504105, '/images/38.jpg'),
	(39, 'Мёртвые души', 1842, 'Произведение Николая Васильевича Гоголя, жанр которого сам автор обозначил как поэма. Изначально задумано как трёхтомное произведение. Первый том был издан в 1842 году. Практически готовый второй том уничтожен писателем, но сохранилось несколько глав в черновиках. Третий том был задуман и не начат, о нём остались только отдельные сведения.', 9780307797810, '/images/39.jpg'),
	(40, 'Маленький принц', 1943, '— аллегорическая повесть, наиболее известное произведение Антуана де Сент-Экзюпери.  Впервые опубликована 6 апреля 1943 года в Нью-Йорке. Рисунки в книге выполнены самим автором и не менее знамениты, чем сама книга. Важно, что это не иллюстрации, а органическая часть произведения в целом: сам автор и герои сказки всё время ссылаются на рисунки и даже спорят о них. Уникальные иллюстрации в «Маленьком принце» разрушают языковые барьеры, становятся частью универсального визуального лексикона, понятного каждому.  «Ведь все взрослые сначала были детьми, только мало кто из них об этом помнит» — Антуан де Сент-Экзюпери, из посвящения к книге.', 9788845115059, '/images/40.jpg'),
	(41, 'Милые кости', 2002, 'Книга вышла в США в 2002 году и оказалась настоящим сюрпризом не только для публики и литературных критиков, но и для самих издателей, не рассчитывавших на большой тираж автора, опубликовавшего до этого всего одно произведение и практически не известного широкой публике. Роман вошёл практически во все рейтинги лучших романов 2002 года и числился в списках бестселлеров на протяжении более чем года.', 9780330413169, '/images/41.jpg'),
	(42, 'Великий Гэтсби', 1925, 'Действие романа происходит недалеко от Нью-Йорка, на «золотом побережье» Лонг-Айленда, среди вилл богачей. В 1920-е годы вслед за хаосом Первой мировой американское общество вступило в беспрецедентную полосу процветания: в «ревущие двадцатые» экономика США стремительно развивалась. В то же время «сухой закон» сделал многих бутлегеров миллионерами и дал значительный толчок развитию организованной преступности. Восхищаясь богатыми и их очарованием, Фицджеральд в то же время порицает неограниченный материализм и отсутствие морали Америки того времени.  Хотя «Великий Гэтсби» был инсценирован на Бродвее и экранизирован в Голливуде вскоре после выпуска, роман не стал при жизни автора особенно известным — было продано менее 24 000 экземпляров книги. Во времена Великой депрессии и Второй мировой войны он был забыт и появился снова лишь в пятидесятые годы, когда уже приобрёл популярность.  В последующие десятилетия роман стал обязательным для чтения в средних школах и в вузовских курсах литературы во многих англоязычных странах мира.', 9785457642386, '/images/42.jpg'),
	(43, 'Русалочка', 1837, 'всемирно известная сказка датского писателя Ганса Христиана Андерсена, повествующая о молодой русалке, которая готова отказаться от своей жизни в море ради того, чтобы получить человеческую душу и любовь принца. Впервые была опубликована в 1837 году и была многократно адаптирована, включая мюзиклы, художественные и анимационные фильмы.  Литературный перевод на русский язык имени главной героини и названия сказки спутал понятия. Так как героиня сказки не имеет отношения к русалкам, с точки зрения мифологии — это морская дева.', 9781854699787, '/images/43.jpg'),
	(44, 'Вий', 1835, ' мистическая повесть Николая Гоголя, впервые опубликованная в его сборнике «Миргород» (1835). Название повести — это имя славянского демонического существа мужского пола, с которым связан сюжет.', 9785000640272, '/images/44.jpg'),
	(45, 'Атлант расплавил плечи', 1957, 'роман американской писательницы Айн Рэнд, впервые опубликованный в 1957 году в США. Является четвёртым и последним романом Рэнд, а также самым длинным. Рэнд считала его своим главным произведением в литературной карьере.', 9789872095109, '/images/45.jpg'),
	(46, 'Собачье сердце', 1925, 'Написана в 1925 году, впервые опубликована в 1968 году одновременно в журнале «Грани» (Франкфурт) и журнале Алека Флегона «Студент» (Лондон). В СССР в 1960-е годы распространялась в самиздате.Впервые повесть была опубликована в СССР в 1987 году в 6-м номере журнала Знамя. Повесть неоднократно переиздавалась.', 9788422676768, '/images/46.jpg'),
	(47, 'Вечера на хуторе близ Диканьки', 1831, 'ервая книга Николая Васильевича Гоголя (исключая поэму «Ганц Кюхельгартен», напечатанную под псевдонимом). Состоит из двух томов. Первый вышел в 1831, второй — в 1832 году. Рассказы «Вечеров» Гоголь писал в 1829—1832 годах. По сюжету же, — рассказы книги якобы собрал и издал «пасичник Рудый Панько».', 9785389005396, '/images/47.jpg'),
	(48, 'Старик и море', 1952, 'Повесть Эрнеста Хемингуэя, вышедшая в 1952 году. Рассказывает историю старика Сантьяго, кубинского рыбака, и его борьбу с гигантской рыбой, которая стала самой большой добычей в его жизни.', 9780099908401, '/images/48.jpg'),
	(50, 'JavaScript. Подробное руководство', 2004, 'Данное издание содержит полное описание базового языка, а также традиционной и стандартизованной объективных моделей документа, реализованных в веб-броузерах.', 9785932860557, '/images/50.jpg');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;


-- Dumping structure for table Books_DB.books_authors
CREATE TABLE IF NOT EXISTS `books_authors` (
  `id_book` int(11) unsigned DEFAULT NULL,
  `id_author` int(11) unsigned DEFAULT NULL,
  KEY `FK_books_authors_books` (`id_book`),
  KEY `FK_books_authors_authors` (`id_author`),
  CONSTRAINT `FK_books_authors_authors` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_books_authors_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.books_authors: ~16 rows (approximately)
/*!40000 ALTER TABLE `books_authors` DISABLE KEYS */;
INSERT INTO `books_authors` (`id_book`, `id_author`) VALUES
	(35, 14),
	(36, 15),
	(37, 16),
	(38, 17),
	(39, 18),
	(40, 1),
	(41, 2),
	(42, 3),
	(43, 4),
	(34, 5),
	(44, 18),
	(45, 19),
	(46, 5),
	(47, 18),
	(48, 6),
	(50, 7);
/*!40000 ALTER TABLE `books_authors` ENABLE KEYS */;


-- Dumping structure for table Books_DB.books_groups
CREATE TABLE IF NOT EXISTS `books_groups` (
  `id_book` int(10) unsigned DEFAULT NULL,
  `id_group` int(10) unsigned DEFAULT NULL,
  KEY `FK_books_groups_books` (`id_book`),
  KEY `FK_books_groups_groups` (`id_group`),
  CONSTRAINT `FK_books_groups_books` FOREIGN KEY (`id_book`) REFERENCES `Books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_books_groups_groups` FOREIGN KEY (`id_group`) REFERENCES `Groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.books_groups: ~15 rows (approximately)
/*!40000 ALTER TABLE `books_groups` DISABLE KEYS */;
INSERT INTO `books_groups` (`id_book`, `id_group`) VALUES
	(38, 1),
	(34, 1),
	(36, 1),
	(39, 1),
	(42, 2),
	(34, 2),
	(36, 2),
	(37, 2),
	(38, 2),
	(40, 3),
	(44, 3),
	(45, 2),
	(35, 4),
	(41, 2),
	(46, 3);
/*!40000 ALTER TABLE `books_groups` ENABLE KEYS */;


-- Dumping structure for table Books_DB.books_reviews
CREATE TABLE IF NOT EXISTS `books_reviews` (
  `id_book` int(10) unsigned DEFAULT NULL,
  `id_review` int(10) unsigned DEFAULT NULL,
  KEY `FK_books_reviews_books` (`id_book`),
  KEY `FK_books_reviews_reviews` (`id_review`),
  CONSTRAINT `FK_books_reviews_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_books_reviews_reviews` FOREIGN KEY (`id_review`) REFERENCES `reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.books_reviews: ~0 rows (approximately)
/*!40000 ALTER TABLE `books_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `books_reviews` ENABLE KEYS */;


-- Dumping structure for table Books_DB.books_users
CREATE TABLE IF NOT EXISTS `books_users` (
  `id_book` int(11) unsigned DEFAULT NULL,
  `id_user` int(11) unsigned DEFAULT NULL,
  KEY `FK_books_users_books` (`id_book`),
  KEY `FK_books_users_users` (`id_user`),
  CONSTRAINT `FK_books_users_books` FOREIGN KEY (`id_book`) REFERENCES `Books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_books_users_users` FOREIGN KEY (`id_user`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.books_users: ~23 rows (approximately)
/*!40000 ALTER TABLE `books_users` DISABLE KEYS */;
INSERT INTO `books_users` (`id_book`, `id_user`) VALUES
	(34, 23),
	(36, 15),
	(38, 15),
	(35, 31),
	(39, 15),
	(40, 15),
	(41, 15),
	(34, 15),
	(37, 15),
	(43, 15),
	(35, 15),
	(42, 15),
	(44, 15),
	(36, 32),
	(45, 32),
	(47, 15),
	(48, 15),
	(43, 14),
	(48, 14),
	(47, 14),
	(50, 14),
	(50, 15),
	(35, 14);
/*!40000 ALTER TABLE `books_users` ENABLE KEYS */;


-- Dumping structure for table Books_DB.friends
CREATE TABLE IF NOT EXISTS `friends` (
  `id_follower` int(11) unsigned NOT NULL,
  `id_following` int(11) unsigned NOT NULL,
  KEY `FK_friends_users` (`id_follower`),
  KEY `FK_friends_users_2` (`id_following`),
  CONSTRAINT `FK_friends_users` FOREIGN KEY (`id_follower`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_friends_users_2` FOREIGN KEY (`id_following`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.friends: ~4 rows (approximately)
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` (`id_follower`, `id_following`) VALUES
	(22, 1),
	(23, 1),
	(15, 23),
	(15, 1);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;


-- Dumping structure for table Books_DB.groups
CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` tinytext NOT NULL,
  `genre` tinyint(1) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.groups: ~6 rows (approximately)
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` (`id`, `Name`, `genre`) VALUES
	(1, 'Русская классика', 0),
	(2, 'Роман', 1),
	(3, 'Повесть', 1),
	(4, 'Сказка', 1),
	(5, 'Научная литература', 1),
	(6, 'IT', 0);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;


-- Dumping structure for table Books_DB.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) unsigned NOT NULL,
  `Text` mediumtext NOT NULL,
  `Birth_Date` date NOT NULL,
  `assessement` int(2) unsigned DEFAULT '5',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.reviews: ~0 rows (approximately)
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;


-- Dumping structure for table Books_DB.users
CREATE TABLE IF NOT EXISTS `users` (
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
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.users: ~21 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `NickName`, `password`, `Name`, `LastName`, `BirthData`, `Age`, `Email`, `permissions`) VALUES
	(1, 'Master', '', 'Darth', 'Vader', '1942-08-13', 73, 'enakin.skywalker@djedai.com', 0000),
	(2, 'Son', '', 'Luk', 'Skywalker', '2000-04-01', 15, 'luk.taturion@djedai.com', 0000),
	(3, 'PrincesOfNaby', '', 'Padme', 'Amidala', '1938-12-15', 77, 'NabyTheBest@padme.com', 0000),
	(14, 'Tester', '123456', NULL, NULL, NULL, NULL, 'sobak@a', 0000),
	(15, 'Nataly', 'jenia', 'Nataly', 'Salivoncik', '1993-03-16', NULL, 'natalya.salivonchik@mail.ru', 1111),
	(22, 'Mama', 'magomed', NULL, NULL, NULL, NULL, 'magma@agagr', 0000),
	(23, 'Jenia', 'jjjjjj', 'Jeka', '', NULL, NULL, '', 0000),
	(24, 'dsd', 'ewewe', NULL, NULL, NULL, NULL, 'dsd@sd', 0000),
	(25, 'sd', 'ssd', NULL, NULL, NULL, NULL, 'sd@s', 0000),
	(26, 'Maste', 'agrg', NULL, NULL, NULL, NULL, 'NabeBest@padme.com', 0000),
	(27, 'Mas', '12345678', 'Удавка', 'Большевика', NULL, NULL, 'agora@sp', 0000),
	(28, 'Marta', '123', NULL, NULL, NULL, NULL, 'kot@kod', 0000),
	(29, 'asdf', 'a234234234234234234234234234234234234234', NULL, NULL, NULL, NULL, 'dfsdf@rewe', 0000),
	(30, 'a', 'agaregaer', NULL, NULL, NULL, NULL, 'agargrg@agrr', 0000),
	(31, 'Admin', '1234567', NULL, NULL, NULL, NULL, 'admin@mail.ru', 0000),
	(32, 'wcoder', 'qwerty123', 'Yauheni', 'Pakala', NULL, NULL, 'evgeniy.pakalo@gmail.com', 0000),
	(33, 'Fargo', 'agargar', NULL, NULL, NULL, NULL, 'agrag@agrg', 0000),
	(34, 'Butcher', 'agargraeg', NULL, NULL, NULL, NULL, 'agargr@agrg', 0000),
	(35, 'Saller', '123456789', NULL, NULL, NULL, NULL, 'agragr@agrg', 0000),
	(36, 'Killer', 'agageeee', NULL, NULL, NULL, NULL, 'agag@agrg', 0000),
	(37, 'Jo', 'jocool1', NULL, NULL, NULL, NULL, 'j@o', 0000);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


-- Dumping structure for table Books_DB.users_review
CREATE TABLE IF NOT EXISTS `users_review` (
  `id_user` int(10) unsigned NOT NULL,
  `id_review` int(10) unsigned NOT NULL,
  KEY `FK_users_review_users` (`id_user`),
  KEY `FK_users_review_reviews` (`id_review`),
  CONSTRAINT `FK_users_review_reviews` FOREIGN KEY (`id_review`) REFERENCES `reviews` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_users_review_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table Books_DB.users_review: ~0 rows (approximately)
/*!40000 ALTER TABLE `users_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_review` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
