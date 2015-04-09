class CreateEventReservations < ActiveRecord::Migration
  def change
    create_table :event_reservations do |t|
      t.integer :event_id, null: false
      t.integer :reserver_id, null: false

      t.timestamps null: false
    end

    add_index :event_reservations, [:event_id, :reserver_id], unique: true
  end
end
