#!/bin/bash

sudo apt-get update

sudo apt-get install -y apt-transport-https
sudo apt-get update
sudo apt-get install -y aspnetcore-runtime-5.0


chmod +x ./scripts/*.sh

./scripts/deploymentDb.sh

./scripts/updateDb.sh

reactApp="./AuctionStore.Web"
backendApp="./AuctionStore.API/AuctionStore.API"

cd $reactApp
sudo apt-get update
sudo apt install nodejs
sudo apt-get update
sudo apt install npm

sudo npm i
npm start &

cd ../$backendApp
dotnet restore
dotnet run --project ./AuctionStore.API.csproj