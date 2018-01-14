# Finance Manager
Pet project to test skils in ReactJs\Redux with server side rendering and Microservices on Heroku with Spring Boot

## How to view
* open https://stswoon-fm-frontend-ssr.herokuapp.com/ 
* login as alex / 123456
* if failed wait a bit (30-60 sec) and login again because of free account restriction
* do it twice because first is gateway second is auth service
* after login wait again because of third service

## Feachures
List of most interesting things\technologies which I think about
##### Design
- requirements and diagrams [link](https://github.com/stswoon/financeManager/wiki/First-Design)
- microservices on heroku
- maven plugin
##### Backend
- spring boot
- oauth
- junit
- aspectj
- authorithation via visitor
- ApplicationProperties for normal DI
- CRUD controllers
- local development
##### Frontend
- react + redux + antd + routes 
- server side rendering via nodejs
- highcharts wrapper component
- localization
- high ordered components
- hot module replacement
- less, BEM
- mouseless
- facade for ajax
- server logs
- es6, async\await
- jsdocs
- local json server
- junit
- screenshot tests
- performance
  - caches
  - service-worker


## Etc.



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



oath
https://habrahabr.ru/post/280786/
https://spring.io/blog/2015/02/03/sso-with-oauth2-angular-js-and-spring-security-part-v
https://cloud.spring.io/spring-cloud-security/#quick-start
http://stytex.de/blog/2016/02/01/spring-cloud-security-with-oauth2/
https://github.com/xetys/spring-cloud-oauth2-example/tree/master/OAuth2ResourceServer/src/main/java/com/example/config
https://jmnarloch.wordpress.com/2015/10/21/spring-cloud-eureka-zuul-and-oauth2-scaling-out-authorization-server/
https://blog.jdriven.com/2016/09/securing-application-landscape-spring-cloud-security-part-1/
https://bitbucket.org/rlippolis/cloud-security-example/src
!https://github.com/rohitghatol/spring-boot-microservices.git
!!!!https://stackoverflow.com/questions/45928583/simple-auth-in-spring-boot-microservices



http://projects.spring.io/spring-security-oauth/docs/oauth2.html
http://www.baeldung.com/rest-api-spring-oauth2-angularjs
https://spring.io/guides/tutorials/spring-boot-oauth2/


https://github.com/sqshq/PiggyMetrics.git
https://github.com/juanzero000/spring-boot-oauth2-sso.git
