CREATE TABLE CATEGORY (
  id_category    int(10) NOT NULL, 
  category_label varchar(20) NOT NULL UNIQUE, 
  PRIMARY KEY (id_category)) CHARACTER SET UTF8;
  
CREATE TABLE SHOP (
  id_shop          int(10) NOT NULL, 
  shop_name        varchar(20) NOT NULL, 
  shop_location    int(50) NOT NULL, 
  shop_city        varchar(20) NOT NULL, 
  shop_contact_1   varchar(15) NOT NULL UNIQUE, 
  shop_contact_2   varchar(15) UNIQUE, 
  shop_description varchar(255), 
  id_category      int(10) NOT NULL, 
  id_user          int(10) NOT NULL, 
  id_gallery       int(10) NOT NULL, 
  PRIMARY KEY (id_shop)) CHARACTER SET UTF8;

CREATE TABLE PICTURES (
  id_picture        int(10) NOT NULL, 
  picture_file_name varchar(255) NOT NULL, 
  id_gallery        int(10) NOT NULL, 
  PRIMARY KEY (id_picture), 
  UNIQUE INDEX (picture_file_name), 
  INDEX (id_gallery)) CHARACTER SET UTF8;

CREATE TABLE GALLERY (
  id_gallery int(10) NOT NULL, 
  PRIMARY KEY (id_gallery)) CHARACTER SET UTF8;

CREATE TABLE `USER` (
  id_user         int(10) NOT NULL, 
  user_name       varchar(20) NOT NULL, 
  user_first_name varchar(20) NOT NULL, 
  id_admin        int(10) NOT NULL, 
  PRIMARY KEY (id_user)) CHARACTER SET UTF8;

CREATE TABLE PROMOTION (
  id_promotion            int(10) NOT NULL, 
  promotion_start_date    datetime DEFAULT CURRENT_TIMESTAMP NOT NULL, 
  promotion_end_date      datetime DEFAULT CURRENT_TIMESTAMP NOT NULL, 
  promotion_price         int(10) NOT NULL, 
  promotion_pay_telephone varchar(10) NOT NULL, 
  promotion_is_active     tinyint(1) DEFAULT 1 NOT NULL, 
  PRIMARY KEY (id_promotion)) CHARACTER SET UTF8;

CREATE TABLE PROMOTION_DETAILS (
  id_promotion int(10) NOT NULL, 
  id_shop      int(10) NOT NULL, 
  id_account   int(10) NOT NULL, 
  id_gallery   int(10) NOT NULL, 
  PRIMARY KEY (id_promotion, 
  id_shop, 
  id_account, 
  id_gallery), 
  INDEX (id_promotion), 
  INDEX (id_shop), 
  INDEX (id_account)) CHARACTER SET UTF8;

CREATE TABLE ACCOUNT (
  id_account            int(10) NOT NULL, 
  account_telephone     varchar(20) NOT NULL UNIQUE, 
  account_password      varchar(255) NOT NULL, 
  account_creation_date date DEFAULT CURRENT_TIMESTAMP NOT NULL, 
  account_is_online     tinyint(1) DEFAULT 0 NOT NULL, 
  account_referrer_code varchar(10), 
  account_referrer      int(10) NOT NULL, 
  id_user               int(10) NOT NULL, 
  PRIMARY KEY (id_account), 
  INDEX (account_referrer)) CHARACTER SET UTF8;

CREATE TABLE ADMINS (
  id_admin         int(10) NOT NULL, 
  accessible_scope varchar(255) NOT NULL, 
  PRIMARY KEY (id_admin)) CHARACTER SET UTF8;

CREATE TABLE SETUP (
  setup_ver         int(10) NOT NULL AUTO_INCREMENT, 
  setup_insert_date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL, 
  setup_content     text NOT NULL, 
  PRIMARY KEY (setup_ver)) CHARACTER SET UTF8;

CREATE TABLE REVIEWS (
  id_review      int(10) NOT NULL, 
  review_rating  double NOT NULL, 
  review_comment varchar(255) NOT NULL, 
  id_user        int(10) NOT NULL, 
  id_shop        int(10) NOT NULL, 
  PRIMARY KEY (id_review)) CHARACTER SET UTF8;

CREATE TABLE SUBSCRIPTION (
  id_subscription            int(10) NOT NULL, 
  subscription_start_date    date NOT NULL, 
  subscription_end_date      date NOT NULL, 
  subscription_price         int(10) NOT NULL, 
  subscription_pay_telephone varchar(10) NOT NULL, 
  subscription_is_active     tinyint(1) DEFAULT 1 NOT NULL, 
  id_account                 int(10) NOT NULL, 
  PRIMARY KEY (id_subscription)) CHARACTER SET UTF8;
  
ALTER TABLE SHOP ADD CONSTRAINT FKSHOP82595 FOREIGN KEY (id_category) REFERENCES CATEGORY (id_category);
ALTER TABLE PICTURES ADD CONSTRAINT FKPICTURES224806 FOREIGN KEY (id_gallery) REFERENCES GALLERY (id_gallery);
ALTER TABLE SHOP ADD CONSTRAINT FKSHOP99897 FOREIGN KEY (id_user) REFERENCES `USER` (id_user);
ALTER TABLE PROMOTION_DETAILS ADD CONSTRAINT FKPROMOTION_130649 FOREIGN KEY (id_shop) REFERENCES SHOP (id_shop);
ALTER TABLE PROMOTION_DETAILS ADD CONSTRAINT FKPROMOTION_688152 FOREIGN KEY (id_account) REFERENCES ACCOUNT (id_account);
ALTER TABLE PROMOTION_DETAILS ADD CONSTRAINT FKPROMOTION_662930 FOREIGN KEY (id_promotion) REFERENCES PROMOTION (id_promotion);
ALTER TABLE `USER` ADD CONSTRAINT FKUSER645165 FOREIGN KEY (id_admin) REFERENCES ADMINS (id_admin);
ALTER TABLE PROMOTION_DETAILS ADD CONSTRAINT FKPROMOTION_269824 FOREIGN KEY (id_gallery) REFERENCES GALLERY (id_gallery);
ALTER TABLE SHOP ADD CONSTRAINT FKSHOP261685 FOREIGN KEY (id_gallery) REFERENCES GALLERY (id_gallery);
ALTER TABLE REVIEWS ADD CONSTRAINT FKREVIEWS293411 FOREIGN KEY (id_user) REFERENCES `USER` (id_user);
ALTER TABLE REVIEWS ADD CONSTRAINT FKREVIEWS83876 FOREIGN KEY (id_shop) REFERENCES SHOP (id_shop);
ALTER TABLE SUBSCRIPTION ADD CONSTRAINT FKSUBSCRIPTI190862 FOREIGN KEY (id_account) REFERENCES ACCOUNT (id_account);
ALTER TABLE ACCOUNT ADD CONSTRAINT FKACCOUNT883268 FOREIGN KEY (account_referrer) REFERENCES `USER` (id_user);
ALTER TABLE ACCOUNT ADD CONSTRAINT FKACCOUNT980911 FOREIGN KEY (id_user) REFERENCES `USER` (id_user);
