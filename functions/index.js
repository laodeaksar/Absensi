export async function onRequest(context) {
  const GAS_ID = "AKfycbxTwB7uGEwQ6nRXfvk_wd7OF3eolR5qYVSidb-RPgY7pBf8JWq4Oh_lOUXUNd7_Im7V"; 
  const GAS_URL = `https://script.google.com/macros/s/${GAS_ID}/exec`;

  // Ambil url param ?id=ID_SPREADSHEET yang tadi kamu mau
  const requestUrl = new URL(context.request.url);
  const targetUrl = GAS_URL + requestUrl.search;

  // Proxy ke Google Apps Script
  const response = await fetch(targetUrl, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.method !== "GET" ? await context.request.text() : null
  });

  let html = await response.text();

  // Fix biar CSS/JS di Apps Script tetap jalan
  return new Response(html, {
    headers: {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
