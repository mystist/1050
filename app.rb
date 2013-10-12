require 'sinatra'
require 'sinatra/reloader' if development?
require 'sinatra/activerecord'
require 'redcarpet'
require 'sinatra/json'

class Song < ActiveRecord::Base
end

get '/' do
  erb :index, :layout => :app_layout
end

get '/dev-blog' do
  markdown :dev_blog, :layout_engine => :erb, :layout => :dev_blog_layout
end

get '/dev' do
  Song.count.to_s
end

get '/environment' do
  if settings.development?
    "development!"
  else
    "not development!"
  end
end

STATUS = ''

get '/modification' do
  @status = STATUS
  STATUS = ''
  erb :modification
end

post '/modification' do
  new_song = Song.new
  new_song.index = params[:index]
  new_song.name = params[:name]
  new_song.category_big = params[:category_big]
  new_song.category_small = params[:category_small]
  new_song.first_sentence = params[:first_sentence]
  new_song.created_at = Time.now
  new_song.updated_at = Time.now
  new_song.save
  STATUS = 'success'
  redirect '/modification'
end

get '/songs' do
  @songs = Song.all :order => '`index`'
  @songs.each do |song|
    song.attributes.each do |key, value|
      if song[key].is_a? String
        song[key].force_encoding("UTF-8")
      end
    end
    song
  end
  json @songs
end
