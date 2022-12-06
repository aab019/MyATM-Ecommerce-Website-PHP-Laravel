REM prerequiste 
REM 1. rename this build.bat file
REM 2. delete the isociety.zip from live server
REM 3. Copy live database dump in current directory with file name "live_society.sql.gz"

@ECHO off
SET MYSQL_PATH=D:\xampp\mysql\bin
SET WINRAR_PATH=C:\Program Files\WinRAR
set CURDIR=%CD%
ECHO ******************** BUILD ********************
ECHO ******************** Checkout from SVN ********************
svn checkout https://subversion.assembla.com/svn/isocietymanager-com/trunk ./
REM svn update
del .env;
ren production.env .env;
ECHO ******************** Run composer command ********************
call composer update
cd vendor/cartalyst/sentry/src/config
del config.php
cd..
cd Cartalyst\Sentry
del Sentry.php
cd Groups
del ProviderInterface.php
cd Eloquent
del Provider.php
del Group.php
chdir /d %CURDIR% &rem restore current directory
svn update;
call composer dumpautoload
del isociety.zip
ECHO ******************** Create project ZIP file ********************
jar cfM isociety.zip api app app42 assets aws bootstrap config database front PaytmKit resources static storage vendor .env home.html index.html privacy-policy.html refund-cancel.html terms-conditions.html *.php

ECHO ******************** Moving zip file on live server ********************
ftp -s:ftp.txt isocietymanager.com

ECHO ******************** ------ MIGRATION -------- ********************
ECHO ******************** drop and create database ********************
SET PATH=%PATH%;%MYSQL_PATH%
mysql -e "drop database build_society" -u root -proot
mysql -e "create database build_society" -u root -proot
del live_society.sql;
SET PATH=%PATH%;%WINRAR_PATH%
winrar.exe x live_society.sql.gz *.* ./
ECHO ******************** Import database ********************
mysql -u root -proot build_society<live_society.sql
del .env;
ren build.env .env;
ECHO ******************** Run Laravel migration ********************
php artisan migrate
ECHO ******************** Run Laravel seed ********************
php artisan db:seed
ECHO ******************** Export final database ********************
mysqldump -u root -proot build_society > build_society.sql
ECHO ******************** END ********************

REM Do Following steps manualy:
REM 1. delete all tables from live database
REM 2. import the dump sql file (build_society.sql) on live database
REM 3. delete all folders and files (related to isocietymanager) from live server
REM 4. extract isociety.zip file on live server
