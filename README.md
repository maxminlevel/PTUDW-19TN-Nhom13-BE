# -PTUDW-19TN-Nhom13-BE

## Setup 

### Libs and tools

```bash
    npm i
    npm i --save-dev
```

### Database
``` bash
    # Instal postgresql
    apt install postgresql

    # Create user and role
    sudo -u postgres createuser -s $USER
    sudo -u postgres psql postgres
    CREATE ROLE {{user}} LOGIN PASSWORD {{password}};

    # Setup database
    CREATE DATABASE {{database}} WITH OWNER = {{user}};
    GRANT ALL PRIVILEGES ON TABLE {{table_name}} TO {{user}};
```
```sql
    -- Setup table
    > \c database
    -- Use query normally
    > CREATE TABLE users ( 
    ID SERIAL PRIMARY KEY,
    name VARCHAR(30),
    email VARCHAR(30)
    );
```

### Enviroment
  Copy all file *.example beside then change the parameters if needed.

## Testing

## Deploy

## Publish

# Contributor


