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
    'development!'
  else
    'not development!'
  end
end

get '/songs' do
  songs = Song.all.order('`index`')
  json encode_list(songs)
end

get '/songs/:id' do
  song = Song.find_by_id(params[:id].to_i)
  resources = get_resources_by_song_id(params[:id].to_i)
  if song
    re = encode_object(song).attributes
    re['resources'] = encode_list(resources)
    json re
  else
    re = { :error => true }
    json re
  end
end

get '/songs_category/:category_name' do
  songs = Song.where('category_big = ?', params[:category_name]).order('`index`')
  json encode_list(songs)
end

def save_song(song, obj)
  if song
    song.attributes.each do |key, value|
      if key != 'id'
        if obj[key]
          song[key] = obj[key]
        end
      end
    end
    song.save
  end
end

def add_resources(resources, song_id)
  if(resources.length>0)
    resources.each do |obj|
      current_resource = Resource.where('song_id = ? and file_name = ?', song_id, obj['file_name'])
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
  get_resources_by_song_id(song_id)
end

def get_resources_by_song_id(song_id)
  Resource.where('song_id = ?', song_id).order('stars desc')
end

put '/songs/:id' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  song = Song.find_by_id(params[:id].to_i)
  if(song&&save_song(song, data))
    resources = add_resources(data['resources'], song.id)
    
    src = get_most_starred_resource_src_by_song_id(song.id)
    update_song_src_by_song_id(src, song.id)
    
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
  if(song&&save_song(song, data))
    resources = add_resources(data['resources'], song.id)
    
    src = get_most_starred_resource_src_by_song_id(song.id)
    update_song_src_by_song_id(src, song.id)
    
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
  resources = get_resources_by_song_id(param)
  resources.delete_all
  json Song.delete(param)
end

delete '/resources/:id' do
  param = (params[:id]).to_i
  resource = Resource.find_by_id(param)
  if resource.delete  
    src = get_most_starred_resource_src_by_song_id(resource['song_id'])
    update_song_src_by_song_id(src, resource['song_id'])
    json true
  end
end

patch '/resources/:id' do
  request.body.rewind  # in case someone already read it
  data = JSON.parse request.body.read
  obj = data
  resource = Resource.find_by_id(params[:id].to_i)
  if resource
    resource.attributes.each do |key, value|
      if key != 'id'
        if obj[key]
          resource[key] = obj[key]
        end
      end
    end
    if obj['plus']
      resource['stars'] += obj['plus'].to_i
    end
    resource.save
    
    src = get_most_starred_resource_src_by_song_id(resource['song_id'])
    update_song_src_by_song_id(src, resource['song_id'])
    
    re = encode_object(resource).attributes
    json re
  else
    re = { :error => true }
    json re
  end
end

def get_most_starred_resource_src_by_song_id(song_id)
  src = {}
  resources = Resource.where('song_id = ?', song_id).order('stars desc')
  t = encode_object(resources.where('file_type = ?', 'song').first)
  src['song_src'] = t ? t['file_name'] : nil
  t = encode_object(resources.where('file_type = ?', 'pic').first)
  src['pic_src'] = t ? t['file_name'] : nil
  src
end

def update_song_src_by_song_id(src, song_id)
  song = Song.find_by_id(song_id)
  if song
    song['song_src'] = src['song_src']
    song['pic_src'] = src['pic_src']
    song.save
  end
end

get '/test' do
  json nil
end




