# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150430163450) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "event_reservations", force: :cascade do |t|
    t.integer  "event_id",    null: false
    t.integer  "reserver_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "event_reservations", ["event_id", "reserver_id"], name: "index_event_reservations_on_event_id_and_reserver_id", unique: true, using: :btree

  create_table "events", force: :cascade do |t|
    t.integer  "group_id",    null: false
    t.string   "title",       null: false
    t.text     "description"
    t.string   "location",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.datetime "date_time",   null: false
  end

  add_index "events", ["group_id"], name: "index_events_on_group_id", using: :btree

  create_table "group_memberships", force: :cascade do |t|
    t.integer  "group_id",   null: false
    t.integer  "member_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "group_memberships", ["group_id", "member_id"], name: "index_group_memberships_on_group_id_and_member_id", unique: true, using: :btree

  create_table "groups", force: :cascade do |t|
    t.integer  "organizer_id",   null: false
    t.string   "title",          null: false
    t.text     "description",    null: false
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "filepicker_url"
  end

  add_index "groups", ["organizer_id"], name: "index_groups_on_organizer_id", using: :btree

  create_table "interestings", force: :cascade do |t|
    t.integer  "interest_id",       null: false
    t.integer  "interestable_id",   null: false
    t.string   "interestable_type", null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "interestings", ["interest_id", "interestable_id", "interestable_type"], name: "interestings_index", unique: true, using: :btree

  create_table "interests", force: :cascade do |t|
    t.string   "topic",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
