require 'sinatra'
require 'sinatra/activerecord'
require 'redcarpet'

class Song < ActiveRecord::Base
end

get '/' do
  erb :index
end

get '/dev-blog' do
  markdown :dev_blog, :layout_engine => :erb, :layout => :dev_blog_layout
end

get '/dev' do
  Song.count.to_s
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