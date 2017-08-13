rmdir herokuDeploy
mkdir herokuDeploy
mkdir herokuDeploy\src
xcopy src herokuDeploy\src /E
xcopy pom.xml herokuDeploy
xcopy Procfile herokuDeploy

git init
heroku git:remote -a stswoon-fm-backend
git add -A
git commit -m "deploy"
git push heroku master