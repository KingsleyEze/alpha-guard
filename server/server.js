// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Body parser to parse JSON request bodies
const bodyParser = require("body-parser");
server.use(bodyParser.json());

server.use(middlewares);

// Custom POST handler to enable/disable all plugins
server.post("/api/toggle-plugins", (req, res) => {
  let db = router.db; // lowdb instance
  let toggleStatus = !req.body.toggleStatus; // Extract toggle status from request body
  console.log("toggleStatus", toggleStatus);

  // Validate toggle status
  if (typeof toggleStatus !== "boolean") {
    res.status(400).send("Invalid toggle status");
    return;
  }

  // Get all tab data
  let tabData = db.get("data.tabdata").value();

  // Iterate over each tab and each plugin within the tab to enable/disable all
  for (let tab in tabData) {
    if (toggleStatus) {
      // If toggleStatus is true, move all plugins to 'disabled' status
      tabData[tab].disabled = tabData[tab].disabled.concat(
        tabData[tab].active,
        tabData[tab].inactive
      );
      tabData[tab].active = [];
      tabData[tab].inactive = [];
    } else {
      // If toggleStatus is false, move all 'disabled' plugins to 'active' status
      tabData[tab].active = tabData[tab].active.concat(tabData[tab].disabled);
      tabData[tab].disabled = [];
    }
  }

  // Update the database
  db.set("data.tabdata", tabData).write();

  res.sendStatus(200);
});

// Custom POST handler
server.post("/tabdata/:tab/:status/:id", (req, res) => {
  let db = router.db; // lowdb instance
  let tab = req.params.tab;
  let oldStatus = req.params.status;
  let id = req.params.id;
  let newStatus = req.body.status; // Extract new status from request body

  console.log("newStatus", newStatus);

  // Validate newStatus
  if (!newStatus || !["active", "inactive", "disabled"].includes(newStatus)) {
    res.status(400).send("Invalid new status");
    return;
  }

  // Find and update the plugin
  console.log("DB", db.get(`data.tabdata`).value());
  let tabData = db.get(`data.tabdata.${tab}.${oldStatus}`).value();

  if (!tabData) {
    res.status(404).send(`Not found`);
    return;
  }

  console.log(":Before", db.get(`data.tabdata.${tab}`).value());
  let index = tabData.indexOf(id);
  if (index !== -1) {
    tabData.splice(index, 1); // Remove from old status
    db.set(`data.tabdata.${tab}.${oldStatus}`, tabData).write(); // Update old status array

    // Get new status array
    let newStatusArray = db.get(`data.tabdata.${tab}.${newStatus}`).value();

    // Check if newStatusArray exists, if not, create an empty array
    if (!newStatusArray) {
      newStatusArray = [];
    }

    newStatusArray.push(id); // Add to new status array
    db.set(`data.tabdata.${tab}.${newStatus}`, newStatusArray).write(); // Update new status array
  }

  console.log(":After", db.get(`data.tabdata.${tab}`).value());

  res.sendStatus(200);
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running");
});
