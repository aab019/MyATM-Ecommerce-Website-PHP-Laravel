REM prerequiste 
REM 1. rename this build.bat file
REM 2. delete the isociety.zip from live server
REM 3. Copy live database dump in current directory with file name "live_society.sql.gz"

@ECHO off
REM SET MYSQL_PATH=D:\xampp\mysql\bin
SET WINRAR_PATH=C:\Program Files\WinRAR
set CURDIR=%CD%
ECHO ******************** BUILD ********************
ECHO ******************** Checkout from SVN ********************
svn checkout https://subversion.assembla.com/svn/isocietymanager-com/trunk/ui ./
REM svn update
REM del .env;
REM ren production.env .env;
REM ECHO ******************** Run composer command ********************
REM call composer update
REM cd vendor/cartalyst/sentry/src/config
REM del config.php
REM cd..
REM cd Cartalyst\Sentry
REM del Sentry.php
REM cd Groups
REM del ProviderInterface.php
REM cd Eloquent
REM del Provider.php
REM del Group.php
REM chdir /d %CURDIR% &rem restore current directory
REM svn update;
REM call composer dumpautoload
del isociety.zip
ECHO ******************** Create project ZIP file ********************
jar cfM isociety.zip assets front static *.html *.php

ECHO ******************** Moving zip file on live server ********************
ftp -s:ftp.txt isocietymanager.com

REM ECHO ******************** ------ MIGRATION -------- ********************
REM ECHO ******************** drop and create database ********************
REM SET PATH=%PATH%;%MYSQL_PATH%
REM mysql -e "drop database build_society" -u root -proot
REM mysql -e "create database build_society" -u root -proot
REM del live_society.sql;
REM SET PATH=%PATH%;%WINRAR_PATH%
REM winrar.exe x live_society.sql.gz *.* ./
REM ECHO ******************** Import database ********************
REM mysql -u root -proot build_society<live_society.sql
REM del .env;
REM ren build.env .env;
REM ECHO ******************** Run Laravel migration ********************
REM php artisan migrate
REM ECHO ******************** Run Laravel seed ********************
REM php artisan db:seed
REM ECHO ******************** Export final database ********************
REM mysqldump -u root -proot build_society > build_society.sql
REM ECHO ******************** END ********************

REM Do Following steps manualy:
REM 1. delete all tables from live database
REM 2. import the dump sql file (build_society.sql) on live database
REM 3. delete all folders and files (related to isocietymanager) from live server
REM 4. extract isociety.zip file on live server
