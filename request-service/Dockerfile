FROM mcr.microsoft.com/dotnet/sdk:8.0@sha256:35792ea4ad1db051981f62b313f1be3b46b1f45cadbaa3c288cd0d3056eefb83 AS build-env
WORKDIR /src

# Copy the entire solution from parent directory
COPY .. .

# Verify project files exist and restore dependencies
RUN if [ ! -f "request-service/request-service.csproj" ]; then echo "request-service.csproj not found" && exit 1; fi && \
    if [ ! -f "Shared.Events/Shared.Events.csproj" ]; then echo "Shared.Events.csproj not found" && exit 1; fi && \
    dotnet restore "request-service/request-service.csproj" 

# Build the application
WORKDIR "/src/request-service"

# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0@sha256:6c4df091e4e531bb93bdbfe7e7f0998e7ced344f54426b7e874116a3dc3233ff
WORKDIR /App
COPY --from=build-env /App/out .
EXPOSE 8080
EXPOSE 8081
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]