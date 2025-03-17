CREATE TABLE catalog_type (
	id int(11) auto_increment NOT NULL,
	name varchar(70) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	description varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	date_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
	description_en varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	date_edit datetime NULL,
	create_by int(11) NULL,
	modify_by int(11) NULL,
	is_configurable tinyint(1) DEFAULT 0 NOT NULL,
	visualization tinyint(2) DEFAULT 0 NOT NULL,
	has_tree tinyint(1) DEFAULT 0 NOT NULL,
	is_folder tinyint(1) DEFAULT 0 NOT NULL,
	has_responsability tinyint(1) DEFAULT 0 NOT NULL,
	json_data longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	CONSTRAINT `PRIMARY` PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_unicode_ci
COMMENT='';

CREATE TABLE `catalog` (
	id int(11) auto_increment NOT NULL,
	id_catalog_type int(11) NOT NULL,
	id_gym int(11) NULL,
	description varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	name varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	create_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
	url varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	priority tinyint(2) NULL,
	id_parent_catalog int(11) NULL,
	url_img varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	description_en varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	create_by int(11) NULL,
	modify_date datetime NULL,
	modify_by int(11) NULL,
	dumy_property longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	visible tinyint(1) DEFAULT 1 NOT NULL,
	CONSTRAINT `PRIMARY` PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_unicode_ci
COMMENT='';
CREATE INDEX catalog_FK_1 USING BTREE ON `catalog` (create_by);
CREATE INDEX catalog_FK_3 USING BTREE ON `catalog` (modify_by);
CREATE INDEX fk_catalogo_1_idx USING BTREE ON `catalog` (id_parent_catalog);
CREATE INDEX fk_catalogo_empresa_idx USING BTREE ON `catalog` (id_gym);
CREATE INDEX fk_tipo_catalogo_catalogo_idx USING BTREE ON `catalog` (id_catalog_type);

ALTER TABLE `catalog` ADD CONSTRAINT catalog_FK FOREIGN KEY (id_catalog_type) REFERENCES catalog_type(id);
ALTER TABLE `catalog` CHANGE id_gym id_industry int(11) DEFAULT NULL NULL;
ALTER TABLE `catalog` ADD CONSTRAINT catalog_FK_1 FOREIGN KEY (id_industry) REFERENCES `catalog`(id);
ALTER TABLE `catalog` ADD CONSTRAINT catalog_FK_2 FOREIGN KEY (id_parent_catalog) REFERENCES `catalog`(id);

CREATE TABLE `user` (
	id int(11) auto_increment NOT NULL,
	id_user_type int(11) NULL,
	id_industry int(11) NULL,
	uuid varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	token longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	name varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	last_name varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	date_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`language` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT 'en' NOT NULL,
	last_session datetime NULL,
	password varchar(500) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	username varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
	second_last_name varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	is_active tinyint(4) DEFAULT 0 NOT NULL,
	url_img longtext CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	otp varchar(6) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	email varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	height varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	width varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL,
	CONSTRAINT `PRIMARY` PRIMARY KEY (id),
	CONSTRAINT user_FK FOREIGN KEY (id_user_type) REFERENCES `catalog`(id),
	CONSTRAINT user_FK_1 FOREIGN KEY (id_industry) REFERENCES `catalog`(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8
COLLATE=utf8_unicode_ci
COMMENT='';
CREATE INDEX fk_id_empresa_cat_idx USING BTREE ON `user` (id_industry);
CREATE INDEX fk_tipo_usuario_catalogo_idx USING BTREE ON `user` (id_user_type);

CREATE TABLE user_permissions (
	id int(11) auto_increment NOT NULL,
	id_user int(11) NOT NULL,
	root tinyint(1) DEFAULT 0 NOT NULL,
	all_permission tinyint(1) DEFAULT 0 NOT NULL,
	reports tinyint(1) DEFAULT 0 NOT NULL,
	catalogs tinyint(1) DEFAULT 0 NOT NULL,
	read_only tinyint(1) DEFAULT 0 NOT NULL,
	client tinyint(1) DEFAULT 0 NOT NULL,
	CONSTRAINT `PRIMARY` PRIMARY KEY (id),
	CONSTRAINT user_permissions_FK FOREIGN KEY (id_user) REFERENCES `user`(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci
COMMENT='';
CREATE INDEX fk_usuario_permisos_1_idx USING BTREE ON user_permissions (id_user);

CREATE TABLE rol_user (
	id int(11) auto_increment NOT NULL,
	id_rol int(11) NOT NULL,
	id_user int(11) NOT NULL,
	CONSTRAINT `PRIMARY` PRIMARY KEY (id),
	CONSTRAINT rol_user_FK FOREIGN KEY (id_rol) REFERENCES `catalog`(id),
	CONSTRAINT rol_user_FK_1 FOREIGN KEY (id_user) REFERENCES `user`(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci
COMMENT='';
CREATE INDEX rol_user_FK USING BTREE ON rol_user (id_rol);
CREATE INDEX rol_user_FK_1 USING BTREE ON rol_user (id_user);

CREATE TABLE rol_permission (
	id int(11) auto_increment NOT NULL,
	id_rol int(11) NOT NULL,
	id_menu int(11) NOT NULL,
	CONSTRAINT `PRIMARY` PRIMARY KEY (id),
	CONSTRAINT rol_permission_FK FOREIGN KEY (id_rol) REFERENCES `catalog`(id),
	CONSTRAINT rol_permission_FK_1 FOREIGN KEY (id_menu) REFERENCES `catalog`(id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci
COMMENT='';
CREATE INDEX rol_menu_FK USING BTREE ON rol_permission (id_rol);
CREATE INDEX rol_menu_FK_1 USING BTREE ON rol_permission (id_menu);

INSERT INTO catalog_type (name,description,date_at,description_en,date_edit,create_by,modify_by,is_configurable,visualization,has_tree,is_folder,has_responsability,json_data) VALUES
	 ('USER_TYPE','Perfiles de usuario','2023-06-25 00:06:56',NULL,NULL,NULL,NULL,0,0,0,0,0,NULL),
	 ('INDUSTRY','catalogo de consultorios afiliados','2023-06-25 00:06:56',NULL,NULL,NULL,NULL,0,0,0,0,0,NULL),
	 ('MENU','Menus de la aplicación','2023-10-03 00:00:50',NULL,NULL,NULL,NULL,0,0,0,0,0,NULL);

INSERT INTO `catalog` (id_catalog_type,id_industry,description,name,create_date,url,priority,id_parent_catalog,url_img,description_en,create_by,modify_date,modify_by,dumy_property,visible) VALUES
	 (1,NULL,'ROOT','ROOT','2023-07-18 16:05:05',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0),
	 (1,NULL,'Administrador','Administrador','2023-10-02 23:58:34',NULL,NULL,NULL,NULL,'Administrator',NULL,NULL,NULL,NULL,1),
	 (1,NULL,'Cliente','Cliente','2023-10-02 23:58:34',NULL,NULL,NULL,NULL,'Customer',NULL,NULL,NULL,NULL,1),
	 (3,NULL,'Inicio','Inicio','2023-10-02 23:58:34','home',NULL,NULL,'home','Home',NULL,NULL,NULL,'home',1),
	 (3,NULL,'Logo y Redes Sociales','Logo y Redes Sociales','2023-10-02 23:58:34',NULL,NULL,NULL,'face','Logo & Social Media',NULL,NULL,NULL,NULL,1),
	 (3,NULL,'Perfil y Sucursales','Perfil y Sucursales','2023-10-02 23:58:34',NULL,NULL,NULL,'spa','Profile and branches',NULL,NULL,NULL,NULL,1);

INSERT INTO `user` (id_user_type,id_industry,uuid,token,name,last_name,date_at,`language`,last_session,password,username,second_last_name,is_active,url_img,otp,email,height,width) VALUES
	 (3,NULL,NULL,'null','ROOT','ROOT','2023-04-25 10:37:41','en','2023-08-09 15:30:07','81f336ea4a4e74f95ac8682c3cfca926e775857703548b211b985817','ROOT','ROOT',1,NULL,NULL,NULL,NULL,NULL);

INSERT INTO catalog_type (name,description,date_at,description_en,date_edit,create_by,modify_by,is_configurable,visualization,has_tree,is_folder,has_responsability,json_data) VALUES
	 ('MEDICINE','Catalogo de medicinas','2023-10-03 00:00:50',NULL,NULL,NULL,NULL,1,1,0,0,0,'"{\\"image\\":\\"images/paypal.png\\",\\"es\\":\\"Medicinas\\",\\"en\\":\\"Medicines\\"}"');

INSERT INTO medic_app.rol_permission (id_rol,id_menu)
	VALUES (1,4);
INSERT INTO medic_app.rol_permission (id_rol,id_menu)
	VALUES (1,5);
INSERT INTO medic_app.rol_permission (id_rol,id_menu)
	VALUES (1,6);
