class CreateMeetings < ActiveRecord::Migration
  def up
    create_table :meetings do |t|
      t.references :user
      t.datetime :date
      t.string :info
      t.string :status
      t.timestamps 
    end
    # add a foreign key
    execute <<-SQL
      ALTER TABLE meetings
        ADD CONSTRAINT fk_meetings_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE meetings
        DROP FOREIGN KEY fk_meetings_users
    SQL
    drop_table :meetings
  end
end
