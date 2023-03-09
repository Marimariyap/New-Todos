import { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";

function Calendar() {
  const [events, setEvents] = useState([
    {
      title: "",
      start: "",
      end: "",
      color: "",
      textColor: "",
      category: "",
    },
  ]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [color, setColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [category, setCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeRef = useRef(null);
  const modalRef = useRef(null);

  function handleAddEvents() {
    const newEvent = { title, start, end, color, textColor, category };
    setEvents([...events, newEvent]);
    setTitle("");
    setStart("");
    setEnd("");
    setColor("");
    setTextColor("");
    setCategory("");
  }

  function handleDateClick() {
    setIsModalOpen(true);
  }

  function handEventClick(eventInfo) {
    alert(
      `Schedule: \n${eventInfo.event.title}\n\nCategory: \n${eventInfo.event.extendedProps.category}\n\nSchedule start time: \n${eventInfo.event.start}\n\nSchedule end time: \n${eventInfo.event.end}`
    );
  }

  return (
    <div className="main">
      <FullCalendar
        className="calendar"
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        editable={true}
        droppable={true}
        weekends={true}
        events={events}
        eventColor={color}
        eventTextColor={textColor}
        eventClick={handEventClick}
        eventContent={(eventInfo) => (
          <div
            style={{
              backgroundColor: eventInfo.event.backgroundColor,
              color: eventInfo.event.textColor,
              padding: "5px",
              borderRadius: "5px",

              fontSize: "0.1rem",
            }}
          >
            {eventInfo.event.extendedProps.category}-{eventInfo.event.title}
          </div>
        )}
      />

      {/* Schedule Modal Window */}
      <div className="buttons">
        {isModalOpen && (
          <div id="modal" ref={modalRef}>
            <div className="page">
              <div className="name">Please add a schedule.</div>

              <div className="form_control">
                <label className="name">Background color</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="todos"
                />
                <br />

                <label className="name">Color</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="todos"
                />
                <br />
              </div>

              <label className="name">add a schedule</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Please add a schedule."
                className="todos"
              />
              <br />

              <label className="name">add a category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Please add a category."
                className="todos"
              />
              <br />

              <label className="name">Schedule start</label>
              <input
                type="datetime-local"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="todos"
                placeholder="YYYY-MM-DD hh:mm"
              />
              <br />

              <label className="name">Schedule end</label>
              <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="todos"
                placeholder="YYYY-MM-DD hh:mm"
              />
              <br />

              <div>
                <button
                  onClick={() => {
                    handleAddEvents();
                    setIsModalOpen(false);
                  }}
                >
                  To add
                </button>
                <button ref={closeRef} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
