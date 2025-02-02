const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");
function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = text;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function fetchWikipediaData(query) {
  const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;
  try {
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    const firstResult = searchData.query.search[0];
    if (!firstResult) {
      return `I couldn't find details for "${query}". <a href="https://www.google.com/search?q=${encodeURIComponent(query)}" target="_blank">Search on Google</a>`;
    }
    const pageId = firstResult.pageid;
    const contentUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=false&pageids=${pageId}&origin=*`;
    const contentResponse = await fetch(contentUrl);
    const contentData = await contentResponse.json();
    const page = contentData.query.pages[pageId];
    const extract = page.extract ? page.extract : `No summary available for "${query}".`;
    return `<p>${extract}</p>`;
  } catch (error) {
    return "Error fetching data. Try again later.";
  }
};

async function fetchHealthcareInfo(query) {
  const predefinedResponses = {
    "diabetes": `
      <p><strong>Diabetes:</strong> A chronic condition where the body either does not produce enough insulin or cannot effectively use the insulin it produces.</p>
      <p><a href="https://www.who.int/health-topics/diabetes" target="_blank">Learn more about Diabetes</a></p>
    `,
    "hypertension": `
      <p><strong>Hypertension:</strong> Also known as high blood pressure, it is a condition where the force of the blood against artery walls is too high, increasing the risk of heart disease and stroke.</p>
      <p><a href="https://www.cdc.gov/bloodpressure/index.htm" target="_blank">Learn more about Hypertension</a></p>
    `,
    "covid-19": `
      <p><strong>COVID-19:</strong> An infectious disease caused by the SARS-CoV-2 virus, characterized by symptoms such as fever, cough, and difficulty breathing.</p>
      <p><a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019" target="_blank">Learn more about COVID-19</a></p>
    `,
  };
  return predefinedResponses[query.toLowerCase()] || await fetchWikipediaData(query);
};

async function fetchClimateInfo(query) {
  const predefinedResponses = {
    "global warming": `
      <p><strong>Global Warming:</strong> The long-term heating of Earth's climate system observed since the pre-industrial period due to human activities, primarily fossil fuel burning.</p>
      <p><a href="https://www.un.org/en/climatechange/what-is-climate-change" target="_blank">Learn more about Global Warming</a></p>
    `,
    "climate change": `
      <p><strong>Climate Change:</strong> A change in the typical weather patterns of a region over a long period, often associated with global warming and other environmental changes.</p>
      <p><a href="https://www.ipcc.ch/" target="_blank">Learn more about Climate Change</a></p>
    `,
    "greenhouse effect": `
      <p><strong>Greenhouse Effect:</strong> The process by which greenhouse gases trap heat in Earth's atmosphere, contributing to global warming.</p>
      <p><a href="https://climate.nasa.gov/causes/" target="_blank">Learn more about the Greenhouse Effect</a></p>
    `,
  };
  return predefinedResponses[query.toLowerCase()] || await fetchWikipediaData(query);
};


sendButton.addEventListener("click", async () => {
  const query = userInput.value.trim();
  if (!query) return alert("Please enter a topic!");
  addMessage(query, "user");
  userInput.value = "";
  addMessage("Searching...", "bot");
  let response;
  if (["diabetes", "hypertension", "covid-19"].includes(query.toLowerCase())) {
    response = await fetchHealthcareInfo(query);
  }
  else if (["global warming", "climate change", "greenhouse effect"].includes(query.toLowerCase())) {
    response = await fetchClimateInfo(query);
  }
  else if (query.toLowerCase() === "hello" || query.toLowerCase() === "hi" || query.toLowerCase() === "hey") {
    addMessage(`Hello! How can I assist you today?`, "bot");
  }
  else {
    response = await fetchWikipediaData(query);
  }
  addMessage(response, "bot");
});

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") sendButton.click();
});
