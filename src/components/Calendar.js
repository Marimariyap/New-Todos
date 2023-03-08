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
    },
  ]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [color, setColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeRef = useRef(null);
  const modalRef = useRef(null);

  function handleAddEvents() {
    const newEvent = { title, start, end, color, textColor };
    setEvents([...events, newEvent]);
    setTitle("");
    setStart("");
    setEnd("");
    setColor("");
    setTextColor("");
  }

  function handleDateClick() {
    setIsModalOpen(true);
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
            {eventInfo.event.title}
          </div>
        )}
      />

      <div className="buttons">
        {isModalOpen && (
          <div id="modal" ref={modalRef}>
            <div className="page">
              <div className="name">일정을 추가 해주세요</div>

              <div className="form_control">
                <label className="name">배경색</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="todos"
                />
                <br />

                <label className="name">글자색</label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="todos"
                />
                <br />
              </div>

              <label className="name">일정 작성</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="작성 해주세요"
                className="todos"
              />
              <br />

              <label className="name">일정 시작</label>
              <input
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className="todos"
              />
              <br />

              <label className="name">일정 종료</label>
              <input
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className="todos"
              />
              <br />

              <div>
                <button
                  onClick={() => {
                    handleAddEvents();
                    setIsModalOpen(false);
                  }}
                >
                  추가
                </button>
                <button ref={closeRef} onClick={() => setIsModalOpen(false)}>
                  닫기
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
