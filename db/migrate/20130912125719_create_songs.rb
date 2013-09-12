class CreateSongs < ActiveRecord::Migration
  def up
    create_table :songs do |t|
      t.integer :index
      t.string :name
      t.string :category_big
      t.string :category_small
      t.string :first_sentence
      t.timestamps
    end
  end

  def down
    drop_table :songs
  end
end
