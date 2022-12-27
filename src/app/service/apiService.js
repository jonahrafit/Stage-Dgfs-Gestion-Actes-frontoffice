
export const url = 'http://localhost:9001/';
export const url_api = url + 'api/dgfs/';

export const personne_url_api = url_api + 'personne/';

// ETABLISSEMENT
export const etablissement_url_api = url_api + 'etablissement/';
export const etablissement_service_url_api = url_api + 'etablissement/service/';
export const etablissement_parametre_url_api = url_api + 'etablissement/parametre/';
export const etablissement_simplestat_url_api = url_api + 'etablissement/patient/simplestat/';

// PATIENT
export const patient_url_api = url_api + 'patient/';
export const personne_patient_url_api = url_api + 'patient/nouveau/';
export const patient_dernierparametre_url_api = url_api + 'patient/parametre/last/';

// MALADIE
export const maladie_url_api = url_api + 'maladie/';
export const maladie_search_url_api = url_api + 'maladie/all';

// UTILISATEUR
export const utilisateur_url_api = url_api + 'utilisateur/';
export const utilisateur_login_url_api = url_api + 'utilisateur/login';

// Medicament
export const medicament_url_api = url_api + 'medicament'

// PRESCRIPTION
export const prescription_url_api = url_api + 'prescription';


export const session_id_etab = 1;

export const color_of_background = ['#ba68c8', '#6bf178', '#bdddc8', '#6bfff8'];
const dateTime = new Date();
const dateTimeFormat = (dateTime) => {
    const localDateTime = dateTime.toLocaleString('en-GB')
    const dateTimeArray = localDateTime.split(',')
    const date = dateTimeArray[0].split('/').reverse().join('-')
    const time = dateTimeArray[1]
    return date + 'T' + time.slice(0, 6)
}

export const date_now = dateTimeFormat(dateTime);