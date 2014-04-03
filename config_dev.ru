ENV['RACK_ENV'] = 'development'

require 'bundler'
Bundler.setup(:default, :development)

require 'rack/cache'

use Rack::Cache,
  :verbose     => false,
  :metastore   => 'heap:/',
  :entitystore => 'file:cache/rack/body'

require './app.rb'
run Sinatra::Application