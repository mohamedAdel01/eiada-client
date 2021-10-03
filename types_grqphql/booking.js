export default {
  BOOKINGS: `
    query(
        $booking_date: String
    )
    {
    BOOKINGS
    (
        booking_date: $booking_date
    )
    {
        bookings {
            owner_id
            booking_date
            day_bookings {
                doctor {
                    fullname
                }
                doctor_bookings {
                    patient_phone
                    start_time
                    end_time
                }
            }
        }
      }
    }
  `
};
