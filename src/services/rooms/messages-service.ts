export async function GetTeacherResponse(name: string, message: string) {
  const response = await fetch("http://127.0.0.1:5000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      sentence: message,
    }),
  });


  const data = await response.json();

  return data;
}
