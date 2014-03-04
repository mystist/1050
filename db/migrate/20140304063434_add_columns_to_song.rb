class AddColumnsToSong < ActiveRecord::Migration
  def up
    add_column :songs, :song_src, :string
    add_column :songs, :pic_src, :string
  end

  def down
    remove_column :songs, :song_src
    remove_column :songs, :pic_src
  end
end
