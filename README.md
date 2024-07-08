
# Hall Booking API

This project is an API for managing hall bookings. It allows you to create customers, rooms, and book rooms for customers. You can also retrieve information about rooms, customers, and their bookings.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Create a Customer](#create-a-customer)
  - [List all Customers](#list-all-customers)
  - [Create a Room](#create-a-room)
  - [Book a Room](#book-a-room)
  - [List all Rooms with Booked Data](#list-all-rooms-with-booked-data)
  - [List all Customers with Booked Data](#list-all-customers-with-booked-data)
  - [List Bookings for a Customer](#list-bookings-for-a-customer)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/dilipkanogiya/hall-booking.git
    cd hall-booking-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the server:
    ```sh
    npm run dev
    ```

2. The API will be available at `http://localhost:3000`.

## API Endpoints

### Create a Customer

- **URL**: `/customers`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe"
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "name": "John Doe"
  }
  ```

### List all Customers

- **URL**: `/customers`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "name": "John Doe"
    },
    {
      "id": 2,
      "name": "Jane Smith"
    }
  ]
  ```

### Create a Room

- **URL**: `/rooms`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "seats": 50,
    "amenities": ["Projector", "Whiteboard"],
    "price": 100
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "seats": 50,
    "amenities": ["Projector", "Whiteboard"],
    "price": 100,
    "bookings": []
  }
  ```

### Book a Room

- **URL**: `/bookings`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "customerId": 1,
    "date": "2024-07-10",
    "startTime": "10:00",
    "endTime": "12:00",
    "roomId": 1
  }
  ```
- **Response**:
  ```json
  {
    "id": 1,
    "customerId": 1,
    "date": "2024-07-10",
    "startTime": "10:00",
    "endTime": "12:00",
    "roomId": 1
  }
  ```

### List all Rooms with Booked Data

- **URL**: `/rooms`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "roomName": "Room 1",
      "bookedStatus": true,
      "bookings": [
        {
          "customerName": "John Doe",
          "date": "2024-07-10",
          "startTime": "10:00",
          "endTime": "12:00"
        }
      ]
    }
  ]
  ```

### List all Customers with Booked Data

- **URL**: `/customers/bookings`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "customerName": "John Doe",
      "roomName": "Room 1",
      "date": "2024-07-10",
      "startTime": "10:00",
      "endTime": "12:00"
    }
  ]
  ```

### List Bookings for a Customer

- **URL**: `/customers/:customerId/bookings`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "customerName": "John Doe",
      "roomName": "Room 1",
      "date": "2024-07-10",
      "startTime": "10:00",
      "endTime": "12:00",
      "bookingId": 1,
      "bookingDate": "2024-07-10",
      "bookingStatus": "Booked"
    }
  ]
  ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
