ENV['RACK_ENV'] = 'production'

require 'bundler'
Bundler.setup(:default)

require './app.rb'
run Sinatra::Application