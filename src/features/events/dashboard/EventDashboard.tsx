import { useEffect, useState } from "react";
import { events } from "../../../lib/data/sampleData";
import EventForm from "../form/EventForm";
import EventCard from "./EventCard";
import type { AppEvent } from "../../../lib/types";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  formOpen: boolean;
  setFormOpen: (isOpen: boolean) => void;
  formToggle: (event: AppEvent | null) => void;
  selectedEvent: AppEvent | null;
};

export default function EventDashboard({
  formOpen,
  setFormOpen,
  formToggle,
  selectedEvent,
}: Props) {
  const [appEvents, setAppEvents] = useState<AppEvent[]>([]);

  const handleCreateEvent = (event: AppEvent) => {
    setAppEvents((prevEvents) => [...prevEvents, event]);
  };

  const handleUpdateEvent = (updatedEvent: AppEvent) => {
    setAppEvents((prevEvents) =>
      prevEvents.map((prevEvent) =>
        prevEvent.id === updatedEvent.id ? updatedEvent : prevEvent
      )
    );
  };

  const handleDeleteEvent = (eventId: string) => {
    setAppEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  useEffect(() => {
    setAppEvents(events);

    return () => {
      setAppEvents([]);
    };
  }, []);

  return (
    <div className="flex flex-row w-full gap-6">
      <div className="w-3/5">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.3, type: "easeInOut" }}
          >
            <div className="flex flex-col gap-4">
              {appEvents.map((event) => (
                <EventCard
                  formToggle={formToggle}
                  key={event.id}
                  event={event}
                  deleteEvent={handleDeleteEvent}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-2/5 overflow-hidden">
        {formOpen && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3, type: "easeInOut" }}
            >
              <EventForm
                key={selectedEvent?.id || "new"}
                setFormOpen={setFormOpen}
                createEvent={handleCreateEvent}
                selectedEvent={selectedEvent}
                updateEvent={handleUpdateEvent}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
