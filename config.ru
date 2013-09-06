require 'bundler'
Bundler.setup(:default, :development)

require './app.rb'
run Sinatra::Application