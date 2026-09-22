const form = document.querySelector("#login-form");
const loginPanel = document.querySelector("#login-panel");
const successPanel = document.querySelector("#success-panel");
const statusLine = document.querySelector("#status");
const flagOutput = document.querySelector("#flag");

async function sha256(value) {
    const data = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const login = document.querySelector("#login").value.trim();
    const password = document.querySelector("#password").value;
    const signature = await sha256(`${login}:${password}`);

    if (signature === "9b8b37fedd4c5c10e9af03c69bd3512492060a3c0bcaa4fd9841c1fc13b1ba4d") {
        loginPanel.hidden = true;
        successPanel.hidden = false;
        flagOutput.textContent = atob("UFdOe2pVc3RfZjFyc1RfTGV2RWx9");
        document.title = "PWN // ACCESS GRANTED";
        return;
    }

    statusLine.textContent = "ACCESS DENIED // INVALID CREDENTIALS";
});
