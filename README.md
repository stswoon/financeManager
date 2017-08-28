# financeManager
Pet project to test skils in ReactJs and Microservices
ssh-keygen -t rsa -b 4096 -C "stswoon@yandex.ru"




heroku plugins:install heroku-repo
https://stackoverflow.com/questions/27810419/git-push-heroku-master-is-still-asking-for-authentication



https://www.ssh.com/ssh/putty/windows/puttygen
https://docs.joyent.com/public-cloud/getting-started/ssh-keys/generating-an-ssh-key-manually/manually-generating-your-ssh-key-in-windows


https://devcenter.heroku.com/articles/getting-started-with-java#scale-the-app
https://lostechies.com/derickbailey/2014/02/27/using-a-single-git-repository-for-multiple-heroku-projects/
https://devcenter.heroku.com/articles/getting-started-with-java#deploy-the-app
https://dashboard.heroku.com/apps/stswoon-java/deploy/heroku-git


git init
heroku git:remote -a stswoon-financemanager-backend
git add -A
git commit -m "deploy"
git push heroku master

heroku logs --tail