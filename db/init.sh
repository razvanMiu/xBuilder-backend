echo "** Creating default DB and users"

mysql -u root -p$DATABASE_ROOT_PASSWORD --execute \
"CREATE DATABASE IF NOT EXISTS $DATABASE_NAME;
CREATE USER IF NOT EXISTS $DATABASE_USER@'localhost' IDENTIFIED BY '$DATABASE_PASSWORD'; FLUSH PRIVILEGES;
GRANT ALL PRIVILEGES ON $DATABASE_NAME.* TO '$DATABASE_USER'@'localhost';"

echo "** Finished creating default DB and users"