rmdir herokuDeploy /S /Q
mkdir herokuDeploy
mkdir herokuDeploy\src
mkdir herokuDeploy\public
xcopy src herokuDeploy\src /E
xcopy public herokuDeploy\public /E
xcopy .babelrc herokuDeploy
xcopy server.js herokuDeploy
xcopy server-ssr.js herokuDeploy
xcopy package.json herokuDeploy
xcopy Procfile herokuDeploy
xcopy webpack.loaders.js herokuDeploy
xcopy webpack.production.config.js herokuDeploy
xcopy webpack.production-server.config.js herokuDeploy
xcopy .eslintrc herokuDeploy

cd herokuDeploy
heroku repo:reset -a stswoon-fm-frontend-ssr
git init
heroku git:remote -a stswoon-fm-frontend-ssr
git add -A
git commit -m "deploy"
git push heroku master