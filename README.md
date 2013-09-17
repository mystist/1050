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

#

#
