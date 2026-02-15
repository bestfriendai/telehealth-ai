// Appointments Service
// TODO: Connect to real API/Backend for production
// This service provides appointment management with mock data

export type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  type: "video" | "in-person";
};

// Mock data - replace with API calls
const mockAppointments: Appointment[] = [
  {
    id: "1",
    doctor: "Dr. Sarah Chen",
    specialty: "General Practitioner",
    date: "Feb 15, 2026",
    time: "10:00 AM",
    status: "upcoming",
    type: "video",
  },
  {
    id: "2",
    doctor: "Dr. Michael Ross",
    specialty: "Cardiologist",
    date: "Feb 18, 2026",
    time: "2:30 PM",
    status: "upcoming",
    type: "in-person",
  },
];

// API Functions - replace with real API calls
export async function fetchAppointments(): Promise<Appointment[]> {
  // TODO: Replace with real API call
  // const response = await fetch('/api/appointments');
  // return response.json();
  return Promise.resolve(mockAppointments);
}

export async function fetchAppointmentById(id: string): Promise<Appointment | null> {
  // TODO: Replace with real API call
  // const response = await fetch(`/api/appointments/${id}`);
  // return response.json();
  return Promise.resolve(mockAppointments.find(a => a.id === id) || null);
}

export async function createAppointment(data: Omit<Appointment, 'id'>): Promise<Appointment> {
  // TODO: Replace with real API call
  // const response = await fetch('/api/appointments', {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });
  // return response.json();
  const newAppointment: Appointment = {
    ...data,
    id: Date.now().toString(),
  };
  return Promise.resolve(newAppointment);
}

export async function rescheduleAppointment(id: string, date: string, time: string): Promise<Appointment> {
  // TODO: Replace with real API call
  console.log(`Rescheduling appointment ${id} to ${date} ${time}`);
  return Promise.resolve({} as Appointment);
}
