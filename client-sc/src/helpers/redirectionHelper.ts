import { ref, onBeforeUnmount } from "vue";
import router from "@/router";

export function useRedirectionTimer(redirectTo: string, timer: number = 5) {
  const time = ref(timer);
  let redirectionTimerId: number | NodeJS.Timeout;

  const startRedirectionTimer = () => {
    redirectionTimerId = setInterval(() => {
      time.value--;
      if (time.value === 0) {
        clearInterval(redirectionTimerId as number);
        router.push(redirectTo);
      }
    }, 1000);
  };

  onBeforeUnmount(() => {
    if (redirectionTimerId) clearInterval(redirectionTimerId);
  });

  return { time, startRedirectionTimer };
}
