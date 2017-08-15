rmdir herokuDeploy /S /Q
mkdir herokuDeploy
mkdir herokuDeploy\src
xcopy src herokuDeploy\src /E
xcopy .babelrc herokuDeploy
xcopy index.js herokuDeploy
xcopy package.json herokuDeploy
xcopy Procfile herokuDeploy
xcopy webpack.config.js herokuDeploy

cd herokuDeploy
heroku repo:reset -a stswoon-fm-frontend
git init
heroku git:remote -a stswoon-fm-frontend
git add -A
git commit -m "deploy"
git push heroku master