

CREATE TABLE users(
    email VARCHAR(40) NOT NULL,
    username  VARCHAR(20) NOT NULL,
    userpassword  VARCHAR(20) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    useraddr VARCHAR(50) NOT NULL,
    point INT,
    PRIMARY KEY(email)
);

CREATE TABLE product(
    book_id VARCHAR(20) NOT NULL,
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
    FOREIGN KEY(email) REFERENCES users(email),
);

CREATE TABLE changes(
    email VARCHAR(40) NOT NULL,
    ch_name VARCHAR(20) NOT NULL,
    ch_author VARCHAR(20) NOT NULL,
    ch_status VARCHAR(5) NOT NULL,
    ch_judge VARCHAR(3) NOT NULL,
    ch_bookid INT AUTO_INCREMENT,
    PRIMARY KEY(ch_bookid),
    FOREIGN KEY(email) REFERENCES users(email)
);

CREATE TABLE reduce(
    email VARCHAR(40) NOT NULL,
    re_name VARCHAR(20) NOT NULL,
    re_author VARCHAR(20) NOT NULL,
    re_status VARCHAR(5) NOT NULL,
    re_judge VARCHAR(3) NOT NULL,
    re_point INT NOT NULL,
    re_price INT NOT NULL,
    re_bookid INT AUTO_INCREMENT,
    PRIMARY KEY(re_bookid),
    FOREIGN KEY(email) REFERENCES users(email)
);

CREATE TABLE orders(
    email VARCHAR(40) NOT NULL,
    order_id INT AUTO_INCREMENT,
    order_name VARCHAR(20) NOT NULL,
    order_address VARCHAR(50) NOT NULL,
    order_phone VARCHAR(15) NOT NULL,
    order_payamount INT NOT NULL,
    PRIMARY KEY(order_id),
    FOREIGN KEY(email) REFERENCES users(email)
);

CREATE TABLE ordersinformation(
    email VARCHAR(40) NOT NULL,
    order_id INT AUTO_INCREMENT,
    book_id VARCHAR(20) NOT NULL,
    PRIMARY KEY(order_id),
    FOREIGN KEY(email) REFERENCES users(email),
    FOREIGN KEY(order_id) REFERENCES orders(order_id),
    FOREIGN KEY(book_id) REFERENCES product(book_id)
);
