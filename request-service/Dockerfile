FROM mcr.microsoft.com/dotnet/sdk:8.0@sha256:35792ea4ad1db051981f62b313f1be3b46b1f45cadbaa3c288cd0d3056eefb83 AS build-env
WORKDIR /App

# Copy everything
COPY ./request-service/request-service.csproj ./request-service/
COPY ./Shared.Events/Shared.Events.csproj ./Shared.Events/

# Restore dependencies for both projects
RUN dotnet restore ./request-service/request-service.csproj

# Copy everything else
COPY . ./

# Build and publish the request-service project
RUN dotnet publish ./request-service/request-service.csproj -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0@sha256:6c4df091e4e531bb93bdbfe7e7f0998e7ced344f54426b7e874116a3dc3233ff
WORKDIR /App
COPY --from=build-env /App/out .
EXPOSE 8080
EXPOSE 8081
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]