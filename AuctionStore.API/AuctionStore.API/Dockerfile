#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["AuctionStore.API/AuctionStore.API.csproj", "AuctionStore.API/"]
COPY ["../AuctionStore.Infrastructure/AuctionStore.Infrastructure.csproj", "../AuctionStore.Infrastructure/"]
COPY ["../AuctionStore.Domain/AuctionStore.Domain.csproj", "../AuctionStore.Domain/"]
RUN dotnet restore "AuctionStore.API/AuctionStore.API.csproj"
COPY . .
WORKDIR "/src/AuctionStore.API"
RUN dotnet build "AuctionStore.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AuctionStore.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AuctionStore.API.dll"]