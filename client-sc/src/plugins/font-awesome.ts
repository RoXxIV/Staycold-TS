import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import {
  faCopyright,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faAt,
  faHandPointRight,
  faPencilAlt,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faEnvelope,
  faCopyright,
  faAt,
  faHandPointRight,
  faPencilAlt,
  faStopwatch,
  faPenToSquare,
  faTrashCan
);
export { FontAwesomeIcon };
