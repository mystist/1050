require 'sinatra'
require 'sinatra/reloader' if development?
require 'sinatra/activerecord'

get '/' do
  "Hi there! It's initialize!"
end