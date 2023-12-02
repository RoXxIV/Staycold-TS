import http from "../http-common";

class ContactService {
  sendContactMail(contact: {
    email: string;
    subject: string;
    commentary: string;
  }) {
    return http.post("/contact", contact);
  }
}

export default new ContactService();
