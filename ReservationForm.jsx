import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    guests: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [bookings, setBookings] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBookings((prev) => [...prev, formData]);
    setSubmitted(true);
    setFormData({ name: "", date: "", time: "", guests: "" });
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Little Lemon Table Reservation</h1>
      <Card className="mb-6">
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} min="1" required />
            </div>
            <Button type="submit">Reserve Table</Button>
          </form>
        </CardContent>
      </Card>

      {submitted && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          Reservation submitted successfully!
        </div>
      )}

      {bookings.length > 0 && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-semibold mb-2">Bookings</h2>
            <ul className="space-y-2">
              {bookings.map((booking, index) => (
                <li key={index} className="border p-2 rounded">
                  {booking.name} - {booking.date} at {booking.time} ({booking.guests} guests)
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}