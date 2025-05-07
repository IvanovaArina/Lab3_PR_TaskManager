#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 5044

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["TaskManager.csproj", "./"]
RUN dotnet restore "./TaskManager.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "./TaskManager.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./TaskManager.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# Устанавливаем строку подключения к PostgreSQL
ENV ConnectionStrings__DefaultConnection=Host=db;Port=5432;Database=todolist;Username=postgres;Password=1234
# Настраиваем порт для Kestrel
ENV ASPNETCORE_URLS=http://+:5044
ENTRYPOINT ["dotnet", "TaskManager.dll"]