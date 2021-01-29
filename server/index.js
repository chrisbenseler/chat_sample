const express = require("express");

const app = express();

app.get("/health_check", (req, res) => {
    res.json({ status: "OK", date: (new Date())})
})

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port", server.address().port);
});