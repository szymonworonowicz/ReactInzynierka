#import SqlServer module
Import-Module -Name "SqlServer"
 
$SQLServer = "MSSQLLocalDB"
$db3 = "AuctionStore"
# create variable with SQL to execute
$sql = "
CREATE DATABASE [AuctionStore]
 CONTAINMENT = NONE
 ON  PRIMARY
( NAME = N'AuctionStore', FILENAME = N':\Users\szymw\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\MyDatabase.mdf' , SIZE = 1048576KB , FILEGROWTH = 262144KB )
 LOG ON
( NAME = N'AuctionStore_log', FILENAME = N':\Users\szymw\AppData\Local\Microsoft\Microsoft SQL Server Local DB\Instances\MSSQLLocalDB\MyDatabase_log.ldf' , SIZE = 524288KB , FILEGROWTH = 131072KB )
GO

USE [master]
GO
ALTER DATABASE [AuctionStore] SET RECOVERY SIMPLE WITH NO_WAIT
GO

ALTER AUTHORIZATION ON DATABASE::[AuctionStore] TO [sa]
GO "

Invoke-SqlCmd -ServerInstance $SQLServer\$db3 -Query $sql