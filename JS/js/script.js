function convertTemperature() {
  const input = parseFloat(document.getElementById("inputTemp").value);
  const unit = document.getElementById("unit").value;
  const output = document.getElementById("output");
  const info = document.getElementById("info");
  const bar = document.getElementById("thermoBar");
  const line = document.getElementById("indicatorLine");
  const value = document.getElementById("indicatorValue");

  if (isNaN(input)) {
    output.innerText = "Masukkan angka suhu yang valid!";
    info.innerText = "Tidak dapat dikonversi.";
    bar.style.height = "0%";
    bar.style.backgroundColor = "#cbd5e1";
    line.style.top = "100%";
    value.innerText = "0°C";
    value.style.top = "100%";
    return;
  }

  let result = 0;
  if (unit === "c") {
    result = (input * 9) / 5 + 32;
  } else {
    result = ((input - 32) * 5) / 9;
  }

  const suhuC = unit === "c" ? input : ((input - 32) * 5) / 9;
  const finalValue = result.toFixed(1);
  output.innerText = `Hasil: ${finalValue} °${unit === "c" ? "F" : "C"}`;

  let infoText = "";
  let color = "";

  if (suhuC < 10) {
    infoText = "Dingin ekstrem, hati-hati kedinginan!";
    color = "#38bdf8";
  } else if (suhuC < 25) {
    infoText = "Sejuk dan nyaman.";
    color = "#facc15";
  } else if (suhuC < 35) {
    infoText = "Cukup panas, tetap terhidrasi.";
    color = "#f97316";
  } else {
    infoText = "Panas ekstrem, hindari aktivitas berat!";
    color = "#dc2626";
  }

  info.innerText = infoText;

  const percent = Math.max(0, Math.min(100, (suhuC / 50) * 100));
  const topPos = 200 - (percent * 2); // container 200px tinggi

  bar.style.height = `${percent}%`;
  bar.style.backgroundColor = color;

  line.style.top = `${topPos}px`;
  value.style.top = `${topPos - 20}px`;
  value.innerText = `${Math.round(suhuC)}°C`;

  const speech = new SpeechSynthesisUtterance();
  speech.lang = "id-ID";
  speech.text = `${output.innerText}. ${infoText}`;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

function resetAll() {
  document.getElementById("inputTemp").value = "";
  document.getElementById("output").innerText = "Hasil konversi akan muncul di sini";
  document.getElementById("info").innerText = "Masukkan suhu dan tekan Konversi atau Enter";
  document.getElementById("thermoBar").style.height = "0%";
  document.getElementById("thermoBar").style.backgroundColor = "#cbd5e1";
  document.getElementById("indicatorLine").style.top = "100%";
  document.getElementById("indicatorValue").innerText = "0°C";
  document.getElementById("indicatorValue").style.top = "100%";
  window.speechSynthesis.cancel();
}

document.getElementById("inputTemp").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    convertTemperature();
  }
});
