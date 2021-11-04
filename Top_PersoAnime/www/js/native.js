function onBatteryStatus(status) {
    console.log("Battery Level Low " + status.level + "%");
  }

  const toogleModalOffline = (show) => {
    const modal = document.getElementById("modal-deconnecte");
    modal.className = show ? "show" : "";
  };
  
  const deviceReady = () => {
    window.addEventListener("batterystatus", onBatteryStatus, false);
    document.addEventListener("offline", () => toogleModalOffline(true), false);
    document.addEventListener("online", () => toogleModalOffline(false), false);
  };
  