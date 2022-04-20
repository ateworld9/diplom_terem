CREATE TABLE users (
  	user_id serial PRIMARY KEY,
  	email varchar(255) UNIQUE NOT NULL,
	password varchar(255) NOT NULL,
 	isActivated boolean DEFAULT FALSE,
	activationLink varchar(255)
)

CREATE TABLE tokens (
  token_id serial PRIMARY KEY,
  user_id integer REFERENCES users(user_id) ON DELETE SET NULL,
  refresh_token varchar(255)
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
,('Проекты с мансардой', 'proekty-s-mansardoy', '1 200 000', 'images/catalogue/with_mansarda.jpg')

CREATE TABLE projects2category (
	project_id integer REFERENCES projects(project_id) ON DELETE SET NULL,
	category_id integer REFERENCES categories(category_id) ON DELETE SET NULL
)

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
(10,9)


CREATE TABLE orders (
	order_id serial PRIMARY KEY,
	customer_fio varchar(255),
	project_id varchar(255) REFERENCES projects ON DELETE SET NULL,
);

/*
DROP TABLE IF EXISTS projects2category;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS projects;

DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS users;
*/
