#!/bin/bash

if [ $1 ];
then
	db_name=$1
else
	db_name="auctionStpre"	
fi

user='sa'
password='Admin123'

# sql_scripts_dir="$HOME/selfservice/sql"
sql_scripts_dir="./sql"

# create DB if don't exist
/opt/mssql-tools/bin/sqlcmd -l 60 -U $user -P $password -Q "IF DB_ID (N'$db_name') IS NULL CREATE DATABASE $db_name"

# execute scripts to create tables
for script in "DefaultAdmin.sql"
do
	/opt/mssql-tools/bin/sqlcmd -l 60 -d ${db_name} -U $user -P $password -i $sql_scripts_dir/$script
done

exit
