function atualizarCDI_BCB() {
  var url = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.4389/dados/ultimos/1?formato=json";

  var options = {
    method: "get",
    headers: {
      "User-Agent": "Mozilla/5.0"
    }
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());

    if (json.length > 0) {
      var cdi = json[0].valor.replace(".", ","); // Converte ponto para vírgula

      var planilha = SpreadsheetApp.getActiveSpreadsheet();
      var aba = planilha.getSheetByName("Backend");

      if (aba) {
        aba.getRange("B1").setValue(cdi);
        Logger.log("Taxa CDI atualizada: " + cdi);
      } else {
        Logger.log("A aba 'Backend' não foi encontrada.");
      }
    } else {
      Logger.log("Não foi possível obter a taxa do CDI.");
    }
  } catch (e) {
    Logger.log("Erro ao buscar a taxa do CDI: " + e.message);
  }
}