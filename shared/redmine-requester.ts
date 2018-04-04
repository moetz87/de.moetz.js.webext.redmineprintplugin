export class RedmineRequester {

    private static JSON = {"issue":{"status":{"name":"Neu","id":1},"project":{"name":"Basiskonnektor Erweiterungen","id":102},"category":{"name":"EvT (KoCo)","id":563},"author":{"name":"Thomas Spadzinski","id":20},"subject":"KOCOTL-1612@JIRA: Anpassung TUC_KON_005 \u201eCard-to-Card authentisieren\u201c","created_on":"2018/01/31 13:39:06 +0100","assigned_to":{"name":"team kococonnector","id":39},"start_date":"2018/01/31","custom_fields":[{"value":"Iterationsfeature","name":"Featuretyp","id":8},{"value":"23","name":"BacklogNr","id":9},{"value":"1","name":"Komplexit\u00e4tspunkte","id":10},{"value":"06","name":"Iteration","id":13}],"done_ratio":0,"updated_on":"2018/03/23 14:45:05 +0100","description":"*Epic Link:*\r\n* Spezifikations\u00e4nderungen gem\u00e4\u00df \u201eOPB2.1.1 Anpassungen Konnektor\u201c\r\n\r\n*Acceptance Criteria:*\r\n* Verhalten lt. Spezifikation ge\u00e4ndert\r\n\r\n*Beschreibung:*\r\n\r\nge\u00e4ndert: Ablauf,\r\nentf\u00e4llt: Fehlerverhalten,\r\nentf\u00e4llt: 4228\r\n\r\nbetrifft\r\nTIP1-A_4572\r\n","id":11429,"fixed_version":{"name":"R 2.3.0","id":249},"priority":{"name":"Normal","id":4},"tracker":{"name":"Feature","id":2}}};

    public getTicket(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            // const url = `http://redmine/redmine/issues/${id}.json`;
            // const req = new XMLHttpRequest();
            // req.open('GET', url, true);
            // req.onload = event => {
            //     const response = JSON.parse(req.response);
            //     resolve(response);
            // };
            // req.send();
            resolve(RedmineRequester.JSON.issue);
        });
    }

}
