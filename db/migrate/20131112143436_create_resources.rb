class CreateResources < ActiveRecord::Migration
  def up
    create_table :resources do |t|
      t.references :song
      t.string :file_name
      t.integer :file_size
      t.date :uploaded_time
      t.string :file_type
      t.integer :stars
      t.timestamps      
    end
    # add a foreign key
    execute <<-SQL
      ALTER TABLE resources
        ADD CONSTRAINT fk_resources_songs
        FOREIGN KEY (song_id)
        REFERENCES songs(id)
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE products
        DROP FOREIGN KEY fk_resources_songs
    SQL
    drop_table :resources
  end
end
