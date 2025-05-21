import { Link } from "react-router";
import { useAppSelector } from "../../../lib/stores/store";

export default function EventDetailedHeader() {
  const event = useAppSelector((state) => state.event.selectedEvent);

  if (!event) {
    return <div>Event not found</div>; // or a loading state
  }

  const host = event.attendees.find(
    (attendee) => attendee.id === event.hostUid
  );

  return (
    <div className="card bg-base-100">
      <figure className="h-64 brightness-50 rounded-lg">
        <img
          src={`/categoryImages/${event.category}.jpg`}
          alt="event category image"
          className="w-full object-cover"
        />
      </figure>
      <div className="card-body text-white justify-end absolute bottom-0 w-full">
        <div className="flex justify-between">
          <div>
            <h2 className="card-title text-4xl">{event.title}</h2>
            <p>{event.date}</p>
            <p>Hosted by {host?.displayName}</p>
          </div>
          <div className="flex flex-col justify-end">
            <div className="flex gap-3">
              <Link to={`/manage/${event.id}`} className="btn btn-secondary">
                Manage
              </Link>
              <button className="btn btn-primary">Join event</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
