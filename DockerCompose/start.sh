cd ../gtrkstaff/
npm install
npm run build
cd ../staff 
mvn package
cd ../DockerCompose/
cp ../staff/target/staff-1.0.0.jar ./staff.jar
docker build -t staff:1 .
docker-compose up -d
