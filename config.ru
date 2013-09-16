ENV['RACK_ENV'] = 'production'

require './app.rb'
run Sinatra::Application