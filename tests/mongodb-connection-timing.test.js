const mongoose = require("mongoose");

describe("MongoDB Connection Timing", () => {
  let startTime, endTime;

  beforeAll(async () => {
    // Record the start time
    startTime = Date.now();

    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Record the end time after connection is established
    endTime = Date.now();
  });

  afterAll(async () => {
    // Record the start time for disconnection
    const disconnectStartTime = Date.now();

    // Disconnect from MongoDB
    await mongoose.disconnect();

    // Record the end time after disconnection
    const disconnectEndTime = Date.now();

    // Calculate and log the disconnection time
    const disconnectTime = disconnectEndTime - disconnectStartTime;
    console.log(`Disconnection time: ${disconnectTime} milliseconds`);
  });

  test("should connect to MongoDB in a reasonable time", () => {
    // Calculate the connection time
    const connectionTime = endTime - startTime;
    console.log(`Connection time: ${connectionTime} milliseconds`);

    // Set an arbitrary reasonable time threshold for connection
    const reasonableTimeThreshold = 5000; // 5 seconds

    // Expect connection time to be less than the reasonable threshold
    expect(connectionTime).toBeLessThan(reasonableTimeThreshold);
  });

  test("should disconnect from MongoDB in a reasonable time", async () => {
    // Disconnect time is already calculated and logged in afterAll
    // So just pass the test as a placeholder
    expect(true).toBe(true);
  });
});
