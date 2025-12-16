let socket;

export const connectSocket = (onMessage) => {
  socket = new WebSocket("ws://localhost:8000/ws");

  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onclose = () => {
    console.log("WebSocket disconnected");
  };
};

export const disconnectSocket = () => {
  if (socket) socket.close();
};
