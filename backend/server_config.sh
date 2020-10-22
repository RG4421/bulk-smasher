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
npm install -g axios
npm install -g react-csv-to-table
npm install -g react-loader-spinner --save
npm install -g dateformat
npm install -g nodemailer
npm install -g nodemon
npm install -g dotenv
npm install -g file-system --save