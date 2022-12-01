import moment from 'moment';

export const url_api = 'http://localhost:9001/api/dgfs/';

export const personne_url_api = url_api + 'personne/';

export const etablissement_service_url_api = url_api + 'etablissement/service/';
export const etablissement_patient_url_api = url_api + 'etablissement/patient/';
export const etablissement_parametre_url_api = url_api + 'etablissement/parametre/';

export const patient_url_api = url_api + 'patient/';
export const personne_patient_url_api = url_api + 'patient/nouveau/';
export const patient_parametre_url_api = url_api + 'patient/parametre/';

export const maladie_url_api = url_api +'maladie/';

export const utilisateur_url_api = url_api+'utilisateur/';

export const session_id_etab = 1;
export const date_now = moment().toISOString().slice(0, 16);
