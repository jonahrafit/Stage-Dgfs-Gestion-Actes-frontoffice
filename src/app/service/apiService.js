
export const url_api = 'http://localhost:9001/api/dgfs/';

export const personne_url_api = url_api + 'personne/';

export const etablissement_service_url_api = url_api + 'etablissement/service/';
export const etablissement_patient_url_api = url_api + 'etablissement/patient/';
export const etablissement_parametre_url_api = url_api + 'etablissement/parametre/';

export const patient_url_api = url_api + 'patient/';
export const personne_patient_url_api = url_api + 'patient/nouveau/';
export const patient_parametre_url_api = url_api + 'patient/parametre/';

export const maladie_url_api = url_api + 'maladie/';
export const maladie_search_url_api = url_api + 'maladie/all';

export const utilisateur_url_api = url_api + 'utilisateur/';

export const session_id_etab = 1;

const dateTime = new Date();
const dateTimeFormat = (dateTime) => {
    const localDateTime = dateTime.toLocaleString('en-GB')
    const dateTimeArray = localDateTime.split(',')
    const date = dateTimeArray[0].split('/').reverse().join('-')
    const time = dateTimeArray[1]   
    return date + 'T' + time.slice(0,6)
}
  
export const date_now = dateTimeFormat(dateTime);