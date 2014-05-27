class CreateUsers < ActiveRecord::Migration
  def up
    create_table :users do |t|
      t.string :open_id
      t.string :nickname
      t.string :figure_url
      t.timestamps
    end
  end

  def down
    drop_table :users
  end
end
