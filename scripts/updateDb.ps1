$SQLServer = "MSSQLLocalDB"
$db3 = "AuctionStore"
$scriptDir = "./scripts"
$adminScript = "DefaultAdmin.sql"

Invoke-Sqlcmd -ServerInstance $SQLServer -Database $db3 -InputFile $scriptDir/$adminScript
