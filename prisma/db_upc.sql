

select * from  calendar;



CREATE TABLE calendar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo_calendar ENUM('PUBLICO', 'GRUPO', 'PRIVADO') DEFAULT 'PRIVADO' NOT NULL,
  user_id CHAR(8) NULL,
  name VARCHAR(120) NOT NULL,
  color VARCHAR(20) DEFAULT '#ffffff',
  is_activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `event` (
  `id_event` int NOT NULL AUTO_INCREMENT,
  `calendar_id` int NOT NULL,
  `tipo_event_id` int NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `oficina` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `user_id` char(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `all_day` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_created_event` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT (true),
  PRIMARY KEY (`id_event`),
  KEY `calendar_id` (`calendar_id`),
  KEY `tipo_event_id` (`tipo_event_id`),
  CONSTRAINT `event_ibfk_1` FOREIGN KEY (`calendar_id`) REFERENCES `calendar` (`id`) ON DELETE CASCADE,
  CONSTRAINT `tipo_event_ibfk_1` FOREIGN KEY (`tipo_event_id`) REFERENCES `tipo_event` (`id_tipo_event`)
);

CREATE TABLE tipo_event (
  id_tipo_event INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT,
  event_type ENUM('FIJO', 'EVENTO') DEFAULT 'EVENTO' NOT NULL,
  color_hex VARCHAR(7) DEFAULT '#ffffff',
  img_url TEXT,
  icono_url TEXT,
  event_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES event (id_event)
);



CREATE TABLE event_fijo (
  id_event_fijo INT AUTO_INCREMENT PRIMARY KEY,
  calendar_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  month INT NOT NULL,
  day INT NOT NULL,
	tipo_event_id int NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (calendar_id) REFERENCES calendar (id) ON DELETE CASCADE,
  FOREIGN KEY (tipo_event_id) REFERENCES tipo_event (id_tipo_event) ON DELETE CASCADE
);






CREATE TABLE tipo_comunicado (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL, -- 'urgente', 'informativo', etc.
  descripcion TEXT, -- opcional: explicación del tipo
  color_hex VARCHAR(7), -- opcional: para el frontend (ej. #FF0000)
  icono_url TEXT -- opcional: ícono representativo
);

CREATE TABLE comunicados (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  descripcion_corta TEXT,
  descripcion_larga TEXT,
  imagen_url TEXT,
  miniatura_url TEXT,
  audio_url TEXT,
  fecha_inicio DATETIME,
  fecha_fin DATETIME,
  fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  registrado_por VARCHAR(100),
  activo TINYINT(1) DEFAULT 1,
  destacado TINYINT(1) DEFAULT 0,
  orden INT DEFAULT 0,
  tipo_id INT,
  FOREIGN KEY (tipo_id) REFERENCES tipo_comunicado (id)
);