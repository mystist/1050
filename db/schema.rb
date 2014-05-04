# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140419113815) do

  create_table "resources", force: true do |t|
    t.integer  "song_id"
    t.string   "file_name"
    t.integer  "file_size"
    t.datetime "uploaded_time"
    t.string   "file_type"
    t.integer  "stars"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "resources", ["song_id"], name: "fk_resources_songs", using: :btree

  create_table "songs", force: true do |t|
    t.integer  "index"
    t.string   "name"
    t.string   "category_big"
    t.string   "category_small"
    t.string   "first_sentence"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "song_src"
    t.string   "pic_src"
  end

  create_table "users", force: true do |t|
    t.string   "open_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
