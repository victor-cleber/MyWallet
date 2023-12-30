### Creating the docker image
```bash
  docker image build -t victorcleber/my-wallet:1.0 -f Dockerfile.yaml .
  docker container run -dti -p 8080:80 --name my-wallet victorcleber/my-wallet:1.0  
  docker container start my-wallet
  docker container stop my-wallet
  docker container rm my-wallet
  docker image rm victorcleber/my-wallet:1.0
```
### Publishing the docker image
```bash
  docker login
  docker image build -t victor-cleber/my-wallet:1.0 -f Dockerfile.yaml .
  docker push victorcleber/my-wallet:1.0
  docker container stop my-wallet:1.0  
  docker container rm my-wallet:1.0
  docker image rm my-wallet:1.0
```
### Using the image through the remote repository
```bash
  docker container run -dti -p 8080:80 --name my-wallet:1.0 debian-apache:1.0
```