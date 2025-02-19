-- MySQL Script generated by MySQL Workbench
-- mar 15 oct 2024 09:49:27
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dbPIEC
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `dbPIEC` ;

-- -----------------------------------------------------
-- Schema dbPIEC
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dbPIEC` DEFAULT CHARACTER SET utf8mb4 ;
USE `dbPIEC` ;

-- -----------------------------------------------------
-- Table `dbPIEC`.`alumnos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`alumnos` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`alumnos` (
  `boleta` INT(11) NOT NULL,
  `nombres_Al` VARCHAR(45) NOT NULL,
  `apellidoP_Al` VARCHAR(30) NOT NULL,
  `apellidoM_Al` VARCHAR(30) NULL DEFAULT NULL,
  `contraseña_Al` VARCHAR(60) NOT NULL,
  `correoRec_Al` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`boleta`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`docentes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`docentes` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`docentes` (
  `noTrabajador` INT(11) NOT NULL,
  `nombres_Do` VARCHAR(45) NOT NULL,
  `apellidoP_Do` VARCHAR(30) NOT NULL,
  `apellidoM_Do` VARCHAR(30) NULL DEFAULT NULL,
  `contraseña_Do` VARCHAR(60) NOT NULL,
  `correoRec_Do` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`noTrabajador`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`materias`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`materias` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`materias` (
  `idmaterias` INT(11) NOT NULL AUTO_INCREMENT,
  `material` VARCHAR(70) NULL DEFAULT NULL,
  PRIMARY KEY (`idmaterias`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;

ALTER TABLE materias MODIFY material VARCHAR(70) COLLATE utf8_general_ci;
-- -----------------------------------------------------
-- Table `dbPIEC`.`grupos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`grupos`;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`grupos` (
  `g_idmaterias` INT(11) NOT NULL,
  `g_doc_noTrabajador` INT(11),
  `idgrupos` VARCHAR(13) NOT NULL,
  `fechin` DATE NOT NULL,
  `fechfin` DATE NOT NULL,
  PRIMARY KEY (`g_idmaterias`, `idgrupos`),
  INDEX `fk_grupos_docentes1_idx` (`g_doc_noTrabajador` ASC),
  INDEX `grupos_g_doc_no_trabajador` (`g_doc_noTrabajador` ASC),
  CONSTRAINT `fk_grupos_docentes1`
    FOREIGN KEY (`g_doc_noTrabajador`)
    REFERENCES `dbPIEC`.`docentes` (`noTrabajador`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_grupos_materias1`
    FOREIGN KEY (`g_idmaterias`)
    REFERENCES `dbPIEC`.`materias` (`idmaterias`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`tareas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`tareas` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`tareas` (
  `idtareas` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha_Entrega` DATETIME NOT NULL,
  `titulo_T` VARCHAR(255) NOT NULL,
  `descripción_T` LONGTEXT NOT NULL,
  `ta_idmaterias` INT(11) NOT NULL,
  `ta_idgrupos` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`idtareas`),
  INDEX `fk_tareas_grupos1_idx` (`ta_idmaterias` ASC, `ta_idgrupos` ASC) ,
  INDEX `tareas_ta_idmaterias_ta_idgrupos` (`ta_idmaterias` ASC, `ta_idgrupos` ASC) ,
  CONSTRAINT `fk_tareas_grupos1`
    FOREIGN KEY (`ta_idmaterias` , `ta_idgrupos`)
    REFERENCES `dbPIEC`.`grupos` (`g_idmaterias` , `idgrupos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`entregas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`entregas` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`entregas` (
  `e_idtareas` INT(11) NOT NULL,
  `e_boleta` INT(11) NOT NULL,
  `calificación` FLOAT NULL DEFAULT NULL,
  `e_fecha` DATETIME NOT NULL,
  PRIMARY KEY (`e_idtareas`, `e_boleta`),
  INDEX `fk_tareas_has_alumnos_alumnos1_idx` (`e_boleta` ASC) ,
  INDEX `fk_tareas_has_alumnos_tareas1_idx` (`e_idtareas` ASC) ,
  INDEX `entregas_e_boleta` (`e_boleta` ASC) ,
  INDEX `entregas_e_idtareas_e_idgrupos` (`e_idtareas` ASC) ,
  CONSTRAINT `fk_tareas_has_alumnos_alumnos1`
    FOREIGN KEY (`e_boleta`)
    REFERENCES `dbPIEC`.`alumnos` (`boleta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tareas_has_alumnos_tareas1`
    FOREIGN KEY (`e_idtareas`)
    REFERENCES `dbPIEC`.`tareas` (`idtareas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`Comentarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`Comentarios` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`Comentarios` (
  `idComentarios` INT(11) NOT NULL AUTO_INCREMENT,
  `Comentario` LONGTEXT NOT NULL,
  `c_fecha` DATETIME NOT NULL,
  `doc_al` VARCHAR(1) NOT NULL,
  `c_idtareas` INT(11) NOT NULL,
  `c_boleta` INT(11) NOT NULL,
  PRIMARY KEY (`idComentarios`, `c_idtareas`, `c_boleta`),
  INDEX `fk_Comentarios_entregas1_idx` (`c_idtareas` ASC, `c_boleta` ASC) ,
  CONSTRAINT `fk_Comentarios_entregas1`
    FOREIGN KEY (`c_idtareas` , `c_boleta`)
    REFERENCES `dbPIEC`.`entregas` (`e_idtareas` , `e_boleta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`avisos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`avisos` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`avisos` (
  `idAviso` INT(11) NOT NULL AUTO_INCREMENT,
  `aviso` LONGTEXT NOT NULL,
  `a_fecha` DATETIME NOT NULL,
  `av_idmaterias` INT(11) NOT NULL,
  `av_idgrupos` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`idAviso`, `av_idmaterias`, `av_idgrupos`),
  INDEX `fk_avisos_grupos1_idx` (`av_idmaterias` ASC, `av_idgrupos` ASC) ,
  INDEX `avisos_av_idmaterias_av_idgrupos` (`av_idmaterias` ASC, `av_idgrupos` ASC) ,
  CONSTRAINT `fk_avisos_grupos1`
    FOREIGN KEY (`av_idmaterias` , `av_idgrupos`)
    REFERENCES `dbPIEC`.`grupos` (`g_idmaterias` , `idgrupos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`documentos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`documentos` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`documentos` (
  `iddocumentos` INT(11) NOT NULL AUTO_INCREMENT,
  `dircción_D` LONGTEXT NOT NULL,
  `nombre_D` VARCHAR(200) NOT NULL,
  `d_idtareas` INT(11) NOT NULL,
  `d_boleta` INT(11) NOT NULL,
  PRIMARY KEY (`iddocumentos`, `d_idtareas`, `d_boleta`),
  INDEX `fk_documentos_entregas1_idx` (`d_idtareas` ASC, `d_boleta` ASC) ,
  CONSTRAINT `fk_documentos_entregas1`
    FOREIGN KEY (`d_idtareas` , `d_boleta`)
    REFERENCES `dbPIEC`.`entregas` (`e_idtareas` , `e_boleta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`grabaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`grabaciones` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`grabaciones` (
  `idgrabaciones` INT(11) NOT NULL AUTO_INCREMENT,
  `dirección_G` LONGTEXT NOT NULL,
  `titulo_G` VARCHAR(100) NOT NULL,
  `g_fecha` DATETIME NOT NULL,
  `gr_idmaterias` INT(11) NOT NULL,
  `gr_idgrupos` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`idgrabaciones`, `gr_idmaterias`, `gr_idgrupos`),
  INDEX `fk_grabaciones_grupos1_idx` (`gr_idmaterias` ASC, `gr_idgrupos` ASC) ,
  INDEX `grabaciones_gr_idmaterias_gr_idgrupos` (`gr_idmaterias` ASC, `gr_idgrupos` ASC) ,
  CONSTRAINT `fk_grabaciones_grupos1`
    FOREIGN KEY (`gr_idmaterias` , `gr_idgrupos`)
    REFERENCES `dbPIEC`.`grupos` (`g_idmaterias` , `idgrupos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`grupos_alumnos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`grupos_alumnos` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`grupos_alumnos` (
  `ga_idmaterias` INT(11) NOT NULL,
  `ga_idgrupos` VARCHAR(13) NOT NULL,
  `ga_boleta` INT(11) NOT NULL,
  PRIMARY KEY (`ga_idmaterias`, `ga_idgrupos`, `ga_boleta`),
  INDEX `fk_grupos_has_alumnos_alumnos1_idx` (`ga_boleta` ASC) ,
  INDEX `fk_grupos_has_alumnos_grupos1_idx` (`ga_idmaterias` ASC, `ga_idgrupos` ASC) ,
  INDEX `grupos_alumnos_ga_boleta` (`ga_boleta` ASC) ,
  INDEX `grupos_alumnos_ga_idmaterias_ga_idgrupos` (`ga_idmaterias` ASC, `ga_idgrupos` ASC) ,
  CONSTRAINT `fk_grupos_has_alumnos_alumnos1`
    FOREIGN KEY (`ga_boleta`)
    REFERENCES `dbPIEC`.`alumnos` (`boleta`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_grupos_has_alumnos_grupos1`
    FOREIGN KEY (`ga_idmaterias` , `ga_idgrupos`)
    REFERENCES `dbPIEC`.`grupos` (`g_idmaterias` , `idgrupos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`horarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`horarios` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`horarios` (
  `idHorarios` INT(11) NOT NULL AUTO_INCREMENT,
  `dia` VARCHAR(11) NOT NULL,
  `entrada` TIME NULL,
  `salida` TIME NULL,
  `ho_idmaterias` INT(11) NOT NULL,
  `ho_idgrupos` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`idHorarios`, `ho_idmaterias`, `ho_idgrupos`),
  INDEX `fk_horarios_grupos1_idx` (`ho_idmaterias` ASC, `ho_idgrupos` ASC) ,
  INDEX `horarios_ho_idmaterias_ho_idgrupos` (`ho_idmaterias` ASC, `ho_idgrupos` ASC) ,
  CONSTRAINT `fk_horarios_grupos1`
    FOREIGN KEY (`ho_idmaterias` , `ho_idgrupos`)
    REFERENCES `dbPIEC`.`grupos` (`g_idmaterias` , `idgrupos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`videos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`videos` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`videos` (
  `idvideos` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo_V` VARCHAR(200) NOT NULL,
  `dirección_V` LONGTEXT NOT NULL,
  `v_boleta` INT(11) NOT NULL,
  `v_idmaterias` INT(11) NOT NULL,
  PRIMARY KEY (`idvideos`, `v_boleta`, `v_idmaterias`),
  INDEX `fk_videos_alumnos1_idx` (`v_boleta` ASC) ,
  INDEX `fk_videos_materias1_idx` (`v_idmaterias` ASC) ,
  INDEX `videos_v_boleta` (`v_boleta` ASC) ,
  INDEX `videos_v_idmaterias` (`v_idmaterias` ASC) ,
  CONSTRAINT `fk_videos_alumnos1`
    FOREIGN KEY (`v_boleta`)
    REFERENCES `dbPIEC`.`alumnos` (`boleta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_videos_materias1`
    FOREIGN KEY (`v_idmaterias`)
    REFERENCES `dbPIEC`.`materias` (`idmaterias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `dbPIEC`.`avisosDocumentos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`avisosDocumentos` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`avisosDocumentos` (
  `idavisosDocumentos` INT NOT NULL AUTO_INCREMENT,
  `dirección_AD` LONGTEXT NOT NULL,
  `nombre_AD` VARCHAR(200) NOT NULL,
  `avD_idAviso` INT(11) NOT NULL,
  `avD_idmaterias` INT(11) NOT NULL,
  `avD_idgrupos` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`idavisosDocumentos`, `avD_idAviso`, `avD_idmaterias`, `avD_idgrupos`),
  INDEX `fk_avisosDocumentos_avisos1_idx` (`avD_idAviso` ASC, `avD_idmaterias` ASC, `avD_idgrupos` ASC) ,
  CONSTRAINT `fk_avisosDocumentos_avisos1`
    FOREIGN KEY (`avD_idAviso` , `avD_idmaterias` , `avD_idgrupos`)
    REFERENCES `dbPIEC`.`avisos` (`idAviso` , `av_idmaterias` , `av_idgrupos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `dbPIEC`.`documentosTareas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dbPIEC`.`documentosTareas` ;

CREATE TABLE IF NOT EXISTS `dbPIEC`.`documentosTareas` (
  `iddocumentosTareas` INT NOT NULL AUTO_INCREMENT,
  `dirección_DT` LONGTEXT NOT NULL,
  `nombre_DT` VARCHAR(200) NOT NULL,
  `dt_idtareas` INT(11) NOT NULL,
  PRIMARY KEY (`iddocumentosTareas`, `dt_idtareas`),
  INDEX `fk_documentosTareas_tareas1_idx` (`dt_idtareas` ASC) ,
  CONSTRAINT `fk_documentosTareas_tareas1`
    FOREIGN KEY (`dt_idtareas`)
    REFERENCES `dbPIEC`.`tareas` (`idtareas`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
