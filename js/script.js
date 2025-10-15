
function parseTimeToSeconds(timeStr) {
  if (!timeStr) return null;
  const parts = timeStr.split(":").map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return null;
}

function formatSecondsToTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2,"0");
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2,"0");
  const s = String(Math.floor(seconds % 60)).padStart(2,"0");
  return `${h}:${m}:${s}`;
}

function parsePaceToSeconds(paceStr) {
  if (!paceStr) return null;
  const parts = paceStr.split(":").map(Number);
  return parts[0] * 60 + parts[1];
}

function formatPace(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function setDistance(value) {
  document.getElementById("distance").value = value;
}

function setPace(value) {
  document.getElementById("pace").value = value;
}

function calculate() {
  let timeStr = document.getElementById("time").value.trim();
  const distance = parseFloat(document.getElementById("distance").value);
  const paceStr = document.getElementById("pace").value;

  if (/^\d+$/.test(timeStr)) {
    let totalMinutes = parseInt(timeStr, 10);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    timeStr = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
    document.getElementById("time").value = timeStr;
  }

  const timeSec = parseTimeToSeconds(timeStr);
  const paceSec = parsePaceToSeconds(paceStr);

  let finalTime = timeSec;
  let finalDistance = distance;
  let finalPace = paceSec;

  if (!timeSec && distance && paceSec) {
    finalTime = distance * paceSec;
  } else if (timeSec && !distance && paceSec) {
    finalDistance = timeSec / paceSec;
  } else if (timeSec && distance && !paceSec) {
    finalPace = timeSec / distance;
  } else if (!(timeSec && distance && paceSec)) {
    document.getElementById("result").innerHTML = "<p>Ange minst två värden i korrekt format!</p>";
    return;
  }

  const speed = finalDistance / (finalTime / 3600);

  document.getElementById("result").innerHTML = `
    <p><strong>Tid:</strong> ${formatSecondsToTime(finalTime)}</p>
    <p><strong>Distans:</strong> ${finalDistance.toFixed(2)} km</p>
    <p><strong>Tempo:</strong> ${formatPace(Math.round(finalPace))} min/km</p>
    <p><strong>Hastighet:</strong> ${speed.toFixed(2)} km/h</p>
  `;
}

function clearInput() {
    var time = document.getElementById("time");
    var distance = document.getElementById("distance");
    var pace = document.getElementById("pace");
    time.value = '';
    distance.value = '';
    pace.value = '';

    document.getElementById("result").innerHTML = "<p>Ange minst två värden i korrekt format!</p>";
}