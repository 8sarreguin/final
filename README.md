# Winter Final: Charging Dock

The goal of this project is program a charging doc which can hold a maximum of 8 devices.  The charging dock will auto adjust its ports to suite the maximum wattage the device can handle when plugged in. The charging dock also has LED which will change as the charging dock is charging.

## Device Objects

Each device holds a lot of information which is important to its function.
### Instance variables
  -  type (string variable: phone, tablet, laptop)
  -  milliAmps (The recommended current to be used for each device, 1500, 3000, 4500 mAmp)
  -  capacity (The amount of charge on the device 5000, 10000, 15000)
  -  juice (The amount of the charge available on the device)
  -  state (The mode at which the device drains energy as a string: off, idle, active)
  -  rate (The amount of energy drained per hour in each mode above as an array)
      -  off: 0.15% of capacity
      -  idle: 2.35% of capacity
      -  active: 23% of capacity

### Instance Functions
  -  **power()**:  This function returns the value of the device's juice.  This represent the percent of charge of the device.
  -  **off()**:  This function changes the state to the string off.
  -  **on()**:  This function checks the state of the phone using conditional statements
      -  if the phone is off, then change the state to idle.
      -  if the phone is idle, then change the state to active.
  -  **wake()**:  This function checks the state of the phone to see if it is not off.  If this is true, then change the phones state to active.
  -  **sleep()**:  This function checks to see if the state of the phone is active.  If this is true, then change the state of the phone to idle.
  -  **use(min)**:  This function checks to see which state it is in with conditional statements.  For each state, drain the value of juice by the proper amount of the rate.
      -  if your device is **off** and min were 600 (aka 10 hours), juice would loose 1.5%
      -  if your device is **idle** and min were 600 (aka 10 hours), juice would loose 23.5%
      -  if your device is **active** and min were 240 (aka 4 hours), juice would loose 96%
  -  **charge(min)**:  This function will take an input min, which will be the number of minutes your device will charge.  You will add milliAmps to your juice for each fraction of an hour your device charges.  Keep in mind that if your juice goes over capacity, you should reset it to capacity using a conditional statement.
      -  if your device is **off**, add the milliAmps to the juice as stated above.
      -  if your device is **idle**, multiply your milliAmps by 0.9765 before adding to juice.
      -  if your device is **active**, multiply your milliAmps by 0.77 before adding to juice.

## Charging Dock
The dock has 8 available ports which are in an array.  Each port has one LED Light associate with it which is also in a matching array.

### Instance Variables
  -  ports (cannot have more than eight, initially all filled with **undefined**'s because there are no devices)
  -  leds (if a port is in use it is either red, yellow, or green represented as strings)

### Instance Functions
  -  **plug(dvc)**: will add a device to the ports array.
      -  You will loop through the port array for the first **non-red** led.  Insert the device at this index in the ports array.
      -  Based on the amount of power juice, if this is less than 0.99 make the led color yellow at this index, otherwise it is greater than or equal to 0.99 so make the led color green.
  -  **unplug(dvcIdx)** will remove a device based on its index.  If the leds-array is yellow or green at this index (dvcIdx)
      -  store the device at the current port in a variable named temp.
      -  set the current port to undefined.
      -  change the led color in the array at that index to red.
      -  return the temp variable which is the device.
  -  **chargeAll(min)**
      -  you will use a loop to go through the led array.  If an led is non-red, aka yellow or green, this means there is a device to charge.
      -  Inside this conditional statement go to the port at the same index and activate its charge function for the same amount of minutes.
      -  Create a second conditional statement, non-mutually exclusive, after the first and still inside the loop which checks to see if the device's amount of power is over 0.99, if so change the corresponding led color to green.
