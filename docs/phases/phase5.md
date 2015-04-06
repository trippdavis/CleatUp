# Phase 5: Viewing Events

## Rails
### Models

### Controllers
* Api::EventsController (create, destroy, index, show, edit)

### Views
* groups/show.json.jbuilder (include events data)

## Backbone
### Models
* Event
* Group (parses nested events data)

### Collections
* Events

### Views
* EventForm
* EventShow
* EventList (composite with EventItemShow)
* GroupShow (composite with EventList)

## Gems/Libraries
