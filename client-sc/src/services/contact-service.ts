import http from "../http-common";

class ContactService {
  sendContactMail(contact) {
    return http.post("/contact", contact);
  }
}

export default new ContactService();
