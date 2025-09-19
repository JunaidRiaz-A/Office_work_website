import React, { useState, useEffect } from 'react';
import './Appointment.css';

const Appointment = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [days, setDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    renderCalendar();
  }, [currentDate]);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    const newDays = [];

    for (let i = 0; i < startingDay; i++) {
      newDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      newDays.push({
        day,
        isToday: new Date(year, month, day).toDateString() === new Date().toDateString(),
        isWeekend: [5, 6].includes(new Date(year, month, day).getDay()),
      });
    }

    setDays(newDays);
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const selectDate = (day) => {
    if (day) {
      // Create date with explicit day, month, and year without timezone offset interference
      const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day, 12); // Use noon to avoid midnight offset issues
      setSelectedDate(selected);
      console.log('Selected Date:', selected.toISOString().split('T')[0]); // Debug log
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    if (!selectedDate) {
      setErrorMessage('Please select a date.');
      return;
    }

    // Use local date string to avoid timezone offset
    data.date_selected = selectedDate.toISOString().split('T')[0];
    console.log('Submitted Date:', data.date_selected); // Debug log

    const response = await fetch('http://localhost:8000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      setShowModal(true);
      e.target.reset();
      setSelectedDate(null);
      renderCalendar();
      setErrorMessage(null);
    } else {
      setErrorMessage(result.date_selected ? result.date_selected[0] : 'An error occurred while submitting the appointment.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const clearError = () => {
    setErrorMessage(null);
  };

  return (
    <div className="main_div_appointment">
      <div className="appointment_heading">
        <strong>Schedule Your Appointment</strong>
      </div>
      <div className="main_calender_appointment">
        <div className="appointment_info">
          We are here to help you 24/7 with experts
        </div>
        <div className="appointment_content">
          <div className="appointment_form">
            <form id="appointmentForm" onSubmit={handleSubmit}>
              <div className="form_group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" required />
              </div>
              <div className="form_group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>
              <div className="form_group">
                <label htmlFor="phone_number">Phone Number</label>
                <input type="tel" id="phone_number" name="phone_number" placeholder="Enter your phone" required />
              </div>
              <div className="form_group">
                <label htmlFor="website">Website (Optional)</label>
                <input type="url" id="website" name="website" placeholder="Enter your website" />
              </div>
              <button type="submit" className="schedule_meeting_btn">Schedule Now</button>
            </form>
          </div>
          <div className="appointment_calendar">
            <div className="calendar_container">
              <div className="calendar_nav">
                <button id="prev-month" onClick={prevMonth}>&lt;</button>
                <span id="month-year">{`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`}</span>
                <button id="next-month" onClick={nextMonth}>&gt;</button>
              </div>
              <div id="calendar-days" className="calendar-grid">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${day && day.isToday ? 'today' : ''} ${day && day.isWeekend ? 'weekend' : ''} ${selectedDate && day && day.day === selectedDate.getDate() && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear() ? 'selected' : ''}`}
                    onClick={() => day && selectDate(day.day)}
                  >
                    {day ? day.day : ''}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal_content">
            <h2>Success!</h2>
            <p>Appointment successfully submitted! Thank you.</p>
            <button onClick={closeModal} className="modal_close_btn">Close</button>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="toast">
          <p>{errorMessage}</p>
          <button onClick={clearError} className="toast_close">×</button>
        </div>
      )}
    </div>
  );
};

export default Appointment;