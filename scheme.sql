CREATE TABLE units (
  id serial PRIMARY KEY,
  unit_name varchar(255),
  unit_short varchar(255)
);

CREATE TABLE projects (
	project_id serial PRIMARY KEY,
	project_name varchar(255) NOT NULL,
	alt_name varchar(255) NOT NULL,
	price varchar(255),
	img_path varchar(255)
);


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
  write_off_details varchar(255),     -- Возм.демонтажа деталей при списании оборудования
  service_life int,                   -- Эксплуатационный срок 
  guarantee_period int,               -- Гарантийный срок работы оборудования	
  reserve_details varchar(255),       -- Запасные детали	
  start_date date,                    -- Дата покупки
  capital_repair_date date            -- Период проведения капитальных ремонтов	
);

CREATE TABLE manufactories (
  id serial PRIMARY KEY,              -- № Цеха
  manufactory_name varchar(255),      -- Наименование цеха
  equipment_id int  REFERENCES equipments(equipment_id) ON DELETE SET NULL
);


CREATE TABLE raws(
  id serial PRIMARY KEY,
  rawName varchar(255),
  rawCost int,
  unitId int REFERENCES units(id) ON DELETE SET NULL
  -- volumeInWarehouse int
);

CREATE TABLE products(
  id serial PRIMARY KEY,
  product_name varchar(255),
  unit_id int REFERENCES units(id) ON DELETE SET NULL,
  raw_id int REFERENCES raws(id) ON DELETE SET NULL,
  raw_consumption int
);

CREATE TABLE specifications(
  id serial PRIMARY KEY,
  project_id int REFERENCES projects(project_id) ON DELETE SET NULL
  --docDate
);


CREATE TABLE specifications_items(
  id serial PRIMARY KEY,
  specification_id int REFERENCES specifications(id) ON DELETE SET NULL,
  product_id int REFERENCES products(id) ON DELETE SET NULL,
  product_count numeric,
  unit_id int REFERENCES units(id) ON DELETE SET NULL
);

 CREATE TABLE manufactories_produce_products (
   id serial PRIMARY KEY,
   manufactory_id int REFERENCES manufactories(id) ON DELETE SET NULL,
   product_id int REFERENCES products(id) ON DELETE SET NULL,
   time_to_produce int, 
   equipment_id int REFERENCES equipments(equipment_id) ON DELETE SET NULL
 );

CREATE TABLE technologic_map (
  equipment_id int REFERENCES equipments(equipment_id) ON DELETE SET NULL
  ,equipment_name  varchar(255)
  ,serial_code  varchar(255)
  ,complect_name  varchar(255)
  ,powers	int
  ,entred_from  varchar(255)
  ,transferred_to   varchar(255)
);

CREATE TABLE equipment_price (
  equipment_id int REFERENCES equipments(equipment_id) ON DELETE SET NULL
  ,equipment_name  varchar(255)
  ,equipment_power int
  ,equipment_price int
);

CREATE TABLE equipment_repair_list (
  equipment_id int REFERENCES equipments(equipment_id) ON DELETE SET NULL
  ,equipment_name varchar(255)
 	,serial_code varchar(255)
 	,powers int
	,repair_type varchar(255)
	,repair_date date
  ,repair_cost int
  ,maintenance_cost int
  ,rest_price int
);


CREATE TABLE reestr_completed_products (
  equipment_name varchar(255)
  ,serial_code int
  ,technologic_map_number int
  ,complect_name varchar(255)
  ,complect_price int
);


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
