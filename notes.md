1050
====

The 1050 Poetry of Christian.

====
MySQL 5.1 database added.  Please make note of these credentials:
       Root User: adminF469Nqg
   Root Password: nJWaDzrgnywB
   Database Name: 1050
Connection URL: mysql://$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT/
You can manage your new MySQL database by also embedding phpmyadmin-3.
The phpmyadmin username and password will be the same as the MySQL credentials above.

#

rhc port-forward -a {appName}

git config --global core.autocrlf input # use `true` on Windows
git config --global core.safecrlf true

git update-index --chmod=+x .openshift/action_hooks/*

#

rhc ssh {appName} 
bundle exec rake db:migrate RACK_ENV="production"

#

rhc cartridge remove -a {appName} -c jenkins-client-1.4

#

Jenkins created successfully.  Please make note of these credentials:
   User: admin
   Password: EUDZRunfAViG
Note:  You can change your password at: https://jenkins-liber.rhcloud.com/me/configure

Accessing your application
Your application has one or more cartridges that expose a public URL. Click the link below to see your application:

http://jenkins-liber.rhcloud.com/

The application overview page provides a summary of your application and its cartridges.

Making code changes
OpenShift uses the Git version control system to manage the code of your application. Each cartridge has a single Git repository that you'll use to check in changes to your application. When you push a change to your Git repository we'll automatically deploy your code and restart your application if necessary.

Install the Git client for your operating system, and from your command line run

git clone ssh://5237e99ae0b8cd511b00000a@jenkins-liber.rhcloud.com/~/git/jenkins.git/
cd jenkins/

#

Associated with job '1050-build' in Jenkins server.
Your application is now building with Jenkins.
Building your Application
OpenShift is configured to build this application with Jenkins when you make changes through Git. You can track the progress of builds through the following Jenkins job:

https://jenkins-liber.rhcloud.com/job/1050-build/

If you no longer wish to run Jenkins builds, you can remove the Jenkins cartridge.
https://openshift.redhat.com/app/console/application/1050/building/delete

#

http://openapi.baidu.com/oauth/2.0/login_success#expires_in=2592000&access_token=3.f562ec8dee4b5e0071c1d0e5cec72543.2592000.1386400060.2282023345-1673314&session_secret=f2fe6ff82994a9900c3ffb7e2acba1e8&session_key=94q1SVX1MXD4ZUEB1ARXS6afj1md4rZPj6EycnAUPxww033l4feXhfV3M8q3NX21peSbaLR2g%2FgBNuB3nqN0pzMYdxUmSvMG&scope=basic+netdisk

#

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <h1>Hello, world!</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
  </head>
  
  <body>
  
  </body>
</html>

#

  @m.query("SELECT * from songs").each_hash do |res|
    puts res
  end


#


#
