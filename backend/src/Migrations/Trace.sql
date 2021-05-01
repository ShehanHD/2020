CREATE TABLE pages(
  site_id VARCHAR(50) NOT NULL,
  page_name VARCHAR(50) NOT NULL,
  page_data LONGTEXT,
  PRIMARY KEY (site_id, page_name)
);
CREATE TABLE trace(
  ip VARCHAR(16) NOT NULL,
  country_name VARCHAR(20),
  city VARCHAR(20),
  zip VARCHAR(10),
  country_flag VARCHAR(255),
  latitude DOUBLE,
  longitude DOUBLE,
  visited_site VARCHAR(50),
  visited_page VARCHAR(50),
  FOREIGN KEY (visited_site, visited_page) REFERENCES pages(site_id, page_name)
);