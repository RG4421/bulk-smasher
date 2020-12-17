const { src, dest, series, parallel } = require('gulp');
const fs   = require('fs');
const zip = require('gulp-zip');
const log = require('fancy-log');
var exec = require('child_process').exec;
const { version } =  require('./package.json');

const paths = {
  prod_build: `./prod-build-v${version}`,
  server_file_name: 'server.js',
  react_src: './build/**/*',
  react_dist: `./prod-build-v${version}/build`,
  zipped_file_name: `prod-build-v${version}.zip`
};

function createProdBuildFolder() {

  const dir = paths.prod_build;
  log(`Creating the folder if not exist  ${dir}`)
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    log('📁  folder created:', dir);
  }

  return Promise.resolve('the value is ignored');
}

function buildReactCodeTask(cb) {
  log('building React code into the directory')
  return exec('npm run build', function (err, stdout, stderr) {
    log(stdout);
    log(stderr);
    cb(err);
  })
}

function copyReactCodeTask() {
  log('copying React code into the directory')
  return src(`${paths.react_src}`)
        .pipe(dest(`${paths.react_dist}`));
}

function copyNodeJSCodeTask() {
  log('building and copying server code into the directory')
  return src(['package.json', './backend/**', './backend/.env', './backend/.ebextensions**'])
        .pipe(dest(`${paths.prod_build}`))
}

function copyEBCodeTask() {
  log('building and copying ebconfig files into the directory')
  return src(['./backend/.ebextensions/**'])
        .pipe(dest(`${paths.prod_build}/.ebextensions`))
}

function zippingTask() {
  log('zipping the code ')
  return src(`${paths.prod_build}/**`)
      .pipe(zip(`${paths.zipped_file_name}`))
      .pipe(dest(`${paths.prod_build}`))
}

exports.default = series(
  createProdBuildFolder,
  buildReactCodeTask,
  parallel(copyReactCodeTask, copyNodeJSCodeTask, copyEBCodeTask),
  zippingTask
);