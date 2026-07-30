/**
 * data.js
 * ------------------------------------------------------------------
 * This file replaces the MySQL "tracking_table" and "history_table"
 * from the original PHP version. There is no database and no server
 * behind this site anymore — everything lives right here in plain
 * JavaScript.
 *
 * TO ADD / EDIT / REMOVE A SHIPMENT:
 *   Just add, edit, or delete an object in the TRACKING_DATA array
 *   below and save the file. No admin panel, no login needed.
 *
 * Each shipment has a "history" array — that's the list of events
 * shown on the "View History" page for that tracking number.
 * ------------------------------------------------------------------
 */

const TRACKING_DATA = [
  {
    tracking_number: "1234567892121",
    sender: "Jason",
    receiver_name: "Mark",
    receiver_address: "237 Thomas Ave, New York, NY 10127",
    origin_port: "New York",
    destination_port: "Dubai",
    transport: "Air",
    product: "Shoes",
    quantity: "5",
    weight: "90",
    status: "In transit",
    payment_method: "Credit Card",
    pickup_time: "2022-04-12 03:15 pm",
    departure_time: "2022-04-18 06:20 pm",
    delivery_date: "2022-04-22",
    history: [
      { date_time: "04/10/2022 09:00 am", status: "In possession", location: "NEW YORK" },
      { date_time: "04/12/2022 03:15 pm", status: "Picked up", location: "NEW YORK" },
      { date_time: "04/15/2022 11:40 am", status: "In transit", location: "FRANKFURT" },
      { date_time: "04/18/2022 06:20 pm", status: "In transit", location: "DUBAI" }
    ]
  },
  {
    tracking_number: "0001228902",
    sender: "John Doe",
    receiver_name: "Rita Queens",
    receiver_address: "123 A St, Alaska, AL 28934",
    origin_port: "Alaska",
    destination_port: "Norway",
    transport: "Ocean",
    product: "Shoes",
    quantity: "23",
    weight: "98",
    status: "Picked up",
    payment_method: "Cash on Delivery",
    pickup_time: "2022-11-28 08:00 am",
    departure_time: "2022-12-01 10:30 am",
    delivery_date: "2022-12-10",
    history: [
      { date_time: "11/28/2022 08:00 am", status: "In possession", location: "ALASKA" },
      { date_time: "12/01/2022 10:30 am", status: "Picked up", location: "ALASKA" }
    ]
  },
  {
    tracking_number: "476389016",
    sender: "Michael",
    receiver_name: "Ace",
    receiver_address: "26 Ave St. Detroit, MI 12893",
    origin_port: "Detroit",
    destination_port: "London",
    transport: "Ocean",
    product: "Shoes",
    quantity: "10",
    weight: "100",
    status: "Delivered",
    payment_method: "Cash on Delivery",
    pickup_time: "2022-10-01 07:45 am",
    departure_time: "2022-10-03 01:20 pm",
    delivery_date: "2022-10-22",
    history: [
      { date_time: "10/01/2022 07:45 am", status: "In possession", location: "DETROIT" },
      { date_time: "10/03/2022 01:20 pm", status: "Picked up", location: "DETROIT" },
      { date_time: "10/10/2022 09:05 am", status: "In transit", location: "ATLANTIC OCEAN" },
      { date_time: "10/18/2022 04:50 pm", status: "Arrived at destination", location: "LONDON" },
      { date_time: "10/22/2022 12:00 pm", status: "Delivered", location: "LONDON" }
    ]
  }
];

/**
 * Look up a shipment by tracking number.
 * Returns the shipment object, or undefined if not found.
 */
function findShipment(trackingNumber) {
  const clean = String(trackingNumber || "").trim();
  return TRACKING_DATA.find((item) => item.tracking_number === clean);
}
