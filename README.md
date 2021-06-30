To Run

cd into root folder

1. Build docker images:

   - open terminal
   - run cmd 'docker-build'

2. Build dependencies from docker-compose.yml

   - in terminal run cmd 'docker-compose up'
   - if you have issues running that cmd you can run them individually
     'docker-compose up -d mongo' , 'docker-compose up -d api' , 'docker-compose up -d client'

3. You can also reconfigure the DB connection route in 'ProposalQueryandInsert.js' to link to your mongo container. The defualt port for mongo is 27017:27017. I have it currently setup to connect to Mongo Atlas.
  
