ENV['RACK_ENV'] = 'development'

require './app.rb'
run Sinatra::Application