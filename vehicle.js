document.addEventListener("DOMContentLoaded", () => {
  const vehicleType = document.body.dataset.vehicle || "car";
  const brandSelect = document.getElementById("brand");
  const modelSelect = document.getElementById("model");
  const yearSelect = document.getElementById("year");
  const dateInput = document.getElementById("appointmentDate");
  const form = document.getElementById("vehicleForm");
  const footerYear = document.getElementById("footerYear");
  const WHATSAPP_NUMBER = "923284369185"; // Pakistan number, international format without + or spaces

  const carModels = {
    "Toyota": ["Corolla", "Yaris", "Camry", "Prius", "Fortuner", "Revo / Hilux", "Land Cruiser", "Prado", "Vitz", "Aqua", "Passo", "Other Toyota"],
    "Honda": ["Civic", "City", "BR-V", "HR-V", "CR-V", "Accord", "Vezel", "Other Honda"],
    "Suzuki": ["Alto", "Cultus", "Swift", "Wagon R", "Every", "Bolan", "Jimny", "Other Suzuki"],
    "KIA": ["Sportage", "Picanto", "Stonic", "Sorento", "Carnival", "Other KIA"],
    "Hyundai": ["Tucson", "Elantra", "Sonata", "Santa Fe", "Porter", "Other Hyundai"],
    "MG": ["HS", "ZS", "4 EV", "Other MG"],
    "Haval": ["H6", "Jolion", "Other Haval"],
    "Changan": ["Alsvin", "Oshan X7", "Karvaan", "Other Changan"],
    "BYD": ["Atto 3", "Seal", "Shark 6", "Other BYD"],
    "Chery": ["Tiggo 4 Pro", "Tiggo 7 Pro", "Tiggo 8 Pro", "Other Chery"],
    "Jetour": ["Dashing", "X70 Plus", "T2", "Other Jetour"],
    "DFSK": ["Glory 580", "Glory 500", "Other DFSK"],
    "Prince": ["Pearl", "K07", "Other Prince"],
    "Isuzu": ["D-Max", "Other Isuzu"],
    "Other / Imported": ["Other / Imported model"]
  };
  const bikeModels = {
    "Honda": ["CD 70", "CG 125", "Pridor", "CB 125F", "CB 150F", "CBR 150R", "CBR 500R", "Other Honda"],
    "Yamaha": ["YB 125Z", "YBR 125", "YBR 125G", "FZ", "Other Yamaha"],
    "Suzuki": ["GD 110S", "GS 150", "GR 150", "Inazuma", "Other Suzuki"],
    "United": ["US 70", "US 100", "US 125", "Other United"],
    "Road Prince": ["RP 70", "Wego 150", "Passion Plus", "Other Road Prince"],
    "Unique": ["UD 70", "UD 100", "UD 125", "Other Unique"],
    "Super Power": ["SP 70", "SP 125", "Other Super Power"],
    "Hi-Speed": ["Infinity 150", "SR 200", "Other Hi-Speed"],
    "Crown": ["CR 70", "CR 125", "Other Crown"],
    "Metro": ["MR 70", "MR 100", "Other Metro"],
    "Vlektra": ["Bolt", "Velocity", "Other Vlektra"],
    "Yadea": ["G5", "T5", "Other Yadea"],
    "Benelli": ["TNT 150i", "302S", "Other Benelli"],
    "Kawasaki": ["Ninja 250", "Ninja 400", "Z900", "Other Kawasaki"],
    "BMW": ["G 310 R", "F 900 R", "S 1000 RR", "Other BMW"],
    "Other / Imported": ["Other / Imported model"]
  };

  const models = vehicleType === "bike" ? bikeModels : carModels;
  Object.keys(models).forEach(brand => brandSelect.add(new Option(brand, brand)));

  brandSelect.addEventListener("change", () => {
    modelSelect.innerHTML = "";
    if (!brandSelect.value) {
      modelSelect.add(new Option("Select brand first", ""));
      modelSelect.disabled = true;
      return;
    }
    modelSelect.disabled = false;
    modelSelect.add(new Option("Select model", ""));
    models[brandSelect.value].forEach(model => modelSelect.add(new Option(model, model)));
  });

  const currentYear = new Date().getFullYear();
  yearSelect.add(new Option("Other / older model", "Other / older model"));
  for (let y = currentYear; y >= 1990; y--) yearSelect.add(new Option(String(y), String(y)));
  if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);
  if (footerYear) footerYear.textContent = currentYear;

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const vehicleName = vehicleType === "bike" ? "Bike PPF Booking" : "Car PPF Booking";
    const lines = [
      `*MODIFY CLUB - ${vehicleName}*`,
      "",
      `Brand: ${data.get("Brand")}`,
      `Model: ${data.get("Model")}`,
      `Year: ${data.get("Year")}`,
      `Customer name: ${data.get("Customer name")}`,
      `Phone: ${data.get("Customer phone")}`,
      `PPF package: ${data.get("PPF package")}`,
      `Finish: ${data.get("Finish")}`,
      `Preferred date: ${data.get("Preferred date") || "Not selected"}`,
      `Additional details: ${data.get("Additional details") || "None"}`,
      "",
      "Please contact me about availability and pricing."
    ];
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    const opened = window.open(url, "_blank");
    if (!opened) window.location.href = url;
  });
});