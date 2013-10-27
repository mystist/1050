require 'sinatra'
require 'sinatra/reloader' if development?
require 'sinatra/activerecord'
require 'redcarpet'
require 'sinatra/json'

class Song < ActiveRecord::Base
end

def encode_object(obj)
  if obj
    obj.attributes.each do |key, value|
      if obj[key].is_a? String
        obj[key].force_encoding("UTF-8")
      end
    end
  end
  obj
end

def encode_list(list)
  list.each do |obj|
    obj = encode_object(obj)
    obj
  end
  list
end

get '/' do
  erb :index, :layout => :app_layout
end

get '/dev-blog' do
  markdown :dev_blog, :layout_engine => :erb, :layout => :dev_blog_layout
end

get '/environment' do
  if settings.development?
    "development!"
  else
    "not development!"
  end
end

# STATUS = ''

# get '/modification' do
  # @status = STATUS
  # STATUS = ''
  # erb :modification
# end

# post '/modification' do
  # new_song = Song.new
  # new_song.index = params[:index]
  # new_song.name = params[:name]
  # new_song.category_big = params[:category_big]
  # new_song.category_small = params[:category_small]
  # new_song.first_sentence = params[:first_sentence]
  # new_song.created_at = Time.now
  # new_song.updated_at = Time.now
  # new_song.save
  # STATUS = 'success'
  # redirect '/modification'
# end

get '/songs' do
  @songs = Song.all.order('`index`')
  json encode_list(@songs)
end

get '/songs/:id' do
  @song = Song.find_by_id(params[:id])
  json encode_object(@song)
end

get '/songs_category/:category_name' do
  @songs = Song.where(" category_big = '#{params[:category_name]}' ").order('`index`')
  json encode_list(@songs)
end

# put '/songs/:id' do
  # re = {
    # :result => 'success',
    # :error => nil
  # }
  # request.body.rewind  # in case someone already read it
  # data = JSON.parse request.body.read
  # song = Song.find_by_id(params[:id])
  # song.attributes.each do |key, value|
    # if key != 'id'
      # song[key] = data[key]
    # end
  # end
  # if(!song.save)
    # re = {
      # :result => nil,
      # :error => 'failure'
    # }    
  # end
  # json re
# end

put '/songs/:id' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  song = Song.find_by_id(params[:id].to_i)
  song.attributes.each do |key, value|
    if key != 'id'
      song[key] = data[key]
    end
  end
  if(song.save)
    json song
  else
    re = { :error => true }
    json re
  end
end

post '/songs' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  song = Song.new
  data.each do |key, value|
    if key != 'id'
      song[key] = data[key]
    end
  end
  if(song.save)
    json song
  else
    re = { :error => true }
    json re
  end
end

delete '/songs/:id' do
  param = (params[:id]).to_i
  json Song.delete(param)
end







