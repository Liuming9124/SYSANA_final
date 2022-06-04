

CREATE TABLE users(
    email VARCHAR(40) NOT NULL,
    username  VARCHAR(20) NOT NULL,
    userpassword  VARCHAR(20) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    useraddr VARCHAR(50) NOT NULL,
    punch Datetime,
    point INT,
    PRIMARY KEY(email)
);

CREATE TABLE product(
    book_id INT AUTO_INCREMENT,
    book_name VARCHAR(20) NOT NULL,
    book_img VARCHAR(50) NOT NULL,
    book_author VARCHAR(20) NOT NULL,
    book_price INT NOT NULL,
    book_intro VARCHAR(500),
    book_type VARCHAR(10) NOT NULL,
    PRIMARY KEY(book_id)
);

CREATE TABLE cart(
    email VARCHAR(40) NOT NULL,
    book_price INT NOT NULL,
    book_author VARCHAR(20) NOT NULL,
    book_id VARCHAR(20),
    number INT,
    PRIMARY KEY(book_id),
    FOREIGN KEY(email) REFERENCES users(email)
);


CREATE TABLE collect(
    email VARCHAR(40) NOT NULL,
    book_id VARCHAR(20) NOT NULL,
    book_price INT NOT NULL,
    book_author VARCHAR(20) NOT NULL,
    PRIMARY KEY(book_id),
    FOREIGN KEY(email) REFERENCES users(email)
);

CREATE TABLE changes(
    ch_id INT AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL,
    ch_name VARCHAR(15) NOT NULL,
    ch_address VARCHAR(30) NOT NULL,
    ch_bname VARCHAR(20) NOT NULL,
    ch_bauthor VARCHAR(20) NOT NULL,
    ch_bstatus VARCHAR(10) NOT NULL,
    ch_bprice VARCHAR(10) NOT NULL,
    ch_judge tinyINt (1),
    ch_complete INT,
    ch_reason VARCHAR(30),
    PRIMARY KEY(ch_id),
    FOREIGN KEY(email) REFERENCES users(email)
);

CREATE TABLE reduce(
    re_id INT AUTO_INCREMENT,
    email VARCHAR(40) NOT NULL,
    re_name VARCHAR(20) NOT NULL,
    re_author VARCHAR(20) NOT NULL,
    re_price INT NOT NULL,
    re_status VARCHAR(5) NOT NULL,
    re_point INT NOT NULL,
    re_judge VARCHAR(3) NOT NULL,
    PRIMARY KEY(re_id),
    FOREIGN KEY(email) REFERENCES users(email)
);

CREATE TABLE orders(
    email VARCHAR(40) NOT NULL,
    order_id INT AUTO_INCREMENT,
    order_name VARCHAR(20) NOT NULL,
    order_address VARCHAR(50) NOT NULL,
    order_phone VARCHAR(15) NOT NULL,
    order_payment VARCHAR(15) NOT NULL,
    order_delpoint INT ,
    order_status tinyINt(1),
    PRIMARY KEY(order_id),
    FOREIGN KEY(email) REFERENCES users(email)
);

CREATE TABLE ordersinformation(
    email VARCHAR(40) NOT NULL,
    order_id INT AUTO_INCREMENT,
    book_id INT NOT NULL,
    FOREIGN KEY(email) REFERENCES users(email),
    FOREIGN KEY(order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY(book_id) REFERENCES product(book_id)
);
CREATE TABLE wish(
    email VARCHAR(40) NOT NULL,
    wish_id INT AUTO_INCREMENT,
    wish_name VARCHAR(20) NOT NULL,
    wish_author VARCHAR(20) NOT NULL,
    wish_total int NOT NULL,
    wish_judge int(1) NOT NULL,
    PRIMARY KEY(wish_id),
    FOREIGN KEY(email) REFERENCES users(email)
   
);