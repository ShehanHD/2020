    CREATE TABLE IF NOT EXISTS categories(
                category_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                user_id VARCHAR(10) DEFAULT NULL
                );

    CREATE TABLE IF NOT EXISTS sub_categories(
                name VARCHAR(50) NOT NULL,
                category_id INT NOT NULL,
                PRIMARY KEY(name, category_id),
                FOREIGN KEY (category_id) REFERENCES categories(category_id)
                );

    CREATE TABLE IF NOT EXISTS todos(
                todos_id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                category_id INT NOT NULL,
                sub_name VARCHAR(50) NOT NULL,
                is_done BIT  DEFAULT 0,
                user_id VARCHAR(10) DEFAULT NULL,
                FOREIGN KEY (category_id) REFERENCES categories(category_id),
                FOREIGN KEY (sub_name, category_id) REFERENCES sub_categories(name, category_id)
                );

    ALTER TABLE todos ADD created_on DATETIME DEFAULT NULL;

    ALTER TABLE todos ADD finished_on DATETIME DEFAULT NULL;