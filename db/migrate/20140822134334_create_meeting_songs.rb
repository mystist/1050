class CreateMeetingSongs < ActiveRecord::Migration
  def up
    create_table :meeting_songs do |t|
      t.references :meeting
      t.references :song
      t.timestamps
    end
    # add a foreign key
    execute <<-SQL
      ALTER TABLE meeting_songs
        ADD CONSTRAINT fk_meeting_songs_meetings
        FOREIGN KEY (meeting_id)
        REFERENCES meetings(id)
    SQL
    execute <<-SQL
      ALTER TABLE meeting_songs
        ADD CONSTRAINT fk_meeting_songs_songs
        FOREIGN KEY (song_id)
        REFERENCES songs(id)
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE meeting_songs
        DROP FOREIGN KEY fk_meeting_songs_meetings
    SQL
    execute <<-SQL
      ALTER TABLE meeting_songs
        DROP FOREIGN KEY fk_meeting_songs_songs
    SQL
    drop_table :meeting_songs
  end
end
