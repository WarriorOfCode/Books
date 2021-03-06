-- phpMyAdmin SQL Dump
-- version 4.0.10.6
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 05 2016 г., 22:25
-- Версия сервера: 5.5.41-log
-- Версия PHP: 5.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `Books_DB`
--

-- --------------------------------------------------------

--
-- Структура таблицы `assessments`
--

CREATE TABLE IF NOT EXISTS `assessments` (
  `id_user` int(10) unsigned NOT NULL,
  `id_book` int(10) unsigned NOT NULL,
  `assessment` int(11) DEFAULT NULL,
  KEY `FK__users` (`id_user`),
  KEY `FK__books` (`id_book`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `assessments`
--

INSERT INTO `assessments` (`id_user`, `id_book`, `assessment`) VALUES
(41, 35, 10),
(41, 50, 9),
(41, 38, 10),
(41, 36, 7),
(41, 80, 10),
(45, 45, 8),
(46, 80, 6),
(41, 43, 10);

-- --------------------------------------------------------

--
-- Структура таблицы `authors`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Дамп данных таблицы `authors`
--

INSERT INTO `authors` (`id`, `Name`, `Last_Name`, `patronymic`, `Birth_date`, `Biography`, `Counry_of_birth`, `image_url`) VALUES
(1, 'Антуан де', 'Сент-Экзюпери', '', '1900-06-20', 'Антуан де Сент-Экзюпери родился во французском городе Лион на улице Пейра, 8 у графа Жана-Марка Сент-Экзюпери (1863-1904), который был страховым инспектором, и его супруги Мари Буаэ де Фонколомб. Семья происходила из старинного рода перигорских дворян. Антуан (его домашним прозвищем было „Тонио“) был третьим из пятерых детей, у него было две старших сестры — Мари-Мадлен „Бише“ (род. в 1897) и Симона „Моно“ (род. в 1898), — младший брат Франсуа (род. в 1902) и младшая сестра Габриэла „Диди“ (род. в 1904). Ранее детство детей Экзюпери прошло в усадьбе Сен-Морис де Реманс в департаменте Эн, но в 1904 году, когда Антуану было 4 года, отец скончался от кровоизлияния в мозг, после чего Мари вместе с детьми переехала в Лион.', 'Франция', '/images/authors/1.jpg'),
(2, 'Элис', 'Сиболд', '', '1963-09-06', 'Элис Сиболд родилась в Мэдисоне, штат Висконсин, США и с детства мечтала стать известным писателем. В настоящее время Сиболд является автором трёх книг, в разной степени основанных на событиях её жизни.Первой книгой Сиболд стали мемуары «Счастливая», в которых она попыталась рассказать о случившемся с ней в юные годы, когда она поступила в Сиракузский университет. Будучи молодой студенткой, 8 мая 1981 года Сиболд подверглась нападению насильника. Названием мемуаров («Счастливая») Сиболд обязана офицеру полиции, который расследовал её дело: он сказал ей, что предыдущая жертва насильника погибла от нанесённых ей повреждений, и Элис просто «повезло». 5 октября того же года, идя по улице около Сиракузского университетского городка, она случайно узнала своего насильника, сообщила в полицию и дала против него показания в суде. Воспоминания были опубликованы в 1999 году, после чего Элис Сиболд решила продолжить карьеру писателя.', 'США', '/images/authors/2.jpg'),
(3, 'Фрэнсис Скотт', 'Фицджеральд', 'Кей ', '1896-09-24', 'Фицджеральд родился 24 сентября 1896 года в городе Сент-Пол, штат Миннесота, в обеспеченной католической ирландской семье. До его рождения семья потеряла двоих детей, поэтому Фрэнсис Скотт был желанным ребёнком. Своё имя он получил в честь своего двоюродного прадеда, автора текста государственного гимна США «Знамя, усыпанное звёздами» Фрэнсиса Скотта Ки (1779—1843). Дед Фицджеральда по материнской линии, Филип Маккуиллан, эмигрировал в США из Ирландии. Семья быстро разбогатела, и уже к 30 годам старший Маккуиллан стал владельцем крупной фирмы.', 'США', '/images/authors/3.jpg'),
(4, 'Ханс ', 'Андерсен', 'Кристиан', '1805-04-02', ' Отец Андерсена, Ханс Андерсен (1782—1816), был бедным башмачником, а мать Анна Мари Андерсдаттер (1775—1833) была прачкой из бедной семьи. Он рос очень нервным ребёнком, эмоциональным и восприимчивым. В то время физические наказания детей в школах были обычным делом, поэтому мальчик боялся ходить в школу, и мама отдала его в благотворительную школу (куда брали и еврейских детей), где физические наказания не практиковались.', 'Дания', '/images/authors/4.jpg'),
(5, 'Михаил', 'Булгаков', 'Афанасьевич', '1891-05-15', 'В семье было семеро детей: Михаил (1891—1940), Вера (1892—1972), Надежда (1893—1971), Варвара (1895—1956), Николай (1898—1966), Иван (1900—1969) и Елена (1902—1954).В 1909 году Михаил Булгаков окончил Первую киевскую гимназию и поступил на медицинский факультет Киевского университета. Выбор профессии врача объяснялся тем, что оба брата матери, Николай и Михаил Покровские, были врачами, один — в Москве, другой — в Варшаве, оба хорошо зарабатывали. Михаил, терапевт, был врачом Патриарха Тихона, Николай — гинеколог — имел в Москве прекрасную практику. Булгаков в университете учился 7 лет — имея освобождение по состоянию здоровья (почечная недостаточность) подавал рапорт для службы врачом на флоте и после отказа медицинской комиссии попросил послать его добровольцем Красного Креста в госпиталь. 31 октября 1916 года — получил диплом об утверждении «в степени лекаря с отличием со всеми правами и преимуществами, законами Российской Империи сей степени присвоенными».', 'Российская империя', '/images/authors/5.jpg'),
(6, 'Эрнест', 'Хемингуэй', 'Миллер', '1899-07-21', 'Американский писатель, журналист, лауреат Нобелевской премии по литературе 1954 года.', 'США', '/images/authors/6.jpg'),
(7, 'Дэвид ', 'Флэнаган', NULL, NULL, ' Программист, автор множества книг. Закончил Массачусестский технологический институт.', 'США', '/images/authors/7.jpg'),
(8, 'Герберт', 'Шилдт', NULL, '1951-02-27', 'Писатель и учёный в сфере компьютерных наук, получил образование и учёную степень в Иллинойском университете в Урбана-Шампейн. Был членом комитета ANSI, который принимал стандарты С в 1989 году и комитета ISO, принимавшего стандарты C++ в 1998.  Его первые книги были опубликованы в 1985—1986 годах (на обложке книги Advanced Modula-2 1987 года было написано, что это его шестая книга). Все его книги были напечатаны издательством Osborne, которое позже было приобретено компанией McGraw-Hill. Общий тираж его книг, переведённых на большинство языков, составляет более 3 миллионов экземпляров.', 'США', '/images/authors/8.jpg'),
(10, 'Саша', 'Сушкин', NULL, '2010-11-30', 'Хороший мужик', 'Россия', ''),
(12, 'Агата', 'Кристина', NULL, '0808-09-11', 'Холост', 'Питер', ''),
(14, 'Льюис', 'Кэрролл', NULL, NULL, 'Родился 27 января 1832 в доме приходского священника в деревне Дарсбери, графство Чешир. Всего в семье было 7 девочек и 4 мальчика. Учиться начал дома, показал себя умным и сообразительным. Его образованием занимался отец...', 'Великобритания', '/images/authors/14.jpg'),
(15, 'Фёдор', 'Достоевский', 'Михайлович', '1821-10-29', 'По линии отца Фёдор Михайлович происходил из дворянского рода Достоевских, ведущего своё начало с 1506 года. Биограф писателя Л. И. Сараскина отмечает, что Достоевский не знал своей столь древней родословной. Генеалогией рода Достоевских начала заниматься вдова писателя лишь после его смерти.  Дед писателя Ф. М. Достоевского Андрей Григорьевич Достоевский (1756 — около 1819) служил униатским, позже — православным священником в селе Войтовцы близ Немирова (ныне Винницкая область Украины), по родословной — протоиерей города Брацлав Подольской губернии', 'Российская империя', '/images/authors/15.jpg'),
(16, 'Виктор', 'Гюго', NULL, '1802-02-25', 'Виктор Гюго был младшим из трёх братьев', 'Франция', '/images/authors/16.jpg'),
(17, 'Михаил', 'Лермонтов', 'Юрьевич', '1814-10-02', 'Род Лермонтовых происходил из Шотландии и восходил к полумифическому барду-пророку Томасу Лермонту. В 1613 году один из представителей этого рода, поручик польской армии Георг (Джордж) Лермонт (около 1596—1633 или 1634), был взят в плен русскими при захвате крепости Белая и в числе прочих так называемых бельских немцев поступил на службу к царю Михаилу Фёдоровичу. Он перешёл в православие и стал, под именем Юрия Андреевича, родоначальником русской дворянской фамилии Лермонтовых.', 'Российская империя', '/images/authors/17.jpg'),
(18, 'Николай', 'Гоголь', 'Васильевич', '1809-03-20', 'Николаем его назвали в честь Святителя Николая. Согласно семейному преданию, он происходил из старинного казацкого рода и предположительно был потомком Остапа Гоголя — гетмана Правобережного Войска Запорожского Речи Посполитой. Некоторые из его предков приставали и к шляхетству, и ещё дед Гоголя, Афанасий Демьянович Гоголь-Яновский (1738—1805), писал в официальной бумаге, что «его предки, фамилией Гоголь, польской нации», хотя большинство биографов склонны считать, что он всё же был «малороссом».', 'Российская империя', '/images/authors/18.png'),
(19, 'Айн', 'Рэнд', NULL, '1905-02-02', 'Алиса Зиновьевна Розенбаум родилась в Санкт-Петербурге, в семье фармацевта Залмана-Вольфа (Зиновия Захаровича) Розенбаума (1869, Брест-Литовск — между 1941—1943, Ленинград) и его жены, зубного техника Ханы Берковны (Анны Борисовны) Каплан (1880, Санкт-Петербург — ноябрь 1941, Ленинград)...', 'СССР', '/images/authors/19.jpg'),
(20, 'Александр', 'Пушкин', 'Сергеевич', '1799-05-25', 'русский поэт, драматург и прозаик.\nЕщё при жизни Пушкина сложилась его репутация величайшего национального русского поэта.', 'Российская империя', '/images/authors/20.jpg'),
(21, 'Шарль', 'Перро', NULL, '1628-01-11', 'французский поэт и критик эпохи классицизма, член Французской академии с 1671 года, ныне известный в основном как автор «Сказок матушки Гусыни».', 'Королевство Франция', '/images/authors/21.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `authors_groups`
--

CREATE TABLE IF NOT EXISTS `authors_groups` (
  `id_author` int(10) unsigned NOT NULL,
  `id_group` int(10) unsigned NOT NULL,
  KEY `FK_authors_groups_authors` (`id_author`),
  KEY `FK_authors_groups_groups` (`id_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Birth_data` smallint(4) NOT NULL,
  `Description` text,
  `ISBN` varchar(20) NOT NULL,
  `image_url` tinytext,
  `publishing` tinytext NOT NULL,
  `assessment` tinyint(2) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=83 ;

--
-- Дамп данных таблицы `books`
--

INSERT INTO `books` (`id`, `Name`, `Birth_data`, `Description`, `ISBN`, `image_url`, `publishing`, `assessment`) VALUES
(1, 'Тест', 2015, 'Where I am?', '01', '/links', 'Энигма', 0),
(2, 'Cказка о царе салтане', 1832, 'сказка в стихах А. С. Пушкина. Создана в 1831 году, а впервые издана через год.\nПервоначально Пушкин хотел при написании сказки чередовать стихи с прозой, но впоследствии отказался от этой идеи.', '9785850660604', '/images/2.jpg', 'Энигма', 0),
(35, 'Алиса в стране чудес', 1865, 'Сказка, написанная английским математиком, поэтом и писателем Чарльзом Лютвиджом Доджсоном под псевдонимом Льюис Кэрролл и изданная в 1865 году. В ней рассказывается о девочке по имени Алиса, которая попадает сквозь кроличью нору в воображаемый мир, населённый странными антропоморфными существами. Сказка пользуется устойчивой популярностью как у детей, так и взрослых. Книга считается одним из лучших образцов литературы в жанре абсурда; в ней используются многочисленные математические, лингвистические и философские шутки и аллюзии. Ход повествования и его структура оказали сильное влияние на искусство, особенно на жанр фэнтези. «Алиса в Зазеркалье» является сюжетным продолжением произведения.', '9785990228436', '/images/35.jpg', 'Энигма', 10),
(36, 'Преступление и наказание', 1866, 'Осенью 1865 года, потеряв все свои деньги в казино, не в состоянии оплатить долги кредиторам, и стараясь помочь семье своего брата Михаила, который умер в июле 1864 года, Достоевский планирует создание романа с центральным образом семьи Мармеладовых под названием «Пьяненькие». На тему же убийства его натолкнуло дело Пьера-Франсуа Ласенера, французского убийцы-интеллектуала, считавшего, что в его деяниях виновато общество, главным героем становится студент Родион Раскольников, и роман получает название «Преступление и наказание».  Роман печатался по частям с января по декабрь 1866 года. Достоевский много работал над романом, торопясь добавить к каждой очередной книжке журнала свежие главы. Вскоре после окончания публикации романа в журнале Достоевский печатает его отдельным изданием: «Роман в шести частях с эпилогом Ф. М. Достоевского. Издание исправленное». Для этого издания Достоевский сделал в тексте значительные сокращения и изменения: три части журнальной редакции были преобразованы в шесть, изменено частично и деление на главы.  "Философская мысль Достоевского в романе «Преступление и наказание» касается «проблем добра и зла, свободы и необходимости, преступления и моральной ответственности, революции, социализма, философии, истории и государства», — пишет чл.-корр. Н. К. Пиксанов.', '9781743338742', '/images/36.jpg', 'Энигма', 7),
(38, 'Герой нашего времени', 1840, 'Роман Михаила Юрьевича Лермонтова, классика русской литературы. Впервые роман был издан в Санкт-Петербурге, в типографии Ильи Глазунова и Кº, в 1840 г., в 2 книгах. Тираж 1000 экземпляров.', '9785998504105', '/images/38.jpg', 'Энигма', 10),
(39, 'Мёртвые души', 1842, 'Произведение Николая Васильевича Гоголя, жанр которого сам автор обозначил как поэма. Изначально задумано как трёхтомное произведение. Первый том был издан в 1842 году. Практически готовый второй том уничтожен писателем, но сохранилось несколько глав в черновиках. Третий том был задуман и не начат, о нём остались только отдельные сведения.', '9780307797810', '/images/39.jpg', 'Энигма', 0),
(40, 'Маленький принц', 1943, '— аллегорическая повесть, наиболее известное произведение Антуана де Сент-Экзюпери.  Впервые опубликована 6 апреля 1943 года в Нью-Йорке. Рисунки в книге выполнены самим автором и не менее знамениты, чем сама книга. Важно, что это не иллюстрации, а органическая часть произведения в целом: сам автор и герои сказки всё время ссылаются на рисунки и даже спорят о них. Уникальные иллюстрации в «Маленьком принце» разрушают языковые барьеры, становятся частью универсального визуального лексикона, понятного каждому.  «Ведь все взрослые сначала были детьми, только мало кто из них об этом помнит» — Антуан де Сент-Экзюпери, из посвящения к книге.', '9788845115059', '/images/40.jpg', 'Энигма', 0),
(41, 'Милые кости', 2002, 'Книга вышла в США в 2002 году и оказалась настоящим сюрпризом не только для публики и литературных критиков, но и для самих издателей, не рассчитывавших на большой тираж автора, опубликовавшего до этого всего одно произведение и практически не известного широкой публике. Роман вошёл практически во все рейтинги лучших романов 2002 года и числился в списках бестселлеров на протяжении более чем года.', '9780330413169', '/images/41.jpg', 'Энигма', 0),
(42, 'Великий Гэтсби', 1925, 'Действие романа происходит недалеко от Нью-Йорка, на «золотом побережье» Лонг-Айленда, среди вилл богачей. В 1920-е годы вслед за хаосом Первой мировой американское общество вступило в беспрецедентную полосу процветания: в «ревущие двадцатые» экономика США стремительно развивалась. В то же время «сухой закон» сделал многих бутлегеров миллионерами и дал значительный толчок развитию организованной преступности. Восхищаясь богатыми и их очарованием, Фицджеральд в то же время порицает неограниченный материализм и отсутствие морали Америки того времени.  Хотя «Великий Гэтсби» был инсценирован на Бродвее и экранизирован в Голливуде вскоре после выпуска, роман не стал при жизни автора особенно известным — было продано менее 24 000 экземпляров книги. Во времена Великой депрессии и Второй мировой войны он был забыт и появился снова лишь в пятидесятые годы, когда уже приобрёл популярность.  В последующие десятилетия роман стал обязательным для чтения в средних школах и в вузовских курсах литературы во многих англоязычных странах мира.', '9785457642386', '/images/42.jpg', 'Энигма', 0),
(43, 'Русалочка', 1837, 'всемирно известная сказка датского писателя Ганса Христиана Андерсена, повествующая о молодой русалке, которая готова отказаться от своей жизни в море ради того, чтобы получить человеческую душу и любовь принца. Впервые была опубликована в 1837 году и была многократно адаптирована, включая мюзиклы, художественные и анимационные фильмы.  Литературный перевод на русский язык имени главной героини и названия сказки спутал понятия. Так как героиня сказки не имеет отношения к русалкам, с точки зрения мифологии — это морская дева.', '9781854699787', '/images/43.jpg', 'Энигма', 10),
(44, 'Вий', 1835, ' мистическая повесть Николая Гоголя, впервые опубликованная в его сборнике «Миргород» (1835). Название повести — это имя славянского демонического существа мужского пола, с которым связан сюжет.', '9785000640272', '/images/44.jpg', 'Энигма', 0),
(45, 'Атлант расплавил плечи', 1957, 'роман американской писательницы Айн Рэнд, впервые опубликованный в 1957 году в США. Является четвёртым и последним романом Рэнд, а также самым длинным. Рэнд считала его своим главным произведением в литературной карьере.', '9789872095109', '/images/45.jpg', 'Энигма', 8),
(46, 'Собачье сердце', 1925, 'Написана в 1925 году, впервые опубликована в 1968 году одновременно в журнале «Грани» (Франкфурт) и журнале Алека Флегона «Студент» (Лондон). В СССР в 1960-е годы распространялась в самиздате.Впервые повесть была опубликована в СССР в 1987 году в 6-м номере журнала Знамя. Повесть неоднократно переиздавалась.', '9788422676768', '/images/46.jpg', 'Энигма', 0),
(47, 'Вечера на хуторе близ Диканьки', 1831, 'ервая книга Николая Васильевича Гоголя (исключая поэму «Ганц Кюхельгартен», напечатанную под псевдонимом). Состоит из двух томов. Первый вышел в 1831, второй — в 1832 году. Рассказы «Вечеров» Гоголь писал в 1829—1832 годах. По сюжету же, — рассказы книги якобы собрал и издал «пасичник Рудый Панько».', '9785389005396', '/images/47.jpg', 'Энигма', 0),
(48, 'Старик и море', 1952, 'Повесть Эрнеста Хемингуэя, вышедшая в 1952 году. Рассказывает историю старика Сантьяго, кубинского рыбака, и его борьбу с гигантской рыбой, которая стала самой большой добычей в его жизни.', '9780099908401', '/images/48.jpg', 'Энигма', 0),
(50, 'JavaScript. Подробное руководство', 2004, 'Данное издание содержит полное описание базового языка, а также традиционной и стандартизованной объективных моделей документа, реализованных в веб-броузерах.', '9785932860557', '/images/50.jpg', 'Энигма', 9),
(51, 'C# 4.0. Полное руководство', 2011, 'В этом полном руководстве по C# 4.0 - языку программирования, разработанному специально для среды .NET, - детально рассмотрены все основные средства языка: типы данных, операторы, управляющие операторы, классы, интерфейсы, методы, делегаты, индексаторы, события, указатели, обобщения, коллекции, основные библиотеки классов, средства многопоточного программирования и директивы препроцессора. Подробно описаны новые возможности C#, в том числе PLINQ, библиотека TPL, динамический тип данных, а также именованные и необязательные аргументы. Это справочное пособие снабжено массой полезных советов авторитетного автора и сотнями примеров программ с комментариями, благодаря которым они становятся понятными любому читателю независимо от уровня его подготовки.  Книга рассчитана на широкий круг читателей, интересующихся программированием на C#. Полностью исправленное и обновленное издание классического руководства по C# 4.0  Книга содержит:  Полное описание средств языка C# Подробное рассмотрение новых средств в версии C# 4.0, в том числе PLINQ, библиотеку TPL, именованные и необязательные аргументы, динамический тип данных и многое другое Сотни простых и понятных примеров программ с комментариями. Самый полный источник информации по C# Благодаря поддержке параллельного языка интегрированных запросов (PLINQ) и библиотеки распараллеливания задач (TPL) версия 4.0 стала новой вехой в программировании на C#, и поэтому Герберт Шилдт, автор лучших книг по программированию, обновил и расширил свое классическое руководство, чтобы охватить в нем эти и другие нововведения. В книге подробно описываются языковые средства C#, даются профессиональные рекомендации и приводятся сотни примеров программ, охватывающих все аспекты программирования на C#, включая синтаксис, ключевые слова и основные библиотеки, не говоря уже о таких новшествах, как PLINQ, TPL, динамический тип данных, а также именованные и необязательные аргументы.  Это необходимое каждому программирующему на C# справочное руководство написано простым и доступным языком, благодаря которому Герберт Шилдт стал таким популярным. В книге найдут ответы на насущные вопросы по C# как начинающие, так и опытные программисты.  Основные темы книги:  Типы данных и операторы Управляющие операторы Классы и объекты Конструкторы, деструкторы и методы Интерфейсы, массивы, перечисления и структуры Перегрузка методов и операторов Наследование и виртуальные методы Рефлексия и динамическая идентификация типов Делегаты, свойства, события и индексаторы Обработка исключительных ситуаций Атрибуты Указатели и ненадежный код Многопоточное программирование и его поддержка в библиотеке TPL Обобщения Встроенный язык LINQ и его расширение PLINQ Лямбда-выражения Анонимные и динамические типы Методы расширения Неявно типизированные переменные Основные библиотеки C# и пространство имен System Ввод-вывод данных, сетевые возможности и коллекции Директивы препроцессора и многое другое', '9785845916846', '/images/1.jpg', 'Энигма', 0),
(80, 'Золушка', 1697, 'западноевропейская сказка, наиболее известная по редакциям Шарля Перро, братьев Гримм и «Пентамерона». Это один из популярнейших «бродячих сюжетов», который имеет свыше тысячи воплощений в фольклоре разных народов мира.\nСамая ранняя известная версия сказки обнаружена на египетских папирусах. Главная героиня сказки — девушка по имени Родопис, родившаяся в Греции. Она была похищена пиратами, которые привезли её в Египет, где и продали в рабство. Хозяин купил ей изящные кожаные позолоченные сандалии. Пока Родопис купалась в реке, сокол (этим соколом был бог Гор) украл её сандалию и унёс фараону. Сандалия была такой маленькой и изящной, что фараон тут же объявил общенациональный розыск. Когда он нашёл Родопис — Золушку — он тут же женился на ней.', '978-5-8112-5410-1', '/images/80.jpg', 'Энигма', 8),
(82, 'Test', 2016, 'Ho you are?', '', '/img', '', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `books_authors`
--

CREATE TABLE IF NOT EXISTS `books_authors` (
  `id_book` int(11) unsigned NOT NULL,
  `id_author` int(11) unsigned NOT NULL,
  KEY `FK_books_authors_books` (`id_book`),
  KEY `FK_books_authors_authors` (`id_author`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `books_authors`
--

INSERT INTO `books_authors` (`id_book`, `id_author`) VALUES
(35, 14),
(36, 15),
(38, 17),
(39, 18),
(40, 1),
(41, 2),
(42, 3),
(43, 4),
(44, 18),
(45, 19),
(46, 5),
(47, 18),
(48, 6),
(50, 7),
(51, 8),
(2, 20),
(80, 21),
(82, 2),
(82, 3),
(82, 4),
(82, 5),
(1, 19);

-- --------------------------------------------------------

--
-- Структура таблицы `books_groups`
--

CREATE TABLE IF NOT EXISTS `books_groups` (
  `id_book` int(10) unsigned DEFAULT NULL,
  `id_group` int(10) unsigned DEFAULT NULL,
  KEY `FK_books_groups_books` (`id_book`),
  KEY `FK_books_groups_groups` (`id_group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `books_groups`
--

INSERT INTO `books_groups` (`id_book`, `id_group`) VALUES
(38, 1),
(36, 1),
(39, 1),
(42, 2),
(36, 2),
(38, 2),
(40, 3),
(44, 3),
(45, 2),
(35, 4),
(41, 2),
(46, 3),
(47, 3),
(48, 3),
(50, 5),
(51, 5),
(2, 4),
(80, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `books_users`
--

CREATE TABLE IF NOT EXISTS `books_users` (
  `id_book` int(11) unsigned DEFAULT NULL,
  `id_user` int(11) unsigned DEFAULT NULL,
  `progress` int(2) unsigned NOT NULL DEFAULT '0',
  KEY `FK_books_users_books` (`id_book`),
  KEY `FK_books_users_users` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `books_users`
--

INSERT INTO `books_users` (`id_book`, `id_user`, `progress`) VALUES
(36, 15, 0),
(38, 15, 0),
(35, 31, 0),
(39, 15, 0),
(40, 15, 0),
(41, 15, 0),
(43, 15, 0),
(35, 15, 0),
(42, 15, 0),
(44, 15, 0),
(47, 15, 0),
(48, 15, 0),
(50, 15, 0),
(36, 42, 0),
(41, 42, 0),
(51, 45, 0),
(50, 45, 0),
(43, 41, 0),
(50, 41, 0),
(38, 41, 0),
(80, 41, 0),
(51, 41, 2),
(35, 41, 1),
(80, 46, 0),
(46, 41, 1),
(36, 41, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `citations`
--

CREATE TABLE IF NOT EXISTS `citations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_book` int(10) unsigned NOT NULL,
  `id_user` int(10) unsigned NOT NULL,
  `text` mediumtext NOT NULL,
  `birthDate` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_citations_books` (`id_book`),
  KEY `FK_citations_users` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `citations`
--

INSERT INTO `citations` (`id`, `id_book`, `id_user`, `text`, `birthDate`) VALUES
(1, 51, 46, 'Балалааааааааааааааааааааааайка!\nИграла балалайка на селе....', '2016-02-08'),
(2, 51, 46, 'и бежали медведи', '2016-02-08'),
(4, 51, 46, 'а за ними', '2016-02-08'),
(5, 43, 41, 'Забудь свои мечты, иначе белой пеной станешь ты...', '2016-02-09'),
(6, 43, 41, 'Каждый твой шаг будет приносить тебе боль, но ты не сможешь закричать.', '2016-02-09');

-- --------------------------------------------------------

--
-- Структура таблицы `facts`
--

CREATE TABLE IF NOT EXISTS `facts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_book` int(11) unsigned DEFAULT NULL,
  `id_author` int(11) unsigned DEFAULT NULL,
  `fact` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_facts_books` (`id_book`),
  KEY `FK_facts_authors` (`id_author`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Дамп данных таблицы `facts`
--

INSERT INTO `facts` (`id`, `id_book`, `id_author`, `fact`) VALUES
(1, 80, NULL, 'В одноименной сказке Братье Гримм дочери мачехи отрезают себе пальцы на ногах, что бы влезть в туфельку'),
(2, 80, NULL, 'В одной из самых древних версий сказки (Китай), героиня носит обувь, сотканную из золотых нитей, с подошвами из чистого золота. В сказке братьев Гримм героиня сначала получает в подарок «туфельки, расшитые шелками и серебром», а в последний вечер – «туфли чистого золота». В бретонской сказке «Груша с золотыми грушами» упоминаются три пары туфелек: стальные, серебряные и золотые. В итальянской сказке Золушка обута в серебряные туфельки, а в венецианском варианте сказки – в алмазные. В датской сказке туфельки шелковые. В сказке писательницы Мари-Катрин д’Онуа они сделаны из красного бархата и вышиты жемчугом. '),
(3, NULL, 5, 'Крутой!'),
(4, NULL, 5, 'Наркоман'),
(5, NULL, 21, 'Плагиатор');

-- --------------------------------------------------------

--
-- Структура таблицы `friends`
--

CREATE TABLE IF NOT EXISTS `friends` (
  `id_follower` int(11) unsigned NOT NULL,
  `id_following` int(10) unsigned NOT NULL,
  KEY `FK_friends_users` (`id_follower`),
  KEY `FK_friends_users_2` (`id_following`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `friends`
--

INSERT INTO `friends` (`id_follower`, `id_following`) VALUES
(41, 45),
(46, 41),
(41, 46);

-- --------------------------------------------------------

--
-- Структура таблицы `groups`
--

CREATE TABLE IF NOT EXISTS `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` tinytext NOT NULL,
  `genre` tinyint(1) unsigned DEFAULT '0',
  `master_id` int(11) unsigned NOT NULL,
  `acess` int(2) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_groups_users` (`master_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `groups`
--

INSERT INTO `groups` (`id`, `Name`, `genre`, `master_id`, `acess`) VALUES
(1, 'Русская классика', 0, 41, 1),
(2, 'Романы', 1, 41, 1),
(3, 'Повести', 1, 41, 1),
(4, 'Сказки', 1, 41, 1),
(5, 'Научная литература', 1, 41, 1),
(6, 'IT', 0, 41, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `offers`
--

CREATE TABLE IF NOT EXISTS `offers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext,
  `author` tinytext,
  `link` tinytext,
  `id_user` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `offers`
--

INSERT INTO `offers` (`id`, `name`, `author`, `link`, `id_user`) VALUES
(1, 'fuck me', 'нига', NULL, 41),
(2, 'Максим танк', 'танкист', NULL, 41),
(3, 'пуля не зверь', 'волк', NULL, 41),
(4, 'как хорошо с тобой', 'в другой мире', NULL, 41),
(5, 'гори в аду', 'чёрт', NULL, 41),
(6, 'Код Дурова', 'Николай Кононов', NULL, 45);

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` tinytext,
  `text` mediumtext NOT NULL,
  `birthDate` date DEFAULT NULL,
  `assessement` int(2) unsigned DEFAULT '5',
  `id_book` int(11) unsigned NOT NULL,
  `id_user` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_reviews_books` (`id_book`),
  KEY `FK_reviews_users` (`id_user`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=34 ;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `title`, `text`, `birthDate`, `assessement`, `id_book`, `id_user`) VALUES
(8, 'Неплохая', 'ПОмню мультик..он крутой', '0000-00-00', 4, 80, 44),
(9, NULL, 'Спасибо, не читал =)', NULL, 5, 51, 45),
(10, NULL, 'Годное чтиво!', NULL, 5, 50, 45),
(13, 'Хорошая', 'Одна из любимых книг', '2016-01-31', 5, 43, 41),
(15, 'Я не такая, как была вчера', 'Книга перебрасывает тебя в детство, когда видел то чего нету и  из этого порой выходили целые миры. Жаль, что со временем нельзя убежать в один из этих миров и остаться навсегда.', '2016-02-03', 5, 35, 41),
(20, 'Отличная книга', 'Отличная книга', '2016-02-07', 5, 80, 45),
(32, NULL, 'Перечитав книгу во взрослости я поняла, что она мне не нравится. Конец неправдоподобен, да и девушка бесхребетна и слаба и никак не боролась за своё счастье. Книга учит быть девочек быть добрыми и трудолюбивыми, но без своего мнения и просто плыть по течению. Так и вырастают романтичные натуры, ждущие принца просто потому, что они считают себя лучше остальных.\nНужно знать чего ты хочешь или всю жизнь придётся исполнять желания тех, кто это знает', '2016-02-08', 5, 80, 46),
(33, 'Наказание и преступление', 'Суровая книга применимая к новым реалиям и проясняющая людские поступки в сложных жизненных ситуациях', '2016-02-09', 5, 36, 41);

-- --------------------------------------------------------

--
-- Структура таблицы `test`
--

CREATE TABLE IF NOT EXISTS `test` (
  `id_book` int(11) DEFAULT NULL,
  `assessment` int(11) DEFAULT NULL,
  UNIQUE KEY `id_book` (`id_book`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `test`
--

INSERT INTO `test` (`id_book`, `assessment`) VALUES
(1, 5),
(2, 3),
(4, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `NickName` varchar(22) NOT NULL,
  `password` tinytext NOT NULL,
  `Name` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `BirthData` date DEFAULT NULL,
  `Age` int(3) DEFAULT NULL,
  `Email` varchar(50) NOT NULL,
  `permissions` int(4) unsigned zerofill DEFAULT '0000',
  `salt` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `NickName` (`NickName`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=49 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `NickName`, `password`, `Name`, `LastName`, `BirthData`, `Age`, `Email`, `permissions`, `salt`) VALUES
(15, 'Nataly', 'jenia', 'Nataly', 'Salivoncik', '1993-03-16', NULL, 'natalya.salivonchik@mail.ru', 1111, NULL),
(30, 'a', 'agaregaer', NULL, NULL, NULL, NULL, 'agargrg@agrr', 0000, NULL),
(31, 'Admin', '1234567', NULL, NULL, NULL, NULL, 'admin@mail.ru', 0000, NULL),
(37, 'Jo', 'jocool1', NULL, NULL, NULL, NULL, 'j@o', 0000, NULL),
(41, 'Kaktus', '112fea45e5e5f19c64451ecefa07186b2efec1b9bd38aed568d1f1e9443173cb06820b3c1dde2d9f9e49fe762674f2f2b70c19546dec40f1af399f87282170b6', 'Медведь', 'хороший', NULL, NULL, 'itisjusttest@mail.ru', 1111, '46006445225'),
(42, 'mix', '3ea8d0db722e3e9de77fc85728260ec424750821a69b9cd2dd2628e0810fa6e7b1c283a5f083e3f56564cdb69fe5a8177dbc3da5d8c6d6ecc359e699a6dde179', 'Micha', 'Русский', NULL, NULL, 'dhgcuyc@vhv', 0000, '356344428028'),
(43, 'Машка', '949645af6827bbf256af24f2114df6b2f18cddd0422a76b3c107732ab0a851352f1c56e85a3f2d14044adb870cb5ebf37ebf6597885d0d848532159dbc966216', NULL, NULL, NULL, NULL, 'abab@agrgaht', 0000, '695777770789'),
(44, 'Tester1', 'ab294df35d9873693b0895ef9d10dd5d74eebb13fa3e3a115ac17bf1e7b4b09453652a21e960d92dd76c1b7702c6bd5937e0f2051682deef9ec67d9517dbf935', NULL, NULL, NULL, NULL, 'tester@i', 0000, '280827448019'),
(45, 'wcoder', '5384796c786848ce8f201aa065188eab4421e9a11de9a7228bcd6845ee3e271fb16f00603785686489cc7d72f641aa47cd52b77381b3a3724ed667d0a5a4024e', NULL, NULL, NULL, NULL, 'evgeniy.pakalo@gmail.com', 0000, '1055171023450'),
(46, 'Orange', '29a88712475c88f9615e4c8ef2a3052a5b1328f56ffba4b378e69447fa59cf48e967d9e6e87495b51fbdc3ac406f02b60249fd2a77985f2c675ff6e8e0e91e10', NULL, NULL, NULL, NULL, 'Mandarinka@Love', 0000, '200232875746'),
(47, 'Admin1', '4edf89b8851634a3874c0df2a7e09e5785cc727cedd542eda5f9e4194f9d9890a958f8b801db862579eb3e1f795d56c8b06dfc048e0b5ebba6dbdff2d799eda3', NULL, NULL, NULL, NULL, 'admin@i', 0000, '560803321587'),
(48, 'painkiller', '046e21d4b1514df0564d429ec63679aacc599acfdd5f275cb8044b798f1b951b4fc3d023bf0b72862cddcf058025fcf4cbcf6ce1b548c65335a31f2464040f3d', NULL, NULL, NULL, NULL, 'if*ckyou@mothr', 0000, '223013627098');

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `assessments`
--
ALTER TABLE `assessments`
  ADD CONSTRAINT `FK__books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK__users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `authors_groups`
--
ALTER TABLE `authors_groups`
  ADD CONSTRAINT `FK_authors_groups_authors` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_authors_groups_groups` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `books_authors`
--
ALTER TABLE `books_authors`
  ADD CONSTRAINT `FK_books_authors_authors` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_books_authors_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `books_groups`
--
ALTER TABLE `books_groups`
  ADD CONSTRAINT `FK_books_groups_books` FOREIGN KEY (`id_book`) REFERENCES `Books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_books_groups_groups` FOREIGN KEY (`id_group`) REFERENCES `Groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `books_users`
--
ALTER TABLE `books_users`
  ADD CONSTRAINT `FK_books_users_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_books_users_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `citations`
--
ALTER TABLE `citations`
  ADD CONSTRAINT `FK_citations_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_citations_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `facts`
--
ALTER TABLE `facts`
  ADD CONSTRAINT `FK_facts_authors` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_facts_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `FK_friends_users` FOREIGN KEY (`id_follower`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_friends_users_2` FOREIGN KEY (`id_following`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `FK_groups_users` FOREIGN KEY (`master_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `offers`
--
ALTER TABLE `offers`
  ADD CONSTRAINT `FK_offers_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FK_reviews_books` FOREIGN KEY (`id_book`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_reviews_users` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
