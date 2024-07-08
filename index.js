const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let rooms = [];
let bookings = [];
let customers = [];

// Create a Customer
app.post('/customers', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send({ error: 'Name is required' });
  }

  const customer = {
    id: customers.length + 1,
    name
  };
  customers.push(customer);
  console.log('Customers:', customers);  // Log customers array
  res.status(201).send(customer);
});

// List all Customers
app.get('/customers', (req, res) => {
  res.send(customers);
});

// Create a Room
app.post('/rooms', (req, res) => {
  const { seats, amenities, price } = req.body;
  if (!seats || !amenities || !price) {
    return res.status(400).send({ error: 'Seats, amenities, and price are required' });
  }

  const room = {
    id: rooms.length + 1,
    seats,
    amenities,
    price,
    bookings: []
  };
  rooms.push(room);
  console.log('Rooms:', rooms);  // Log rooms array
  res.status(201).send(room);
});

// Book a Room
app.post('/bookings', (req, res) => {
  const { customerId, date, startTime, endTime, roomId } = req.body;

  const room = rooms.find(r => r.id === roomId);
  const customer = customers.find(c => c.id === customerId);

  if (!room) {
    return res.status(404).send('Room not found');
  }
  if (!customer) {
    return res.status(404).send('Customer not found');
  }

  const isBooked = room.bookings.some(booking => booking.date === date && (
    (startTime >= booking.startTime && startTime < booking.endTime) ||
    (endTime > booking.startTime && endTime <= booking.endTime) ||
    (startTime <= booking.startTime && endTime >= booking.endTime)
  ));

  if (isBooked) {
    return res.status(400).send('Room already booked for the given time slot');
  }

  const booking = {
    id: bookings.length + 1,
    customerId,
    date,
    startTime,
    endTime,
    roomId
  };

  room.bookings.push(booking);
  bookings.push(booking);
  console.log('Bookings:', bookings);  // Log bookings array
  res.status(201).send(booking);
});

// List all Rooms with Booked Data
app.get('/rooms', (req, res) => {
  const result = rooms.map(room => ({
    roomName: `Room ${room.id}`,
    bookedStatus: room.bookings.length > 0,
    bookings: room.bookings.map(booking => {
      const customer = customers.find(c => c.id === booking.customerId);
      return {
        customerName: customer ? customer.name : 'Unknown',
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime
      };
    })
  }));
  res.send(result);
});

// List all Customers with Booked Data
app.get('/customers/bookings', (req, res) => {
  const result = bookings.map(booking => {
    const customer = customers.find(c => c.id === booking.customerId);
    return {
      customerName: customer ? customer.name : 'Unknown',
      roomName: `Room ${booking.roomId}`,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime
    };
  });
  res.send(result);
});

// List how many times a Customer has booked the Room
app.get('/customers/:customerId/bookings', (req, res) => {
  const customerId = parseInt(req.params.customerId, 10);
  const result = bookings.filter(booking => booking.customerId === customerId)
    .map(booking => {
      const customer = customers.find(c => c.id === customerId);
      return {
        customerName: customer ? customer.name : 'Unknown',
        roomName: `Room ${booking.roomId}`,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        bookingId: booking.id,
        bookingDate: booking.date,
        bookingStatus: 'Booked'
      };
    });
  res.send(result);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});