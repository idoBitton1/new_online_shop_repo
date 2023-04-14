CREATE DATABASE shop_me_online;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4(),
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    password VARCHAR(25) NOT NULL,
    address VARCHAR(100),
    email VARCHAR(50) NOT NULL,
    credit_card_number VARCHAR(16),
    is_manager BOOLEAN NOT NULL,
    token VARCHAR,
    PRIMARY KEY (id),
    CONSTRAINT chk_credit CHECK (char_length(credit_card_number) = 16),
    CONSTRAINT chk_password CHECK (char_length(password) >= 8),
    CONSTRAINT email_unq UNIQUE(email)
);

CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4(),
    name VARCHAR(60) NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    category VARCHAR(100) NOT NULL,
    img_location VARCHAR(100) NOT NULL,
    img_uploaded Boolean DEFAULT false,
    CONSTRAINT chk_quantity CHECK (quantity >= 0),
    CONSTRAINT chk_price CHECK (price > 0),
    PRIMARY KEY (id)
);

CREATE TABLE transactions (
    id UUID DEFAULT uuid_generate_v4(),
    address VARCHAR(100) NOT NULL,
    paid BOOLEAN NOT NUll, 
    ordering_time TIMESTAMP NOT NULL,
    user_id UUID NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

CREATE TABLE cart (
    item_id UUID,
    transaction_id UUID NOT NULL,
    product_id UUID NOT NULL,
    amount INTEGER NOT NULL,
    size VARCHAR(3) NOT NULL,
    CONSTRAINT chk_amount CHECK (amount > 0),
    CONSTRAINT fk_transaction FOREIGN KEY(transaction_id) REFERENCES transactions(id),
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id),
    PRIMARY KEY (item_id)
);

CREATE TABLE wishlist (
    user_id UUID NOT NULL,
    product_id UUID NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id)
);


CREATE FUNCTION get_transactions()
returns table (
id UUID,
address TEXT,
ordering_time TIMESTAMP,
sum Int
) as $$
SELECT id,address,ordering_time, SUM(cart.amount) FROM cart, transactions WHERE paid=true AND cart.transaction_id=transactions.id GROUP BY transactions.id;
$$ language sql stable;


CREATE FUNCTION get_user_wishlist(_user_id UUID)
returns setof wishlist as $$
SELECT * FROM wishlist WHERE user_id=_user_id;
$$ language sql stable;


CREATE FUNCTION check_for_credit_card(_id UUID)
returns BOOLEAN as $$
SELECT EXISTS(SELECT 1 FROM users WHERE id=_id AND credit_card_number is not null);
$$ language sql stable;


CREATE FUNCTION get_unpaid_transaction(_user_id UUID)
returns UUID as $$
SELECT id FROM transactions WHERE user_id=_user_id AND paid=false;
$$ language sql stable;


CREATE OR REPLACE FUNCTION login_user(
    _email TEXT,
    _password TEXT
) RETURNS TABLE (
    user_data users
) AS $$
DECLARE
    check_user BOOLEAN;
    is_user_manager BOOLEAN;
    user_record users;
BEGIN
    SELECT EXISTS(
        SELECT 1 FROM users WHERE email = _email
    ) INTO check_user;
    IF NOT check_user THEN
        RAISE EXCEPTION 'email does not exist';
    END IF;
    SELECT EXISTS(
        SELECT 1 FROM users WHERE email = _email AND password = _password
    ) INTO check_user;
    IF NOT check_user THEN
        RAISE EXCEPTION 'incorrect password';
    END IF;
    SELECT is_manager INTO is_user_manager FROM users WHERE email = _email;
    RETURN QUERY SELECT * FROM users WHERE email = _email AND password = _password;
END;
$$ LANGUAGE plpgsql VOLATILE;


CREATE OR REPLACE FUNCTION delete_credit_card(
    _id UUID
)
RETURNS VOID
AS $$
BEGIN
    UPDATE users SET credit_card_number=null WHERE id=_id;
END;
$$ LANGUAGE plpgsql VOLATILE;


CREATE OR REPLACE FUNCTION delete_product_from_wishlist(
    _user_id UUID,
    _product_id UUID
)
RETURNS VOID
AS $$
BEGIN
    DELETE FROM wishlist WHERE user_id=_user_id AND product_id=_product_id;
END;
$$ LANGUAGE plpgsql VOLATILE;


CREATE OR REPLACE FUNCTION set_transaction_as_paid(
    _id UUID,
    _new_time TIMESTAMP
)
RETURNS VOID
AS $$
BEGIN
    UPDATE transactions SET paid=true, ordering_time=_new_time WHERE id=_id;
END;
$$ LANGUAGE plpgsql VOLATILE;


CREATE FUNCTION onlyLetters(str text) RETURNS boolean AS $$
BEGIN
    RETURN str ~ '^[A-Za-z]*$';
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION check_register_information(
    first_name TEXT,
    last_name TEXT,
    password TEXT,
    address TEXT,
    is_manager BOOLEAN
)
RETURNS VOID
AS $$
BEGIN
    IF length(first_name) < 2 THEN
        RAISE EXCEPTION 'first name is too short';
    END IF;
    IF length(first_name) > 15 THEN
        RAISE EXCEPTION 'first name is too long';
    END IF;
    IF NOT onlyLetters(first_name) THEN
        RAISE EXCEPTION 'first name must contain only letters';
    END IF;

    IF length(last_name) < 2 THEN
        RAISE EXCEPTION 'last name is too short';
    END IF;
    IF length(last_name) > 20 THEN
        RAISE EXCEPTION 'last name is too long';
    END IF;
    IF NOT onlyLetters(last_name) THEN
        RAISE EXCEPTION 'last name must contain only letters';
    END IF;

    IF length(password) < 8 THEN
        RAISE EXCEPTION 'password is too short';
    END IF;
    IF length(password) > 20 THEN
        RAISE EXCEPTION 'password is too long';
    END IF;

    IF NOT is_manager AND address = '' THEN
        RAISE EXCEPTION 'must enter an address';
    END IF;

    IF is_manager AND password != 'manager_password' THEN
        RAISE EXCEPTION 'secret password is incorrect';
    END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION create_user(
    _first_name TEXT,
    _last_name TEXT,
    _password TEXT,
    _address TEXT,
    _email TEXT,
    _credit_card_number TEXT,
    _is_manager BOOLEAN,
    _token TEXT
)
RETURNS TABLE (
    user_data users
)
AS $$
DECLARE
    generate_id UUID;
    check_email BOOLEAN;
BEGIN
    SELECT uuid_generate_v4() INTO generate_id;

    PERFORM check_register_information(_first_name, _last_name, _password, _address, _is_manager);

    SELECT EXISTS(SELECT 1 FROM users WHERE users.email = _email) INTO check_email;

    IF check_email THEN
        RAISE EXCEPTION 'email already used';
    END IF;

    RETURN QUERY
    INSERT INTO users (id, first_name, last_name, password, address, email, credit_card_number, is_manager, token)
    VALUES (generate_id, _first_name, _last_name, _password, _address, _email, _credit_card_number, _is_manager, _token)
    RETURNING *;
END;
$$ LANGUAGE plpgsql VOLATILE;