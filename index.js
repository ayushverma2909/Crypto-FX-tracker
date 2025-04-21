import express from 'express';
import axios from 'axios'


const app = express();
const port = 3000;
const apiKey = `Your Api key`;
const url = `https://api.currencyapi.com/v3/latest`;

const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
    JPY: "¥",
    CAD: "C$",
    AUD: "A$",
    BTC: "₿",
    ETH: "Ξ",
    LTC: "Ł",
    XRP: "✕",
    ADA: "₳",
    DOGE: "Ð",
    BNB: "🅑",
    CNY: "¥",
    RUB: "₽",
    BRL: "R$",
    MXN: "$",
    SGD: "S$",
    CHF: "Fr",
    MYR: "RM",
    THB: "฿",
    NZD: "NZ$",
    TRY: "₺",
    PHP: "₱",
    HKD: "HK$",
    SEK: "kr"
    // add more as needed
};


app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.render("index.ejs");
});

app.get("/currency", async (req, res) => {
    const base = req.query.base || "USD";
    const target = req.query.target || "INR";

    try {
        const response = await axios.get(url, {
            params: {
                apikey: apiKey,
                base_currency: base,
                currencies: target
            } 
        });
        const rate = response.data.data[target].value;
        res.render("index.ejs", {
            base,
            target,
            rate,
            symbol: currencySymbols[target] || ""
        });
    } catch(err) {
        console.error("Error fetching currency data:", err.message);
        res.send("Failed to fetch currency data.");
    }
})
 
app.listen(port, ()=>{
    console.log(`server is running live on port: ${port}`);
});