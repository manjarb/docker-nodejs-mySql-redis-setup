#!/bin/bash
/usr/bin/mysqld_safe --skip-grant-tables &
sleep 5
mysql -u root -e "CREATE DATABASE hsbcnet_testing"
mysql -u root hsbcnet_testing < /tmp/schema.sql