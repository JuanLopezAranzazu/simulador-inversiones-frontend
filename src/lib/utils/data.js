export function exportData(data) {
  const customData = {
    format: "investmentsimulator",
    version: "1.0",
    payload: data,
  };
  const jsonData = JSON.stringify(customData);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.investmentsimulator";
  a.click();
  URL.revokeObjectURL(url);
}

export function importData(event) {
  return new Promise((resolve, reject) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const jsonContent = e.target.result;
          const customData = JSON.parse(jsonContent);

          if (
            customData.format === "investmentsimulator" &&
            customData.version === "1.0"
          ) {
            resolve(customData.payload);
          } else {
            throw new Error("Formato no válido");
          }
        } catch (error) {
          console.error("Error al parsear JSON:", error);
          reject(error);
        }
      };
      reader.readAsText(file);
    } else {
      reject(new Error("No se seleccionó ningún archivo"));
    }
  });
}
