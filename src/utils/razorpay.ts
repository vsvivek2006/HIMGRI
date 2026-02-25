// Updated PaymentButton component using the new utilities
const handlePayment = async () => {
  try {
    await initializeHotelBookingPayment({
      amount: amount,
      roomType: roomType,
      guestName: guestName,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      planName: planName,
      onSuccess: (response) => {
        navigate('/booking/success', { 
          state: { 
            paymentId: response.razorpay_payment_id,
            amount: amount,
            roomType: roomType,
            guestName: guestName,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            bookingId: `RAD${Date.now()}`
          }
        });
      },
      onFailure: (error) => {
        navigate('/booking/failed', { 
          state: { 
            error: error,
            reason: error.description,
            roomType: roomType,
            amount: amount
          }
        });
      },
      onDismiss: () => {
        navigate('/booking/failed', { 
          state: { reason: 'Booking cancelled by user' }
        });
      }
    });
  } catch (error) {
    console.error('Payment Error:', error);
    navigate('/booking/failed', { 
      state: { error: 'Booking processing failed' }
    });
  }
};