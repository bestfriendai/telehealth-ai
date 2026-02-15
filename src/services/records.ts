// Medical Records Service
// TODO: Connect to real API/Backend for production
// This service provides medical record management with mock data

export type Record = {
  id: string;
  title: string;
  date: string;
  type: "lab" | "prescription" | "imaging" | "note";
  doctor: string;
  summary: string;
};

// Mock data - replace with API calls
const mockRecords: Record[] = [
  {
    id: "1",
    title: "Blood Test Results",
    date: "Feb 10, 2026",
    type: "lab",
    doctor: "Dr. Sarah Chen",
    summary: "All values within normal range. Cholesterol slightly elevated.",
  },
  {
    id: "2",
    title: "Prescription - Lisinopril",
    date: "Feb 12, 2026",
    type: "prescription",
    doctor: "Dr. Michael Ross",
    summary: "10mg daily for blood pressure management.",
  },
  {
    id: "3",
    title: "Chest X-Ray",
    date: "Jan 28, 2026",
    type: "imaging",
    doctor: "Dr. Michael Ross",
    summary: "No abnormalities detected. Clear lungs.",
  },
];

// API Functions - replace with real API calls
export async function fetchRecords(): Promise<Record[]> {
  // TODO: Replace with real API call
  // const response = await fetch('/api/records');
  // return response.json();
  return Promise.resolve(mockRecords);
}

export async function fetchRecordById(id: string): Promise<Record | null> {
  // TODO: Replace with real API call
  // const response = await fetch(`/api/records/${id}`);
  // return response.json();
  return Promise.resolve(mockRecords.find(r => r.id === id) || null);
}

export async function uploadRecord(data: Omit<Record, 'id'>): Promise<Record> {
  // TODO: Replace with real API call
  // const response = await fetch('/api/records', {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // });
  // return response.json();
  const newRecord: Record = {
    ...data,
    id: Date.now().toString(),
  };
  return Promise.resolve(newRecord);
}
