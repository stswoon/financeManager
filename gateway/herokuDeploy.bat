rmdir herokuDeploy /S /Q
mkdir herokuDeploy
mkdir herokuDeploy\src
xcopy src herokuDeploy\src /E
xcopy pom.xml herokuDeploy
xcopy Procfile herokuDeploy

cd herokuDeploy
git init
heroku git:remote -a stswoon-fm-gateway
git add -A
git commit -m "deploy"
git push heroku master