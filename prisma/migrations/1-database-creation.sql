CREATE TABLE Client (
    client_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    minimum_search_percentage DECIMAL(5, 2) NOT NULL,
    max_investor_levels INT NOT NULL
);

CREATE TABLE Company (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL UNIQUE,
    client_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Client(client_id)
);

CREATE TABLE Investor (
    investor_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('company', 'person')),
    code VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Shareholder (
    shareholder_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    investor_id INT NOT NULL,
    share_percentage DECIMAL(5, 2) NOT NULL,
    level INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES Company(company_id),
    FOREIGN KEY (investor_id) REFERENCES Investor(investor_id)
);

CREATE TABLE Document (
    document_id SERIAL PRIMARY KEY,
    investor_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) CHECK (file_type IN ('PDF', 'PNG')),
    file_data BYTEA NOT NULL,
    FOREIGN KEY (investor_id) REFERENCES Investor(investor_id)
);

CREATE INDEX idx_company_code ON Company(code);
CREATE INDEX idx_investor_code ON Investor(code);