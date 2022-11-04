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
