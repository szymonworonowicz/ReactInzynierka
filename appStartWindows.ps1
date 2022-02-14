$software = "Microsoft .NET Core Runtime - 5.0 (x64)";
$installed = (Get-ItemProperty HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\* | Where { $_.DisplayName -eq $software }) -ne $null

$react = "./AuctionStore.Web"
$backend ="./AuctionStore.API/AuctionStore.API"
If(-Not $installed) {
	Write-Host "'$software' NOT is installed.";
    cd ./scripts
    Set-ExecutionPolicy Bypass -Scope Process -Force
    ./ChocolateyInstall.ps1
    ./dotnet-install.ps1 -Runtime aspnetcore -Version 5.0
    ./installnpm.ps1
    ./deployDb.ps1
    ./updateDb
    cd $react
    npm i
    Start-Process npm "start"
    Start-Process "https://localhost:3000"
    cd ..
    cd $backend
    Start-Process dotnet " run --project ./AuctionStore.API.csproj"

} else {
	Write-Host "'$software' is installed."
}
