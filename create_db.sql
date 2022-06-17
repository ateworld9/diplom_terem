CREATE TABLE units (
  id serial PRIMARY KEY,
  unit_name varchar(255),
  unit_short varchar(255)
);

INSERT INTO units 
  (unit_name, unit_short)
VALUES
   ('штуки'           , 'шт.')
	,('квадратный метр'	, 'м2' )
	,('кубический метр'	, 'м3' )
  ,('комплект'        , 'компл.');

CREATE TABLE users (
  user_id serial PRIMARY KEY,
  email varchar(255) UNIQUE NOT NULL,
	password varchar(255) NOT NULL,
 	is_activated boolean DEFAULT FALSE,
	activation_link varchar(255)
);

CREATE TABLE tokens (
  token_id serial PRIMARY KEY,
  user_id integer REFERENCES users(user_id) ON DELETE SET NULL,
  refresh_token varchar(1000)
);

CREATE TABLE projects (
	project_id serial PRIMARY KEY,
	project_name varchar(255) NOT NULL,
	alt_name varchar(255) NOT NULL,
	price varchar(255),
	img_path varchar(255)
);

CREATE TABLE categories (
	category_id serial PRIMARY KEY,
	category_name varchar(255),
	alt_name varchar(255),
	price_from varchar(255),
	img_path varchar(255)
);

INSERT INTO projects 
(project_name, alt_name, price, img_path)
VALUES 
 ('Варяг 4', 'varyag4', '1', '/images/projects/varyag4.jpg')
,('Полковник 1', 'polkovnik1', '1', '/images/projects/polkovnik1.jpg')
,('Nova', 'nova', '1', '/images/projects/nova.jpg')
,('Канцлер 2', 'kanzler2', '1', '/images/projects/kanzler2.jpg')
,('Добрыня 2', 'dobrynya2', '1', '/images/projects/dobrynya2.jpeg')
,('Академик 2', 'akademik2', '1', '/images/projects/akademik2.jpg')
-- Проекты с мансардой + Канцлер, Варяг
,('Лидер 6', 'lider6', '1', '/images/projects/lider6.jpg')
,('Лидер ЛК 6', 'liderLK6', '1', '/images/projects/liderlk6.jpg')
,('Боярин 1', 'boyarin1', '1', '/images/projects/boyarin1.jpg')
,('Викинг 2', 'viking2', '1', '/images/projects/viking2.jpeg');

INSERT INTO categories 
(category_name, alt_name, price_from, img_path)
VALUES
 ('Премиум', 'premium', '7 332 000', 'images/catalogue/Premium.jpg')
,('Коттеджи', 'kottedzhi', '3 203 000', 'images/catalogue/Kotedge.jpg')
,('Современные дома', 'sovremennie-doma', '2 085 000', 'images/catalogue/sovremennie_doma.jpg')
,('Небольшие коттеджи', 'nebolshie-kottedzhi', '2 480 000', 'images/catalogue/little_kotedge.jpeg')
,('Дачные дома', 'dachnye-doma', '511 000', 'images/catalogue/dachi.jpg')
,('Бани', 'bani', '580 000', 'images/catalogue/bani.jpg')
,('Одноэтажные дома', 'odnoetazhnye-doma', '322 000', 'images/catalogue/1level.jpg')
,('Двухэтажные дома', 'dvukhetazhnye-doma', '3 803 000', 'images/catalogue/2level.jpg')
,('Проекты с мансардой', 'proekty-s-mansardoy', '1 200 000', 'images/catalogue/with_mansarda.jpg');

CREATE TABLE projects2category (
	project_id integer REFERENCES projects(project_id) ON DELETE SET NULL,
	category_id integer REFERENCES categories(category_id) ON DELETE SET NULL
);

INSERT INTO projects2category 
VALUES
(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(1,9),
(4,9),
(7,9),
(8,9),
(9,9),
(10,9);


CREATE TABLE orders (
	id serial PRIMARY KEY,
	customer_fio varchar(255),
	project_id int REFERENCES projects(project_id) ON DELETE SET NULL,
  address varchar(255),
  order_date date
);

CREATE TABLE equipments(
  equipment_id serial PRIMARY KEY,
  equip_name varchar(255),            -- Наименование оборудования
  serial_code varchar(255),           -- Серийный номер
  powers int,                         -- Мощность
  power_drop_year_percent int,        -- Нормативное падение мощности в год, %
  count_of_repairs  int,              -- Кол-во разрешенных ремонтов	
  write-off_details varchar(255),     -- Возм.демонтажа деталей при списании оборудования
  service_life int,                   -- Эксплуатационный срок 
  guarantee_period int,               -- Гарантийный срок работы оборудования	
  reserve_details varchar(255),       -- Запасные детали	
  start_date date,                    -- Дата покупки
  capital_repair_date date            -- Период проведения капитальных ремонтов	
);

INSERT INTO equipments
(equip_name, serial_code, powers, power_drop_year_percent, count_of_repairs, service_life, guarantee_period )
VALUES
 ('Hundegger K2-I', '06/AS-10626', 200, 5, 10, '5 лет', '1 год')
,('Hundegger K2-I', '06/AS-10627', 200, 5, 10, '5 лет', '1 год')
,('Hundegger K2-I', '06/AS-10628', 200, 5, 10, '5 лет', '1 год')
,('ЧПУ ОR-1500'   , 'E14-440'    , 100, 5, 7 , '5 лет', '1 год')
,('BELMASH-380V'  , 'LTS-250'    , 150, 5, 7 , '5 лет', '1 год')
,('BELMASH-380V'  , 'LTS-250'    , 150, 5, 7 , '5 лет', '1 год')

CREATE TABLE manufactories (
  id serial PRIMARY KEY,              -- № Цеха
  manufactory_name varchar(255),      -- Наименование цеха
  equipment_id int  REFERENCES equipments(equipment_id) ON DELETE SET NULL
);


INSERT INTO manufactories
(workers_count, powers)
VALUES
(25, 25*40),
(20, 20*40),
(19, 19*40),
(17, 17*40),
(21, 21*40),
(22, 22*40),
(23, 23*40),
(24, 24*40);

CREATE TABLE raws(
  id serial PRIMARY KEY,
  rawName varchar(255),
  rawCost int,
  unitId int REFERENCES units(id) ON DELETE SET NULL
  -- volumeInWarehouse int
);

-- INSERT INTO raws 
-- VALUES
--  (),
--  (),
--  (),
--  ();

CREATE TABLE products(
  id serial PRIMARY KEY,
  product_name varchar(255),
  unit_id int REFERENCES units(id) ON DELETE SET NULL
  -- rawId REFERENCES raws(id) ON DELETE SET NULL,
  -- rawConsumption int
);

INSERT INTO products 
(product_name, unit_id)
VALUES
 ('Дверь ДФ 2060-660 Левая'                   , 1),
 ('К-т окосячки двери внутр. 2060х660 К-80'   , 4),
 ('Дверь ДФ 2060-860 Левая'                   , 1),
 ('Дверь ДФ 2060-860 Правая'                  , 1),
 ('К-т окосячки двери внутр. 2060х860 К-80'   , 4),
 ('Доска пола 35 мм (2000)'                   , 3),
 ('Доска пола 35 мм (6000)'                   , 3),
 ('К-т бруса Лидер 6 БК-150 6х6 м ЛХК'        , 4),
 ('К-т окосячки двери входа 2060х860 К-140'   , 4),
 ('К-т окосячки окна 1160х1082 К-140'         , 4),
 ('К-т окосячки окна 1160х553 К-140'          , 4),
 ('П/м 10 антис (100, 570)'                   , 3),
 ('П/м 10 Н антис'                            , 3),
 ('П/м 15х65 строганный с 4-х сторон (4800)'  , 3),
 ('П/м 20х100х1630 П'                         , 3),
 ('П/м 20х100х2200'                           , 3),
 ('П/м 20х100х2280'                           , 3),
 ('П/м 20х100х5000'                           , 3),
 ('П/м 20х100х6000'                           , 3),
 ('П/м 24х100х6000'                           , 3),
 ('П/м 24х150х5950'                           , 3),
 ('П/м 24х150х6000'                           , 3),
 ('П/м 24х24х6000'                            , 3),
 ('П/м 24х46х1500'                            , 3),
 ('П/м 24х46х2000'                            , 3),
 ('П/м 24х46х6000'                            , 3),
 ('П/м 30х100 н/кондиция (6000)'              , 3),
 ('П/м 30х100х6000'                           , 3),
 ('П/м 35х47х1700'                            , 3),
 ('П/м 35х47х3000'                            , 3),
 ('П/м 38х150 н/кондиция (6000)'              , 3),
 ('П/м Доска 20х100х890 антис'                , 3),
 ('П/м Доска 24х150х3000 антис'               , 3),
 ('П/м Доска 35х100х6000 антис'               , 3),
 ('П/м Составной 162х24х6000 антис'           , 1),
 ('П/м Стропило СтК-9 35х100х1245'            , 3),
 ('Плинтус 16х30х3000'                        , 3),
 ('Плинтус 18х45х3000'                        , 3);


CREATE TABLE specifications(
  id serial PRIMARY KEY,
  project_id int REFERENCES projects(project_id) ON DELETE SET NULL
  --docDate
);

INSERT INTO specifications 
(project_id)
VALUES
(7);

CREATE TABLE specifications_items(
  id serial PRIMARY KEY,
  specification_id int REFERENCES specifications(id) ON DELETE SET NULL,
  product_id int REFERENCES products(id) ON DELETE SET NULL,
  product_count numeric,
  unit_id int REFERENCES units(id) ON DELETE SET NULL
);

INSERT INTO specifications_items
(specification_id, product_id, product_count, unit_id)
VALUES
 (1, 1  , 1           , 1),
 (1, 2  , 1           , 1),
 (1, 3  , 1           , 1),
 (1, 4  , 2           , 1),
 (1, 5  , 1           , 1),
 (1, 6  , 0.851	      , 1),
 (1, 7  , 1.210	      , 1),
 (1, 8  , 1           , 1),
 (1, 9  , 1           , 1),
 (1, 10 , 1           , 1),
 (1, 11 , 1           , 1),
 (1, 12 , 0.070			  , 1),
 (1, 13 , 0.330			  , 1),
 (1, 14 , 0.010			  , 1),
 (1, 15 , 0.033			  , 1),
 (1, 16 , 0.009			  , 1),
 (1, 17 , 0.018			  , 1),
 (1, 18 , 0.150			  , 1),
 (1, 19 , 0.336			  , 1),
 (1, 20 , 0.058			  , 1),
 (1, 21 , 0.321			  , 1),
 (1, 22 , 0.086			  , 1),
 (1, 23 , 0.014			  , 1),
 (1, 24 , 0.002			  , 1),
 (1, 25 , 0.002			  , 1),
 (1, 26 , 0.013			  , 1),
 (1, 27 , 0.144			  , 1),
 (1, 28 , 0.090			  , 1),
 (1, 29 , 0.003			  , 1),
 (1, 30 , 0.005			  , 1),
 (1, 31 , 0.205			  , 1),
 (1, 32 , 0.009			  , 1),
 (1, 33 , 0.011			  , 1),
 (1, 34 , 0.105			  , 1),
 (1, 35 , 2.000			  , 1),
 (1, 36 , 0.022			  , 1),
 (1, 37 , 0.111			  , 1),
 (1, 38 , 0.061			  , 1);

 CREATE TABLE manufactories_produce_products (
   id serial PRIMARY KEY,
   manufactory_id int REFERENCES manufactories(id) ON DELETE SET NULL,
   product_id int REFERENCES products(id) ON DELETE SET NULL,
   time_to_produce int 
   equipment_id int REFERENCES equipments(equipment_id) ON DELETE SET NULL
 );

  INSERT INTO manufactories_produce_products 
  (manufactory_id, product_id, time_to_produce)
  VALUES
  ( 1, 1 , 8),
  ( 1, 2 , 2),
  ( 1, 3 , 8),
  ( 1, 4 , 8),
  ( 1, 5 , 2),
  ( 1, 6 , 3),
  ( 1, 7 , 6),
  ( 1, 8 , 40),
  ( 1, 9 , 2),
  ( 1, 10, 1),
  ( 1, 11, 1),
  ( 1, 12, 1),
  ( 1, 13, 6),
  ( 1, 14, 2),
  ( 1, 15, 2),
  ( 1, 16, 2),
  ( 1, 17, 3),
  ( 1, 18, 3),
  ( 1, 19, 3),
  ( 1, 20, 4),
  ( 1, 21, 4),
  ( 1, 22, 3),
  ( 1, 23, 3),
  ( 1, 24, 3),
  ( 1, 25, 3),
  ( 1, 26, 5),
  ( 1, 27, 5),
  ( 1, 28, 5),
  ( 1, 29, 5),
  ( 1, 30, 5),
  ( 1, 31, 5),
  ( 1, 32, 5),
  ( 1, 33, 5),
  ( 1, 34, 5),
  ( 1, 35, 5),
  ( 1, 36, 2),
  ( 1, 37, 2)

/*

DROP TABLE IF EXISTS manufactoriesProduceProducts;
DROP TABLE IF EXISTS specificationsItems; 
DROP TABLE IF EXISTS specifications;
DROP TABLE IF EXISTS equipments;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS raws;
DROP TABLE IF EXISTS manufactories;

DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS projects2category;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS projects;

DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS units;
*/


 SELECT 
       p.project_name as "projectName"
      ,si.product_id as "productId"
      ,pp.product_name as "productName"
      ,si.product_count as "productCount"
	    ,si.product_count * mpp.time_to_produce as "timeToProduce"
  	  ,mpp.manufactory_id as "manufactoryId"
      FROM orders o
      join projects p on o.project_id = p.project_id
      join specifications s on o.project_id = s.project_id 
      join specifications_items si on si.specification_id = s.id
      join products pp on pp.id = si.product_id
	  join manufactories_produce_products mpp on si.product_id = mpp.product_id
	  join manufactories m on m.id = mpp.manufactory_id


CREATE TABLE technologic_map (
  equipment_id int
  ,equipment_name  varchar(255)
  ,serial_code  varchar(255)
  ,complect_name  varchar(255)
  ,powers	int
  ,entred_from  varchar(255)
  ,transferred_to   varchar(255)
)


CREATE TABLE equipment_price (
  equipment_id int
  ,equipment_name  varchar(255)
  ,equipment_power int
  ,equipment_price int
)


CREATE TABLE equipment_repair_list (
  equipment_id int
  ,equipment_name varchar(255)
 	,serial_code varchar(255)
 	,powers int
	,repair_type varchar(255)
	,repair_date date
  ,repair_cost int
  ,maintenance_cost int
  ,rest_price int
)


CREATE TABLE reestr_completed_products (
  equipment_name varchar(255)
  ,serial_code int
  ,technologic_map_number int
  ,complect_name varchar(255)
  ,complect_price int
)


 CREATE TABLE manufactories_plans (
    manufactory_id int REFERENCES manufactories(id) ON DELETE SET NULL,
    order_id int REFERENCES orders(id) ON DELETE SET NULL,
    project_id int REFERENCES projects(project_id) ON DELETE SET NULL,
    product_id int REFERENCES products(id) ON DELETE SET NULL,
    product_count int,
    time_to_produce int

  );

  CREATE TABLE manufactories_work_reports (
    manufactory_id int REFERENCES manufactories(id) ON DELETE SET NULL,
    product_id nt REFERENCES products(id) ON DELETE SET NULL,
    fact_count int,
    raw_id int REFERENCES raws(id) ON DELETE SET NULL, 
    raw_spent int,
    doc_date date
  );

  CREATE TABLE manufactories_plan_fact (
    manufactory_id int REFERENCES manufactories(id) ON DELETE SET NULL,
    product_id int REFERENCES products(id) ON DELETE SET NULL,
    plan_count int,
    fact_count int,
    undone_count int,
    doc_start_date date,
    doc_end_date date
  );
