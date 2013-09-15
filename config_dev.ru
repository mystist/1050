ENV['RACK_ENV'] = 'development'

require 'bundler'
Bundler.setup(:default, :development)

require './app.rb'
run Sinatra::Application