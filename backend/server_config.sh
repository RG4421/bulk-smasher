#!/usr/bin/env bash
# sudo git clone https://github.com/uberflip/bulk-smasher.git

echo "
----------------------
  NODE & NPM
----------------------
"
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

echo "
----------------------
  EXPRESS
----------------------
"
npm install express --save

echo "
----------------------
  REACT
----------------------
"
npm install react --save
npm install react-dom --save

echo "
----------------------
  NPM PACKAGES
----------------------
"
npm install axios
npm install react-csv-to-table
npm install react-loader-spinner --save
npm install dateformat
npm install nodemailer
npm install nodemon
npm install dotenv
npm install file-system --save
npm install uniqid