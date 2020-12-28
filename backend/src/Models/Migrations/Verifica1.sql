CREATE TABLE IMPIEGATO (
  CodImp INT AUTO_INCREMENT PRIMARY KEY,
  Cognome VARCHAR(20) NOT NULL,
  Nome VARCHAR(20) NOT NULL,
  CodDip INT,
  Stipendio INT NOT NULL,
  FOREIGN KEY (CodDip) REFERENCES DIPARTIMENTO (CodDip) ON DELETE CASCADE
);
CREATE TABLE DIPARTIMENTO (
  CodDip INT AUTO_INCREMENT PRIMARY KEY,
  Denominazione VARCHAR(20) NOT NULL,
  Citt à VARCHAR(20) NOT NULL
);
CREATE TABLE TURNO (
  CodImp INT AUTO_INCREMENT,
  Data DATE NOT NULL,
  OraI TIME NOT NULL,
  OraF TIME,
  PRIMARY KEY(CodImp, DATA),
  FOREIGN KEY (CodImp) REFERENCES IMPIEGATO(CodImp) ON DELETE CASCADE
);