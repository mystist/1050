class AddColumnsToResources < ActiveRecord::Migration
  def up
    change_table :resources do |t|
      t.references :user
    end
    # add a foreign key
    execute <<-SQL
      ALTER TABLE resources
        ADD CONSTRAINT fk_resources_users
        FOREIGN KEY (user_id)
        REFERENCES users(id)
    SQL
  end

  def down
    execute <<-SQL
      ALTER TABLE resources
        DROP FOREIGN KEY fk_resources_users
    SQL
    remove_column :resources, :user_id
  end
end
