1. DASH node must be fully synced with blockchain data, otherwise you will not be able to query the proper data.

2. to properly run the ProposalQueryandInsert.js file you must make sure you have an up to date DASH node running and its properly configured and connected. Mine is running on a linux VM on port 9998.

   - this file is responsible for getting up to data governance data and updating your mongo

3. you can configure the ports you'd like to expose in the Dockerfile, mine are set to 5000 to handle front end routing and 9998 for querying the DASH node.
