CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOL NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS site (
        site_id VARCHAR(255) NOT NULL PRIMARY KEY,
        url VARCHAR(50) NOT NULL UNIQUE,
        user_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS page (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_name VARCHAR(20) NOT NULL,
        page_data LONGTEXT NOT NULL,
        site_id VARCHAR(255) NOT NULL,
        FOREIGN KEY (site_id) REFERENCES site(site_id)
);

CREATE TABLE IF NOT EXISTS trace (
         id INT AUTO_INCREMENT PRIMARY KEY,
         ip VARCHAR(50) NOT NULL,
         visited_at DATETIME NOT NULL DEFAULT NOW(),
         country_name VARCHAR(50) NOT NULL,
         city VARCHAR(50) NOT NULL,
         zip VARCHAR(20) NOT NULL,
         latitude DOUBLE NOT NULL,
         longitude DOUBLE NOT NULL,
         visited_site VARCHAR(255) NOT NULL,
         visited_page INT NOT NULL
);