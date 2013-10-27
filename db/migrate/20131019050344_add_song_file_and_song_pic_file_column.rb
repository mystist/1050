class AddSongFileAndSongPicFileColumn < ActiveRecord::Migration
  def up
    add_column :songs, :uploaded_song, :string
    add_column :songs, :uploaded_pic, :string
  end

  def down
    remove_column :songs, :uploaded_song
    remove_column :songs, :uploaded_pic
  end
end
