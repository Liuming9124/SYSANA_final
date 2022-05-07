CREATE TABLE users(
    u_id INT AUTO_INCREMENT,
    email VARCHAR(50) UNIQUE,
    u_name VARCHAR(50) UNIQUE,
    password VARCHAR(256) NOT NULL,
    type VARCHAR(8) NOT NULL,
    
    PRIMARY KEY(u_id)
);

CREATE TABLE customer(
    u_id INT,
    c_name VARCHAR(50),
    c_phone VARCHAR(10) UNIQUE,
    
    PRIMARY KEY(u_id),
    FOREIGN KEY(u_id) REFERENCES USERS(u_id)
);

CREATE TABLE merchant(
    u_id INT,
    m_name VARCHAR(50),
    m_phone VARCHAR(10) UNIQUE,
    opening_hours DATETIME,
    delivery CHAR(1),
    manager_name VARCHAR(50),
    manager_phone VARCHAR(10),
    address_city VARCHAR(30),
    address_district VARCHAR(30),
    address_detail VARCHAR(50),
    
    PRIMARY KEY(u_id),
    FOREIGN KEY(u_id) REFERENCES users(u_id)
);

CREATE TABLE orders(
    o_id CHAR(6),
    c_id INT,
    m_id INT,
    order_time DATETIME NOT NULL,
    is_accepted CHAR(1) NOT NULL,
    accepted_time DATETIME,
    is_canceled CHAR(1) NOT NULL,
    canceled_time DATETIME,
    
    PRIMARY KEY(o_id, c_id, m_id),
    FOREIGN KEY(c_id) REFERENCES customer(u_id),
    FOREIGN KEY(m_id) REFERENCES merchant(u_id)
);

CREATE TABLE order_beverage(
    o_id CHAR(6) UNIQUE,
    b_id INT AUTO_INCREMENT,
    b_name VARCHAR(50) NOT NULL,
    sugar INT NOT NULL,
    ice INT NOT NULL,
    quantity INT NOT NULL,
    
    PRIMARY KEY(b_id, o_id),
    FOREIGN KEY(o_id) REFERENCES orders(o_id)
);

CREATE TABLE comments(
    c_id INT,
    m_id INT,
    id INT,
    stars INT,
    content TEXT,
    time DATETIME,
    
    PRIMARY KEY(c_id, m_id, id),
    FOREIGN KEY(m_id) REFERENCES merchant(u_id),
    FOREIGN KEY(c_id) REFERENCES customer(u_id)
);

CREATE TABLE menu_beverage(
    u_id INT,
    b_id INT UNIQUE AUTO_INCREMENT,
    b_name VARCHAR(50) NOT NULL,

    PRIMARY KEY(u_id, b_id),
    FOREIGN KEY(u_id) REFERENCES merchant(u_id)
);

CREATE TABLE ice_type(
    b_id INT,
    ice_value INT,

    PRIMARY KEY(b_id, ice_value),
    FOREIGN KEY(b_id) REFERENCES menu_beverage(b_id)
);

CREATE TABLE sugar_value(
    b_id INT,
    sugar_value INT,

    PRIMARY KEY(b_id, sugar_value),
    FOREIGN KEY(b_id) REFERENCES menu_beverage(b_id)
);

CREATE TABLE announcement(
    a_id INT,
    m_id INT,
    title VARCHAR(50),
    content TEXT NOT NULL,
    time DATETIME NOT NULL,
    
    PRIMARY KEY(a_id, m_id),
    FOREIGN KEY(m_id) REFERENCES merchant(u_id)
);