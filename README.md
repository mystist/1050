1050
====

The 1050 Poetry of Christian.  
[http://1050.14201420.com/](http://1050.14201420.com/)

Version: 1.0.0  
Last updated: 2015-06-18 1:48

====

Play songs, View it's pictures.  
Upload your own songs and pictures.  
Vote for your favorite songs and pictures.  
Freely, quickly and simple.  

====

#### Todo:  

- Change search from back-end to front-end.

#### Done:  

- Change edit icon from `pencil` to `edit`.
- Change Copyright year.
- Change edit icon from `con` to `pencil`.

Tiny:
1. Add pager at bottom.
2. Add to my song list on the playing page.

1. Hotfix of pager url.  
2. Speed up home page.  

Waterfall.  

Backbone Memory leak:  
Use iframe for Player to avoid memory leaks. How about the other Views ? We may take care of the problem in the future.  

Choose Cloud Storage:  
Qiniu.

Optimize:  
Use r.js to optimize js and css.  
Set public_folder use sinatra config.  

CDN:  
Nothing need to do with CDN right now !  

Delete resource from Cloud Storge as well:  
Handled it in the backend.  

Interface:  
Upload Songs at once. See at [http://1050.14201420.com/interface](http://1050.14201420.com/interface)  
Upload Resources at once.  

Test in IE:  
Er...May be we can test it in the future, Because I come to handle the `pushState` url when I'm going to make a test !

Startup:  
Initial 1050 release. Version: 0.1.0  

Google Analytics：  
Universal Analytics.  

Cache:  
Cache the staice files.  
Cache the request `/songs` using `rack-cache` by etag and file system.  

A lot:   
Add style when mouse hover the item of the table.  
Add a pic button to the player.  
Add hover event to the `pic` button to show a Div of it's pic.  (Maybe in the midlle will better.)  
Add now playing.   

Search:  
Done at version: `0.2.3`  

Login and Uploader:  
Done at version: `0.2.4`  

My song list:  
Done at version: `0.2.5`

Logo thumbnail:  
Done at version: `0.3.0`  