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

git config --global core.autocrlf input # use `true` on Windows
git config --global core.safecrlf true

git update-index --chmod=+x .openshift/action_hooks/*

#

  Jenkins created successfully.  Please make note of these credentials:
   User: admin
   Password: Vnq2JuW42hwx
Note:  You can change your password at: https://jenkins-liber.rhcloud.com/me/con
figure

Waiting for your DNS name to be available ... done

Cloning into 'jenkins'...
The authenticity of host 'jenkins-liber.rhcloud.com (54.221.21.124)' can't be es
tablished.
RSA key fingerprint is cf:ee:77:cb:0e:fc:02:d7:72:7e:ae:80:c0:90:88:a7.
Are you sure you want to continue connecting (yes/no)?
Host key verification failed.
fatal: Could not read from remote repository.

#

jenkins-client-1 (Jenkins Client)
---------------------------------
  Gears:   Located with ruby-1.9, mysql-5.1
  Job URL: https://jenkins-liber.rhcloud.com/job/1050-build/
  
#
  
bundle exec rake db:migrate RACK_ENV="production"

#

rhc cartridge remove -a {appName} -c jenkins-client-1.4

#

#

