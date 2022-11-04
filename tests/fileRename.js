const fs = require("fs");

fs.rename("rename.txt", "deletename.txt", (error) => {
  if (error) {
    // Show the error
    console.log(error);
  } else {
    // List all the filenames after renaming
    console.log("\nFile Renamed\n");

    // List all the filenames after renaming
    getCurrentFilenames();
  }
});

// Function to get current filenames
// in directory
function getCurrentFilenames() {
  console.log("Current filenames:");
  fs.readdirSync(__dirname).forEach((file) => {
    console.log(file);
  });
}
