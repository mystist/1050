require 'sinatra'
require 'sinatra/reloader' if development?
require 'sinatra/activerecord'
require 'redcarpet'
require 'sinatra/json'
require 'qiniu-rs'

Qiniu::RS.establish_connection! :access_key => '4drJ2mqHlMuy1sXSfd7W9KYQj3Z9iBAWUZ5kC-9g',
                                :secret_key => '75lbFP5RQIjkZAlcnAGdKIOyxJlPuxVCsAoBLEXj'

class Song < ActiveRecord::Base
end

class Resource < ActiveRecord::Base
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
  @token = Qiniu::RS.generate_upload_token :scope => 'liber-1050'
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

get '/songs' do
  songs = Song.all.order('`index`')
  json encode_list(songs)
end

get '/songs/:id' do
  song = Song.find_by_id(params[:id].to_i)
  resources = getResources(params[:id].to_i)
  re = encode_object(song).attributes
  re['resources'] = encode_list(resources)
  json re
end

get '/songs_category/:category_name' do
  songs = Song.where(" category_big = '#{params[:category_name]}' ").order('`index`')
  json encode_list(songs)
end

def saveSong(song, obj)
  song.attributes.each do |key, value|
    if key != 'id'
      if obj[key]
        song[key] = obj[key]
      end
    end
  end
  song.save
end

def addResources(list, song_id)
  if(list.length>0)
    list.each do |obj|
      current_resource = Resource.where( {'song_id' => song_id, 'file_name' => obj['file_name']} )
      if(current_resource.count==0) 
        new_resource = Resource.new
        new_resource.attributes.each do |key, value|
          if key != 'id'
            if obj[key]
              new_resource[key] = obj[key]
            end
          end
        end
        new_resource['song_id'] = song_id
        new_resource['stars'] = 0
        new_resource.save
      end
    end
  end
  getResources(song_id)
end

def getResources(song_id)
  Resource.where('song_id' => song_id)
end

put '/songs/:id' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  song = Song.find_by_id(params[:id].to_i)
  if(saveSong(song, data))
    resources = addResources(data['resources'], song.id)
    re = encode_object(song).attributes
    re['resources'] = encode_list(resources)
    json re
  else
    re = { :error => true }
    json re
  end
end

post '/songs' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  song = Song.new
  if(saveSong(song, data))
    resources = addResources(data['resources'], song.id)
    re = encode_object(song).attributes
    re['resources'] = encode_list(resources)
    json re
  else
    re = { :error => true }
    json re
  end
end

delete '/songs/:id' do
  param = (params[:id]).to_i
  resources = getResources(param)
  resources.delete_all
  json Song.delete(param)
end

delete '/resources/:id' do
  param = (params[:id]).to_i
  json Resource.delete(param)
end





