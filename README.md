Kukuza UI


Hosting my first React App on AWS

Helpful Tutorials



https://hackernoon.com/tutorial-creating-and-managing-a-node-js-server-on-aws-part-2-5fbdea95f8a1


// create the config file mappping port 80 to port 3000


listen 80 default_server;
   root /var/www/kukuza/build;
   server_name [your.domain.com] [your other domain if you want to];
   index index.html index.htm;

server {
  listen 80;
  root /var/www/kukuza/build;
  server_name kukuza;
  location / {
  }
}

// Link the config file in sites enabled (this will make it seem like the file is actually copied in sites-enabled).	
sudo ln -s /etc/nginx/sites-available/kukuza /etc/nginx/sites-enabled/kukuza

