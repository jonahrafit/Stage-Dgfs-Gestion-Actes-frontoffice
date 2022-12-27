import { patient_url_api } from "./apiService";
import authHeader from "./auth-header";

class PatientService {

    getPatient(id) {
        return fetch(patient_url_api + id, { headers: authHeader() }).then((res) => res.json());
    }

}

export default new PatientService();