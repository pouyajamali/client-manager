const { v4: uuidv4 } = require("uuid");
const express = require("express");
const clientRouter = express.Router();
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

let clientObjectTemplate = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  meetings: [],
};

clientRouter.post("/clients/:id/meeting", function (req, res) {
  const filePath = path.join(__dirname, "..", "data", "clients.json");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }
    let clients = JSON.parse(data);
    const clientIdToUpdate = req.params.id;
    const { title, body } = req.body;
    const index = clients.findIndex((client) => client.id === clientIdToUpdate);

    if (index !== -1) {
      clients[index].meetings.push({
        id: uuidv4(),
        title: title,
        body: body,
        date: DateTime.local().toISO(),
      });

      fs.writeFile(
        filePath,
        JSON.stringify(clients, null, 2),
        "utf8",
        function (err) {
          if (err) {
            console.error("Error writing file:", err);
            res.status(500).send("Error updating client");
            return;
          }
          console.log("Client updated successfully");
          res.status(200).send("Client updated successfully");
        }
      );
    } else {
      console.error("Client not found");
      res.status(404).send("Client not found");
    }
  });
});

clientRouter.get("/clients", function (req, res) {
  const filePath = path.join(__dirname, "..", "data", "clients.json");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    const clients = JSON.parse(data);

    const filteredData = clients.map((item) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
    }));

    res.status(200).json(filteredData);
  });
});

clientRouter.get("/clients/:id", function (req, res) {
  const filePath = path.join(__dirname, "..", "data", "clients.json");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }
    const params = req.params.id;
    const clients = JSON.parse(data);
    const result = clients.filter((element) => element.id === params);

    if (result.length === 0) {
      console.error("No client with that id exists:", err);
      res.status(400).send({
        message: "No client with that id exists",
      });
      return;
    }

    res.status(200).json(result[0]);
  });
});

clientRouter.put("/clients/:id", function (req, res) {
  const filePath = path.join(__dirname, "..", "data", "clients.json");
  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }
    let clients = JSON.parse(data);
    const clientIdToUpdate = req.params.id;
    const { fullName, emailAddress, phoneNumber, fullAddress } = req.body;
    const index = clients.findIndex((client) => client.id === clientIdToUpdate);

    if (index !== -1) {
      clients[index].name = fullName;
      clients[index].email = emailAddress;
      clients[index].phone = phoneNumber;
      clients[index].address = fullAddress;

      fs.writeFile(
        filePath,
        JSON.stringify(clients, null, 2),
        "utf8",
        function (err) {
          if (err) {
            console.error("Error writing file:", err);
            res.status(500).send("Error updating client");
            return;
          }
          console.log("Client updated successfully");
          res.status(200).send("Client updated successfully");
        }
      );
    } else {
      console.error("Client not found");
      res.status(404).send("Client not found");
    }
  });
});

clientRouter.post("/clients", function (req, res) {
  const { fullName, emailAddress, phoneNumber, fullAddress } = req.body;
  if (!fullName || !emailAddress || !phoneNumber || !fullAddress) {
    res.status(400).json({ error: "Missing required info!" });
    return;
  }
  const filePath = path.join(__dirname, "..", "data", "clients.json");

  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    let clients = JSON.parse(data);

    const id = uuidv4();

    const newClient = clientObjectTemplate;
    newClient.id = id;
    newClient.name = fullName;
    newClient.email = emailAddress;
    newClient.phone = phoneNumber;
    newClient.address = fullAddress;

    clients.push(newClient);

    const updatedData = JSON.stringify(clients, null, 2);

    fs.writeFile(filePath, updatedData, function (err) {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Error writing file");
        return;
      }

      res.status(201).json(newClient);
    });
  });
});

clientRouter.delete("/clients/:id", function (req, res) {
  const id = req.params.id;

  const filePath = path.join(__dirname, "..", "data", "clients.json");

  fs.readFile(filePath, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    let clients = JSON.parse(data);

    const index = clients.findIndex((client) => client.id === id);

    if (index !== -1) {
      clients.splice(index, 1);
    } else {
      console.error("Client not found");
      res.status(404).send("Client not found");
    }

    const updatedData = JSON.stringify(clients, null, 2);

    fs.writeFile(filePath, updatedData, function (err) {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Error writing file");
        return;
      }

      res.status(201).json("Client successfully deleted!");
    });
  });
});

module.exports = clientRouter;
