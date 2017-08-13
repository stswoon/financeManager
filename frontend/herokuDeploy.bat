rmdir herokuDeploy /S /Q
mkdir herokuDeploy
mkdir herokuDeploy\public
xcopy public herokuDeploy\public /E
xcopy index.js herokuDeploy
xcopy package.json herokuDeploy
xcopy Procfile herokuDeploy

cd herokuDeploy
heroku repo:reset -a stswoon-fm-frontend
git init
heroku git:remote -a stswoon-fm-frontend
git add -A
git commit -m "deploy"
git push heroku master