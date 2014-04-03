ENV['RACK_ENV'] = 'production'

require 'bundler'
Bundler.setup(:default)

require 'rack/cache'

use Rack::Cache,
  :verbose     => false,
  :metastore   => 'heap:/',
  :entitystore => 'file:cache/rack/body'

require './app.rb'
run Sinatra::Application